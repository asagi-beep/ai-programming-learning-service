import mongoose, { Schema, Document, Model } from "mongoose";

/**
 * ユーザードキュメントの型定義
 * NextAuth.js認証で取得したユーザー情報を保存
 */
export interface IUser extends Document {
  /** ユーザー名（Google表示名） */
  name: string;
  /** メールアドレス（一意キー） */
  email: string;
  /** プロフィール画像URL */
  image: string;
  /** ユーザーロール（将来のRBAC用） */
  role: "user" | "admin";
  /** 登録日時 */
  createdAt: Date;
  /** 更新日時 */
  updatedAt: Date;
}

/**
 * ユーザースキーマ定義
 */
const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "ユーザー名は必須です"],
      maxlength: [100, "ユーザー名は100文字以内で入力してください"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "メールアドレスは必須です"],
      unique: true, // unique: trueは自動的にインデックスを作成するため、明示的なインデックス定義は不要
      maxlength: [254, "メールアドレスは254文字以内で入力してください"],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "有効なメールアドレスを入力してください",
      ],
    },
    image: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    // createdAtとupdatedAtを自動生成
    timestamps: true,
  }
);

// インデックス設定（emailはunique: trueで自動的にインデックスが作成されるため、明示的な定義は不要）
UserSchema.index({ role: 1 });
UserSchema.index({ createdAt: -1 });

/**
 * Userモデル
 * mongoose.models.User が存在する場合は再利用し、
 * 存在しない場合は新規作成する
 */
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;



