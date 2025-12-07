import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";
import nodemailer from "nodemailer";

/**
 * バリデーションエラーの型
 */
interface ValidationErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

/**
 * お問い合わせフォームの入力値をバリデーション
 */
function validateInput(data: {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}): ValidationErrors {
  const errors: ValidationErrors = {};

  // お名前
  if (!data.name || data.name.trim() === "") {
    errors.name = "お名前を入力してください";
  } else if (data.name.length > 100) {
    errors.name = "お名前は100文字以内で入力してください";
  }

  // メールアドレス
  if (!data.email || data.email.trim() === "") {
    errors.email = "メールアドレスを入力してください";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "有効なメールアドレスを入力してください";
  } else if (data.email.length > 254) {
    errors.email = "メールアドレスは254文字以内で入力してください";
  }

  // 件名
  if (!data.subject || data.subject.trim() === "") {
    errors.subject = "件名を入力してください";
  } else if (data.subject.length > 200) {
    errors.subject = "件名は200文字以内で入力してください";
  }

  // お問い合わせ内容
  if (!data.message || data.message.trim() === "") {
    errors.message = "お問い合わせ内容を入力してください";
  } else if (data.message.length < 10) {
    errors.message = "お問い合わせ内容は10文字以上で入力してください";
  } else if (data.message.length > 5000) {
    errors.message = "お問い合わせ内容は5000文字以内で入力してください";
  }

  return errors;
}

/**
 * HTMLエンティティをエスケープする（XSS対策）
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * 管理者に通知メールを送信
 */
async function sendNotificationEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}): Promise<void> {
  // SMTP設定が不完全な場合はスキップ
  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS ||
    !process.env.ADMIN_EMAIL
  ) {
    console.warn("SMTP設定が不完全なため、メール送信をスキップしました");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587", 10),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const formattedDate = data.createdAt.toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `【お問い合わせ】${data.subject}`,
    text: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AIコードレビュー学習サービス - お問い合わせ通知
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

以下のお問い合わせを受け付けました。

【お名前】
${data.name}

【メールアドレス】
${data.email}

【件名】
${data.subject}

【お問い合わせ内容】
${data.message}

【受付日時】
${formattedDate}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
※このメールは自動送信されています。
`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("管理者通知メールを送信しました");
  } catch (error) {
    console.error("メール送信エラー:", error);
    // メール送信エラーは処理を止めずにログのみ記録
  }
}

/**
 * POST /api/contact
 * お問い合わせを受け付けるエンドポイント
 */
export async function POST(request: NextRequest) {
  try {
    // リクエストボディを取得
    const body = await request.json();

    // バリデーション
    const errors = validateInput(body);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "入力内容に誤りがあります",
          errors,
        },
        { status: 400 }
      );
    }

    // 入力値をサニタイズ
    const sanitizedData = {
      name: escapeHtml(body.name.trim()),
      email: body.email.trim().toLowerCase(),
      subject: escapeHtml(body.subject.trim()),
      message: escapeHtml(body.message.trim()),
    };

    // MongoDB接続
    await connectDB();

    // お問い合わせを保存
    const contact = new Contact(sanitizedData);
    await contact.save();

    // 管理者にメール通知（非同期で実行、エラーでも処理継続）
    sendNotificationEmail({
      ...sanitizedData,
      createdAt: contact.createdAt,
    }).catch((error) => {
      console.error("メール送信処理でエラー:", error);
    });

    return NextResponse.json(
      {
        success: true,
        message: "お問い合わせを受け付けました。ご連絡ありがとうございます。",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("お問い合わせ処理エラー:", error);

    // Mongooseバリデーションエラーの処理
    if (error instanceof Error && error.name === "ValidationError") {
      return NextResponse.json(
        {
          success: false,
          error: "入力内容に誤りがあります",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "送信に失敗しました。時間をおいて再度お試しください。",
      },
      { status: 500 }
    );
  }
}
