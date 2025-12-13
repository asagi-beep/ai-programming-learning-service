import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import Activity from "@/models/Activity";
import User from "@/models/User";

/**
 * GET /api/activities
 * ログインユーザーの最近のアクティビティを取得
 */
export async function GET(request: NextRequest) {
  try {
    // セッション認証チェック
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "認証が必要です" },
        { status: 401 }
      );
    }

    // DB接続
    await connectDB();

    // ユーザーをメールで検索してIDを取得
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json(
        { error: "ユーザーが見つかりません" },
        { status: 404 }
      );
    }

    // クエリパラメータから取得件数を取得（デフォルト5件、最大20件）
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get("limit");
    const limit = Math.min(Math.max(parseInt(limitParam || "5", 10), 1), 20);

    // ユーザーのアクティビティを最新順で取得
    const activities = await Activity.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    // 総件数を取得
    const total = await Activity.countDocuments({ userId: user._id });

    // レスポンス形式に変換
    const formattedActivities = activities.map((activity) => ({
      id: activity._id.toString(),
      type: activity.type,
      description: activity.description,
      targetName: activity.targetName,
      createdAt: activity.createdAt.toISOString(),
      userId: activity.userId.toString(),
    }));

    return NextResponse.json({
      activities: formattedActivities,
      total,
    });
  } catch (error) {
    console.error("アクティビティ取得エラー:", error);
    return NextResponse.json(
      { error: "アクティビティの取得に失敗しました" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/activities
 * 新しいアクティビティを記録
 */
export async function POST(request: NextRequest) {
  try {
    // セッション認証チェック
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "認証が必要です" },
        { status: 401 }
      );
    }

    // リクエストボディをパース
    const body = await request.json();
    const { type, description, targetName } = body;

    // バリデーション
    if (!type || !description || !targetName) {
      return NextResponse.json(
        { error: "type, description, targetName は必須です" },
        { status: 400 }
      );
    }

    // DB接続
    await connectDB();

    // ユーザーをメールで検索
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json(
        { error: "ユーザーが見つかりません" },
        { status: 404 }
      );
    }

    // アクティビティを作成
    const activity = new Activity({
      type,
      description,
      targetName,
      userId: user._id,
    });

    await activity.save();

    return NextResponse.json(
      {
        id: activity._id.toString(),
        type: activity.type,
        description: activity.description,
        targetName: activity.targetName,
        createdAt: activity.createdAt.toISOString(),
        userId: activity.userId.toString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("アクティビティ作成エラー:", error);
    return NextResponse.json(
      { error: "アクティビティの作成に失敗しました" },
      { status: 500 }
    );
  }
}

