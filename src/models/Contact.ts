import mongoose, { Schema, Document, Model } from "mongoose";

/**
 * お問い合わせドキュメントの型定義
 */
export interface IContact extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "replied";
  createdAt: Date;
}

/**
 * お問い合わせスキーマ定義
 */
const ContactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: [true, "お名前は必須です"],
      maxlength: [100, "お名前は100文字以内で入力してください"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "メールアドレスは必須です"],
      maxlength: [254, "メールアドレスは254文字以内で入力してください"],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "有効なメールアドレスを入力してください",
      ],
    },
    subject: {
      type: String,
      required: [true, "件名は必須です"],
      maxlength: [200, "件名は200文字以内で入力してください"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "お問い合わせ内容は必須です"],
      maxlength: [5000, "お問い合わせ内容は5000文字以内で入力してください"],
      minlength: [10, "お問い合わせ内容は10文字以上で入力してください"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["unread", "read", "replied"],
      default: "unread",
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// インデックス設定
ContactSchema.index({ createdAt: -1 });
ContactSchema.index({ status: 1 });
ContactSchema.index({ email: 1 });

/**
 * Contactモデル
 * mongoose.models.Contact が存在する場合は再利用し、
 * 存在しない場合は新規作成する
 */
const Contact: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);

export default Contact;
