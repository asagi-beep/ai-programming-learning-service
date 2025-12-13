import mongoose, { Schema, Document, Model } from "mongoose";

/**
 * アクティビティの種別
 */
export type ActivityType =
  | "review_completed"
  | "project_created"
  | "comment_added"
  | "settings_updated"
  | "review_started";

/**
 * アクティビティドキュメントの型定義
 */
export interface IActivity extends Document {
  /** アクティビティ種別 */
  type: ActivityType;
  /** アクティビティの説明文 */
  description: string;
  /** 対象の名前（ファイル名、プロジェクト名など） */
  targetName: string;
  /** ユーザーID（参照） */
  userId: mongoose.Types.ObjectId;
  /** 作成日時 */
  createdAt: Date;
  /** 更新日時 */
  updatedAt: Date;
}

/**
 * アクティビティスキーマ定義
 */
const ActivitySchema = new Schema<IActivity>(
  {
    type: {
      type: String,
      required: [true, "アクティビティ種別は必須です"],
      enum: [
        "review_completed",
        "project_created",
        "comment_added",
        "settings_updated",
        "review_started",
      ],
    },
    description: {
      type: String,
      required: [true, "説明文は必須です"],
      maxlength: [500, "説明文は500文字以内で入力してください"],
      trim: true,
    },
    targetName: {
      type: String,
      required: [true, "対象名は必須です"],
      maxlength: [255, "対象名は255文字以内で入力してください"],
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "ユーザーIDは必須です"],
    },
  },
  {
    timestamps: true,
  }
);

// インデックス設定（ユーザーごとの最新アクティビティ取得用）
ActivitySchema.index({ userId: 1, createdAt: -1 });

/**
 * Activityモデル
 */
const Activity: Model<IActivity> =
  mongoose.models.Activity || mongoose.model<IActivity>("Activity", ActivitySchema);

export default Activity;

