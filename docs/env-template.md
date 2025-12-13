# 環境変数設定テンプレート

このファイルの内容を `.env.local` にコピーして使用してください。

```env
# ============================================
# NextAuth.js v5 環境変数設定
# ============================================

# --------------------------------------------
# Google OAuth 認証設定
# --------------------------------------------
# Google Cloud Consoleで取得したOAuth 2.0クライアント情報
# https://console.cloud.google.com/apis/credentials
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# --------------------------------------------
# NextAuth.js v5 設定
# --------------------------------------------
# セッション暗号化キー（ランダムな文字列を生成）
# NextAuth v5ではAUTH_SECRETを使用（NEXTAUTH_SECRETも互換性のため残す）
# 生成コマンド: openssl rand -base64 32
AUTH_SECRET=your-auth-secret-key
NEXTAUTH_SECRET=your-nextauth-secret-key  # 互換性のため（AUTH_SECRETが優先）

# アプリケーションURL（本番環境では実際のドメインに変更）
# NextAuth v5ではAUTH_URLを使用（NEXTAUTH_URLも互換性のため残す）
AUTH_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000  # 互換性のため（AUTH_URLが優先）

# --------------------------------------------
# MongoDB 接続設定
# --------------------------------------------
# MongoDB Atlas または ローカルMongoDBの接続文字列
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# --------------------------------------------
# メール送信設定（お問い合わせフォーム用）
# --------------------------------------------
SMTP_HOST=smtp.example.com
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
ADMIN_EMAIL=admin@example.com
```

## Google OAuth 設定手順

1. [Google Cloud Console](https://console.cloud.google.com/) にアクセス
2. 新しいプロジェクトを作成（または既存のプロジェクトを選択）
3. 「APIとサービス」→「認証情報」に移動
4. 「認証情報を作成」→「OAuth クライアント ID」を選択
5. アプリケーションの種類: 「ウェブ アプリケーション」
6. 承認済みの JavaScript 生成元:
   - 開発環境: `http://localhost:3000`
   - 本番環境: `https://your-domain.com`
7. 承認済みのリダイレクト URI:
   - 開発環境: `http://localhost:3000/api/auth/callback/google`
   - 本番環境: `https://your-domain.com/api/auth/callback/google`
8. 作成後、クライアントIDとクライアントシークレットを取得

## AUTH_SECRET 生成方法

NextAuth v5では`AUTH_SECRET`環境変数を使用します。

```bash
# macOS / Linux
openssl rand -base64 32

# Windows (PowerShell)
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

生成した値を`.env.local`の`AUTH_SECRET`に設定してください。



