import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

/**
 * NextAuth.js v5 設定
 * Google OAuth認証とMongoDBユーザー管理を統合
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  // セッション暗号化キー（NextAuth v5ではAUTH_SECRETを使用）
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  
  // 認証プロバイダー設定
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  // カスタムページ設定
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },

  // セッション設定（JWT形式）
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30日
  },

  // コールバック設定
  callbacks: {
    /**
     * サインイン時のコールバック
     * ユーザー情報をMongoDBに保存/更新
     */
    async signIn({ user, account }) {
      // Googleプロバイダーのみ処理
      if (account?.provider === "google") {
        try {
          await connectDB();

          // 既存ユーザーを検索
          const existingUser = await User.findOne({ email: user.email });

          if (existingUser) {
            // 既存ユーザーの場合は情報を更新
            await User.updateOne(
              { email: user.email },
              {
                $set: {
                  name: user.name,
                  image: user.image,
                },
              }
            );
            console.log(`ユーザー情報を更新: ${user.email}`);
          } else {
            // 新規ユーザーの場合は作成
            const newUser = new User({
              name: user.name,
              email: user.email,
              image: user.image,
              role: "user",
            });
            await newUser.save();
            console.log(`新規ユーザーを作成: ${user.email}`);
          }

          return true;
        } catch (error) {
          console.error("ユーザー保存エラー:", error);
          return false;
        }
      }

      return true;
    },

    /**
     * JWTコールバック
     * トークンにユーザー情報を追加
     */
    async jwt({ token, user, trigger, session }) {
      // 初回サインイン時にユーザー情報をトークンに追加
      if (user) {
        token.id = user.id;
      }

      // セッション更新時（update()呼び出し時）
      if (trigger === "update" && session) {
        return { ...token, ...session };
      }

      // DBからロール情報を取得して追加
      if (token.email) {
        try {
          await connectDB();
          const dbUser = await User.findOne({ email: token.email });
          if (dbUser) {
            token.role = dbUser.role;
            token.dbId = dbUser._id.toString();
          }
        } catch (error) {
          console.error("JWT callback error:", error);
        }
      }

      return token;
    },

    /**
     * セッションコールバック
     * クライアントに公開するセッション情報を設定
     */
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.dbId as string;
        session.user.role = token.role as "user" | "admin";
      }
      return session;
    },

    /**
     * リダイレクトコールバック
     * 認証後のリダイレクト先を制御
     */
    async redirect({ url, baseUrl }) {
      // 同一オリジンのURLはそのまま許可
      if (url.startsWith(baseUrl)) {
        return url;
      }
      // 相対パスは許可
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      // デフォルトはダッシュボードへ
      return `${baseUrl}/dashboard`;
    },
  },

  // デバッグモード（開発環境のみ）
  debug: process.env.NODE_ENV === "development",
});



