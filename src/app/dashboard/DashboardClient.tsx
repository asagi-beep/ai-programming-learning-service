"use client";

import { useState, useEffect, useCallback } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import Link from "next/link";
import Image from "next/image";
import {
  CodeBracketIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CogIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  SunIcon,
  MoonIcon,
  ExclamationCircleIcon,
  ArrowPathIcon,
  PlusCircleIcon,
  ChatBubbleLeftIcon,
  Cog6ToothIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import { formatRelativeTime, getActivityTypeLabel } from "@/lib/utils";

interface DashboardClientProps {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: "user" | "admin";
  };
}

/**
 * アクティビティの型定義
 */
interface Activity {
  id: string;
  type: string;
  description: string;
  targetName: string;
  createdAt: string;
  userId: string;
}

/**
 * アクティビティ種別に応じたアイコンを返す
 */
function getActivityIcon(type: string) {
  switch (type) {
    case "review_completed":
      return CheckCircleIcon;
    case "project_created":
      return PlusCircleIcon;
    case "comment_added":
      return ChatBubbleLeftIcon;
    case "settings_updated":
      return Cog6ToothIcon;
    case "review_started":
      return PlayCircleIcon;
    default:
      return CheckCircleIcon;
  }
}

/**
 * ダッシュボードクライアントコンポーネント
 * ユーザー情報の表示と各種機能へのナビゲーション
 */
