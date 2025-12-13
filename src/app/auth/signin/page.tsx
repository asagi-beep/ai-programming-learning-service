"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CodeBracketIcon } from "@heroicons/react/24/outline";
import { useTheme } from "@/contexts/ThemeContext";
import { Suspense } from "react";

/**
 * Googleログインボタンコンポーネント
 */
function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

/**
 * サインインフォームコンポーネント
 */
function SignInForm() {
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const error = searchParams.get("error");

  /**
   * Googleログイン処理
   */
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl });
  };

  return (
    <div
      className={`w-full max-w-md p-8 rounded-2xl ${
        theme === "dark"
          ? "bg-dark-card border border-dark-border"
          : "bg-white border border-gray-200 shadow-xl"
      }`}
    >
      {/* ロゴ */}
      <div className="flex justify-center mb-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div
            className={`p-2 rounded-lg transition-all duration-300 group-hover:scale-110 ${
              theme === "dark"
                ? "bg-primary-green/10 group-hover:bg-primary-green/20"
                : "bg-emerald-100 group-hover:bg-emerald-200"
            }`}
          >
            <CodeBracketIcon
              className={`w-8 h-8 ${
                theme === "dark" ? "text-primary-green" : "text-emerald-600"
              }`}
            />
          </div>
          <span
            className={`text-2xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            AI
            <span
              className={theme === "dark" ? "text-primary-green" : "text-emerald-600"}
            >
              Review
            </span>
          </span>
        </Link>
      </div>

      {/* タイトル */}
      <h1
        className={`text-2xl font-bold text-center mb-2 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        ログイン
      </h1>
      <p
        className={`text-center mb-8 ${
          theme === "dark" ? "text-white/60" : "text-gray-600"
        }`}
      >
        アカウントにログインして続けましょう
      </p>

      {/* エラーメッセージ */}
      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
          <p className="text-red-500 text-sm text-center">
            {error === "OAuthSignin" && "認証の開始に失敗しました"}
            {error === "OAuthCallback" && "認証コールバックでエラーが発生しました"}
            {error === "OAuthCreateAccount" && "アカウントの作成に失敗しました"}
            {error === "Callback" && "コールバック処理でエラーが発生しました"}
            {error === "Default" && "認証中にエラーが発生しました"}
            {!["OAuthSignin", "OAuthCallback", "OAuthCreateAccount", "Callback", "Default"].includes(error) &&
              "認証中にエラーが発生しました。もう一度お試しください。"}
          </p>
        </div>
      )}

      {/* Googleログインボタン */}
      <button
        onClick={handleGoogleSignIn}
        className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
          theme === "dark"
            ? "bg-white text-gray-900 hover:bg-gray-100 hover:shadow-lg hover:shadow-white/10"
            : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 hover:shadow-lg"
        }`}
      >
        <GoogleIcon />
        <span>Googleでログイン</span>
      </button>

      {/* 区切り線 */}
      <div className="flex items-center my-8">
        <div
          className={`flex-1 h-px ${
            theme === "dark" ? "bg-white/10" : "bg-gray-200"
          }`}
        />
        <span
          className={`px-4 text-sm ${
            theme === "dark" ? "text-white/40" : "text-gray-400"
          }`}
        >
          または
        </span>
        <div
          className={`flex-1 h-px ${
            theme === "dark" ? "bg-white/10" : "bg-gray-200"
          }`}
        />
      </div>

      {/* サービス説明 */}
      <div
        className={`p-4 rounded-lg mb-6 ${
          theme === "dark" ? "bg-white/5" : "bg-gray-50"
        }`}
      >
        <h3
          className={`font-semibold mb-2 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          AIReviewとは？
        </h3>
        <p
          className={`text-sm ${
            theme === "dark" ? "text-white/60" : "text-gray-600"
          }`}
        >
          AIがあなたのコードをリアルタイムでレビューし、
          バグの検出、リファクタリング提案、セキュリティチェックを行います。
        </p>
      </div>

      {/* 利用規約・プライバシーポリシー */}
      <p
        className={`text-xs text-center ${
          theme === "dark" ? "text-white/40" : "text-gray-400"
        }`}
      >
        ログインすることで、
        <Link
          href="/terms"
          className={`underline hover:no-underline ${
            theme === "dark" ? "text-primary-green" : "text-emerald-600"
          }`}
        >
          利用規約
        </Link>
        と
        <Link
          href="/privacy"
          className={`underline hover:no-underline ${
            theme === "dark" ? "text-primary-green" : "text-emerald-600"
          }`}
        >
          プライバシーポリシー
        </Link>
        に同意したものとみなされます。
      </p>
    </div>
  );
}

/**
 * サインインページ
 * Google OAuth認証を使用したログイン画面
 */
export default function SignInPage() {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-12 ${
        theme === "dark"
          ? "bg-dark-bg"
          : "bg-gradient-to-br from-emerald-50 via-white to-teal-50"
      }`}
    >
      {/* 背景装飾 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl ${
            theme === "dark" ? "bg-primary-green/10" : "bg-emerald-200/50"
          }`}
        />
        <div
          className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl ${
            theme === "dark" ? "bg-accent-teal/10" : "bg-teal-200/50"
          }`}
        />
      </div>

      {/* サインインフォーム（Suspenseでラップ） */}
      <Suspense
        fallback={
          <div
            className={`w-full max-w-md p-8 rounded-2xl ${
              theme === "dark"
                ? "bg-dark-card border border-dark-border"
                : "bg-white border border-gray-200 shadow-xl"
            }`}
          >
            <div className="animate-pulse">
              <div className="h-12 bg-gray-300/20 rounded-lg mb-6" />
              <div className="h-8 bg-gray-300/20 rounded-lg mb-4" />
              <div className="h-4 bg-gray-300/20 rounded-lg mb-8" />
              <div className="h-14 bg-gray-300/20 rounded-xl" />
            </div>
          </div>
        }
      >
        <SignInForm />
      </Suspense>
    </div>
  );
}



