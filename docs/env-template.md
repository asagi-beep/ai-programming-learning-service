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

# アプリケーションURL
# NextAuth v5ではAUTH_URLを使用（NEXTAUTH_URLも互換性のため残す）
# 開発環境: http://localhost:3000
# 本番環境（Vercel）: 設定不要（trustHost: trueにより自動検出）または https://your-domain.vercel.app
# ⚠️ 重要: VercelでAUTH_URLを設定する場合、localhost:3000ではなく本番環境のURLを設定してください
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

## Vercel（本番環境）での設定

### 環境変数の設定

Vercelダッシュボードで以下の環境変数を設定してください：

**必須環境変数：**
- `AUTH_SECRET` - セッション暗号化キー（必須）
- `GOOGLE_CLIENT_ID` - Google OAuth クライアントID（必須）
- `GOOGLE_CLIENT_SECRET` - Google OAuth クライアントシークレット（必須）
- `MONGODB_URI` - MongoDB接続文字列（必須）

**推奨環境変数：**
- `AUTH_URL` - **設定しないことを推奨**（`trustHost: true`により自動検出）
  - もし設定する場合は、`https://your-app.vercel.app`のように本番環境のURLを設定
  - ⚠️ **絶対に`localhost:3000`を設定しないでください**

### Google Cloud Consoleの設定

本番環境のURLを追加してください：

1. [Google Cloud Console](https://console.cloud.google.com/) にアクセス
2. プロジェクトを選択
3. 「APIとサービス」→「認証情報」に移動
4. OAuth 2.0 クライアント ID を編集
5. **承認済みの JavaScript 生成元**に追加：
   ```
   https://your-app.vercel.app
   ```
6. **承認済みのリダイレクト URI**に追加：
   ```
   https://your-app.vercel.app/api/auth/callback/google
   ```
7. 保存

### トラブルシューティング

**エラー: `ERR_CONNECTION_REFUSED` が `localhost:3000` に発生する場合**

原因：Vercelの環境変数で`AUTH_URL`が`localhost:3000`に設定されている可能性があります。

解決方法：
1. Vercelダッシュボードで環境変数を確認
2. `AUTH_URL`が`localhost:3000`に設定されている場合は削除するか、本番環境のURLに変更
3. 再デプロイを実行