export default function DashboardClient({ user }: DashboardClientProps) {
  const { theme, toggleTheme } = useTheme();

  // アクティビティ関連の状態
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // クイックアクションカード
  const quickActions = [
    {
      icon: CodeBracketIcon,
      title: "新規レビュー",
      description: "コードをAIでレビュー",
      href: "/reviews/new",
      color: "emerald",
    },
    {
      icon: ChartBarIcon,
      title: "レビュー履歴",
      description: "過去のレビューを確認",
      href: "/reviews/history",
      color: "teal",
    },
    {
      icon: DocumentTextIcon,
      title: "レポート",
      description: "分析レポートを閲覧",
      href: "/reports",
      color: "cyan",
    },
    {
      icon: CogIcon,
      title: "設定",
      description: "アカウント設定",
      href: "/settings",
      color: "amber",
    },
  ];

  /**
   * アクティビティデータを取得
   */
  const fetchActivities = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/activities?limit=5");

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("認証が必要です。再度ログインしてください。");
        }
        throw new Error("アクティビティの取得に失敗しました。");
      }

      const data = await response.json();
      setActivities(data.activities || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // マウント時にアクティビティを取得
  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  /**
   * アクティビティリストのスケルトンローダー
   */
  const ActivitySkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-4 animate-pulse">
          <div
            className={`w-10 h-10 rounded-full ${
              theme === "dark" ? "bg-white/10" : "bg-gray-200"
            }`}
          />
          <div className="flex-1 space-y-2">
            <div
              className={`h-4 rounded w-3/4 ${
                theme === "dark" ? "bg-white/10" : "bg-gray-200"
              }`}
            />
            <div
              className={`h-3 rounded w-1/2 ${
                theme === "dark" ? "bg-white/10" : "bg-gray-200"
              }`}
            />
          </div>
          <div
            className={`h-3 rounded w-16 ${
              theme === "dark" ? "bg-white/10" : "bg-gray-200"
            }`}
          />
        </div>
      ))}
    </div>
  );

  /**
   * アクティビティリストのエラー表示
   */
  const ActivityError = () => (
    <div className="text-center py-6">
      <ExclamationCircleIcon
        className={`w-12 h-12 mx-auto mb-3 ${
          theme === "dark" ? "text-red-400" : "text-red-500"
        }`}
      />
      <p
        className={`mb-4 ${
          theme === "dark" ? "text-white/60" : "text-gray-600"
        }`}
      >
        {error}
      </p>
      <button
        onClick={fetchActivities}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
          theme === "dark"
            ? "bg-primary-green/20 hover:bg-primary-green/30 text-primary-green"
            : "bg-emerald-100 hover:bg-emerald-200 text-emerald-600"
        }`}
      >
        <ArrowPathIcon className="w-4 h-4" />
        再試行
      </button>
    </div>
  );

  /**
   * アクティビティが空の場合の表示
   */
  const ActivityEmpty = () => (
    <div className="text-center py-6">
      <CheckCircleIcon
        className={`w-12 h-12 mx-auto mb-3 ${
          theme === "dark" ? "text-white/20" : "text-gray-300"
        }`}
      />
      <p
        className={`${theme === "dark" ? "text-white/60" : "text-gray-600"}`}
      >
        まだアクティビティはありません
      </p>
      <p
        className={`text-sm mt-1 ${
          theme === "dark" ? "text-white/40" : "text-gray-400"
        }`}
      >
        新規レビューを作成して始めましょう
      </p>
    </div>
  );

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-dark-bg" : "bg-gray-50"
      }`}
    >
      {/* ヘッダー */}
      <header
        className={`sticky top-0 z-40 ${
          theme === "dark"
            ? "bg-dark-bg/80 backdrop-blur-lg border-b border-white/10"
            : "bg-white/80 backdrop-blur-lg border-b border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* ロゴ */}
            <Link href="/" className="flex items-center gap-2 group">
              <div
                className={`p-1.5 rounded-lg transition-all duration-300 group-hover:scale-110 ${
                  theme === "dark"
                    ? "bg-primary-green/10 group-hover:bg-primary-green/20"
                    : "bg-emerald-100 group-hover:bg-emerald-200"
                }`}
              >
                <CodeBracketIcon
                  className={`w-5 h-5 ${
                    theme === "dark" ? "text-primary-green" : "text-emerald-600"
                  }`}
                />
              </div>
              <span
                className={`text-lg font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                AI
                <span
                  className={
                    theme === "dark" ? "text-primary-green" : "text-emerald-600"
                  }
                >
                  Review
                </span>
              </span>
            </Link>

            {/* 右側メニュー */}
            <div className="flex items-center gap-4">
              {/* テーマ切り替え */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-white/10 hover:bg-white/20 text-accent-yellow"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                }`}
                aria-label={
                  theme === "dark"
                    ? "ライトモードに切り替え"
                    : "ダークモードに切り替え"
                }
              >
                {theme === "dark" ? (
                  <SunIcon className="w-5 h-5" />
                ) : (
                  <MoonIcon className="w-5 h-5" />
                )}
              </button>

              {/* ユーザーメニュー */}
              <div className="flex items-center gap-3">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                ) : (
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold ${
                      theme === "dark"
                        ? "bg-primary-green/20 text-primary-green"
                        : "bg-emerald-100 text-emerald-600"
                    }`}
                  >
                    {user.name?.charAt(0) || "U"}
                  </div>
                )}
                <div className="hidden sm:block">
                  <p
                    className={`text-sm font-medium ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {user.name}
                  </p>
                  <p
                    className={`text-xs ${
                      theme === "dark" ? "text-white/60" : "text-gray-500"
                    }`}
                  >
                    {user.role === "admin" ? "管理者" : "ユーザー"}
                  </p>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-white/10 hover:bg-white/20 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  ログアウト
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* ウェルカムセクション */}
        <section className="mb-8">
          <h1
            className={`text-2xl sm:text-3xl font-bold mb-2 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            おかえりなさい、{user.name?.split(" ")[0]}さん！
          </h1>
          <p
            className={`${
              theme === "dark" ? "text-white/60" : "text-gray-600"
            }`}
          >
            AIReviewダッシュボードへようこそ。今日も素晴らしいコードを書きましょう。
          </p>
        </section>

        {/* クイックアクション */}
        <section className="mb-8">
          <h2
            className={`text-lg font-semibold mb-4 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            クイックアクション
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className={`group p-6 rounded-2xl transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-dark-card border border-dark-border hover:border-primary-green/50"
                    : "bg-white border border-gray-200 hover:border-emerald-400 hover:shadow-lg"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-primary-green/10 group-hover:bg-primary-green/20"
                      : "bg-emerald-100 group-hover:bg-emerald-200"
                  }`}
                >
                  <action.icon
                    className={`w-6 h-6 ${
                      theme === "dark" ? "text-primary-green" : "text-emerald-600"
                    }`}
                  />
                </div>
                <h3
                  className={`font-semibold mb-1 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {action.title}
                </h3>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-white/60" : "text-gray-600"
                  }`}
                >
                  {action.description}
                </p>
                <div
                  className={`mt-4 flex items-center gap-1 text-sm font-medium ${
                    theme === "dark" ? "text-primary-green" : "text-emerald-600"
                  }`}
                >
                  <span>開始</span>
                  <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 最近のアクティビティ */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* アクティビティリスト */}
          <div
            className={`p-6 rounded-2xl ${
              theme === "dark"
                ? "bg-dark-card border border-dark-border"
                : "bg-white border border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2
                className={`text-lg font-semibold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                最近のアクティビティ
              </h2>
              {!isLoading && !error && activities.length > 0 && (
                <button
                  onClick={fetchActivities}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    theme === "dark"
                      ? "hover:bg-white/10 text-white/60 hover:text-white"
                      : "hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                  }`}
                  aria-label="更新"
                >
                  <ArrowPathIcon className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* ローディング状態 */}
            {isLoading && <ActivitySkeleton />}

            {/* エラー状態 */}
            {!isLoading && error && <ActivityError />}

            {/* 空状態 */}
            {!isLoading && !error && activities.length === 0 && (
              <ActivityEmpty />
            )}

            {/* アクティビティリスト */}
            {!isLoading && !error && activities.length > 0 && (
              <div className="space-y-4">
                {activities.map((activity) => {
                  const IconComponent = getActivityIcon(activity.type);
                  return (
                    <div key={activity.id} className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          theme === "dark"
                            ? "bg-primary-green/10"
                            : "bg-emerald-100"
                        }`}
                      >
                        <IconComponent
                          className={`w-5 h-5 ${
                            theme === "dark"
                              ? "text-primary-green"
                              : "text-emerald-600"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`font-medium truncate ${
                            theme === "dark" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {getActivityTypeLabel(activity.type)}
                        </p>
                        <p
                          className={`text-sm truncate ${
                            theme === "dark" ? "text-white/60" : "text-gray-600"
                          }`}
                        >
                          {activity.targetName}
                        </p>
                      </div>
                      <span
                        className={`text-sm whitespace-nowrap ${
                          theme === "dark" ? "text-white/40" : "text-gray-400"
                        }`}
                      >
                        {formatRelativeTime(activity.createdAt)}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ユーザー情報カード */}
          <div
            className={`p-6 rounded-2xl ${
              theme === "dark"
                ? "bg-dark-card border border-dark-border"
                : "bg-white border border-gray-200"
            }`}
          >
            <h2
              className={`text-lg font-semibold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              アカウント情報
            </h2>
            <div className="flex items-center gap-4 mb-6">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "User"}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              ) : (
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${
                    theme === "dark"
                      ? "bg-primary-green/20 text-primary-green"
                      : "bg-emerald-100 text-emerald-600"
                  }`}
                >
                  {user.name?.charAt(0) || "U"}
                </div>
              )}
              <div>
                <h3
                  className={`text-xl font-semibold ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {user.name}
                </h3>
                <p
                  className={`${
                    theme === "dark" ? "text-white/60" : "text-gray-600"
                  }`}
                >
                  {user.email}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div
                className={`flex justify-between py-2 border-b ${
                  theme === "dark" ? "border-white/10" : "border-gray-100"
                }`}
              >
                <span
                  className={`${
                    theme === "dark" ? "text-white/60" : "text-gray-600"
                  }`}
                >
                  ロール
                </span>
                <span
                  className={`font-medium ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {user.role === "admin" ? "管理者" : "一般ユーザー"}
                </span>
              </div>
              <div
                className={`flex justify-between py-2 border-b ${
                  theme === "dark" ? "border-white/10" : "border-gray-100"
                }`}
              >
                <span
                  className={`${
                    theme === "dark" ? "text-white/60" : "text-gray-600"
                  }`}
                >
                  プラン
                </span>
                <span
                  className={`font-medium ${
                    theme === "dark" ? "text-primary-green" : "text-emerald-600"
                  }`}
                >
                  無料プラン
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span
                  className={`${
                    theme === "dark" ? "text-white/60" : "text-gray-600"
                  }`}
                >
                  ユーザーID
                </span>
                <span
                  className={`font-mono text-sm ${
                    theme === "dark" ? "text-white/40" : "text-gray-400"
                  }`}
                >
                  {user.id?.slice(0, 8)}...
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
