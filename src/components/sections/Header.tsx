"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import {
  CodeBracketIcon,
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "@/contexts/ThemeContext";

/**
 * ナビゲーションリンク
 */
const navLinks = [
  { label: "特徴", href: "#features" },
  { label: "FAQ", href: "#faq" },
  { label: "お問い合わせ", href: "/contact" },
];

/**
 * ヘッダーコンポーネント
 * ログイン状態に応じて表示を切り替え
 */
export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // セッション読み込み中かどうか
  const isLoading = status === "loading";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ユーザーメニューを閉じる（外部クリック時）
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".user-menu-container")) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  /**
   * ログアウト処理
   */
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${
          isScrolled || isMobileMenuOpen
            ? theme === "dark"
              ? "bg-dark-bg/80 backdrop-blur-lg border-b border-white/10"
              : "bg-white/80 backdrop-blur-lg border-b border-gray-200"
            : "bg-transparent"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* ロゴ */}
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className={`p-1.5 sm:p-2 rounded-lg transition-all duration-300 group-hover:scale-110 ${
                theme === "dark"
                  ? "bg-primary-green/10 group-hover:bg-primary-green/20"
                  : "bg-emerald-100 group-hover:bg-emerald-200"
              }`}
            >
              <CodeBracketIcon
                className={`w-5 h-5 sm:w-6 sm:h-6 ${
                  theme === "dark" ? "text-primary-green" : "text-emerald-600"
                }`}
              />
            </div>
            <span
              className={`text-lg sm:text-xl font-bold ${
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

          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors duration-300 ${
                  theme === "dark"
                    ? "text-white/70 hover:text-primary-green"
                    : "text-gray-600 hover:text-emerald-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* 右側ボタン群 */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* テーマ切り替えトグル */}
            <button
              onClick={toggleTheme}
              className={`
                p-2 sm:p-2.5 rounded-full transition-all duration-300
                ${
                  theme === "dark"
                    ? "bg-white/10 hover:bg-white/20 text-accent-yellow"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                }
              `}
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

            {/* ログイン状態に応じた表示 */}
            {isLoading ? (
              // ローディング表示
              <div className="hidden sm:flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full animate-pulse ${
                    theme === "dark" ? "bg-white/10" : "bg-gray-200"
                  }`}
                />
              </div>
            ) : session?.user ? (
              // ログイン済み - ユーザーメニュー
              <div className="hidden sm:flex items-center gap-3 relative user-menu-container">
                {/* ダッシュボードリンク */}
                <Link
                  href="/dashboard"
                  className={`px-3 py-2 rounded-lg font-medium transition-colors duration-300 ${
                    theme === "dark"
                      ? "text-white/70 hover:text-primary-green hover:bg-white/5"
                      : "text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
                  }`}
                >
                  ダッシュボード
                </Link>

                {/* ユーザーアイコン */}
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      width={36}
                      height={36}
                      className="rounded-full ring-2 ring-transparent hover:ring-primary-green transition-all"
                    />
                  ) : (
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold ${
                        theme === "dark"
                          ? "bg-primary-green/20 text-primary-green"
                          : "bg-emerald-100 text-emerald-600"
                      }`}
                    >
                      {session.user.name?.charAt(0) || "U"}
                    </div>
                  )}
                </button>

                {/* ドロップダウンメニュー */}
                {isUserMenuOpen && (
                  <div
                    className={`absolute right-0 top-full mt-2 w-64 rounded-xl shadow-xl border overflow-hidden ${
                      theme === "dark"
                        ? "bg-dark-card border-dark-border"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    {/* ユーザー情報 */}
                    <div
                      className={`px-4 py-3 border-b ${
                        theme === "dark" ? "border-white/10" : "border-gray-100"
                      }`}
                    >
                      <p
                        className={`font-medium ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {session.user.name}
                      </p>
                      <p
                        className={`text-sm truncate ${
                          theme === "dark" ? "text-white/60" : "text-gray-500"
                        }`}
                      >
                        {session.user.email}
                      </p>
                    </div>

                    {/* メニューアイテム */}
                    <div className="py-2">
                      <Link
                        href="/dashboard"
                        className={`block px-4 py-2 transition-colors ${
                          theme === "dark"
                            ? "text-white/70 hover:bg-white/5 hover:text-white"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        ダッシュボード
                      </Link>
                      <Link
                        href="/settings"
                        className={`block px-4 py-2 transition-colors ${
                          theme === "dark"
                            ? "text-white/70 hover:bg-white/5 hover:text-white"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        設定
                      </Link>
                    </div>

                    {/* ログアウト */}
                    <div
                      className={`border-t py-2 ${
                        theme === "dark" ? "border-white/10" : "border-gray-100"
                      }`}
                    >
                      <button
                        onClick={handleSignOut}
                        className={`w-full text-left px-4 py-2 flex items-center gap-2 transition-colors ${
                          theme === "dark"
                            ? "text-red-400 hover:bg-red-500/10"
                            : "text-red-600 hover:bg-red-50"
                        }`}
                      >
                        <ArrowRightOnRectangleIcon className="w-5 h-5" />
                        ログアウト
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // 未ログイン - ログイン・新規登録
              <div className="hidden sm:flex items-center gap-2 sm:gap-4">
                <Link
                  href="/auth/signin"
                  className={`px-3 sm:px-4 py-2 font-medium transition-colors duration-300 ${
                    theme === "dark"
                      ? "text-white/70 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  ログイン
                </Link>
                <Link
                  href="/auth/signin"
                  className={`
                    px-4 sm:px-6 py-2 rounded-full font-semibold text-white
                    transition-all duration-300 hover:scale-105 text-sm sm:text-base
                    ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-primary-green to-accent-yellow hover:shadow-glow-green"
                        : "bg-gradient-to-r from-emerald-600 to-amber-500 hover:shadow-lg"
                    }
                  `}
                >
                  無料で始める
                </Link>
              </div>
            )}

            {/* モバイルメニューボタン */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
                theme === "dark"
                  ? "text-white/70 hover:text-white hover:bg-white/10"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
              aria-label="メニューを開く"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* モバイルメニュー */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden py-4 border-t transition-colors duration-300 ${
              theme === "dark"
                ? "border-white/10 bg-dark-bg/95 backdrop-blur-lg"
                : "border-gray-200 bg-white/95 backdrop-blur-lg"
            }`}
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium transition-colors duration-300 py-2 ${
                    theme === "dark"
                      ? "text-white/70 hover:text-primary-green"
                      : "text-gray-600 hover:text-emerald-600"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <hr
                className={
                  theme === "dark" ? "border-white/10" : "border-gray-200"
                }
              />

              {session?.user ? (
                // ログイン済み - モバイルメニュー
                <>
                  {/* ユーザー情報 */}
                  <div className="flex items-center gap-3 py-2">
                    {session.user.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                          theme === "dark"
                            ? "bg-primary-green/20 text-primary-green"
                            : "bg-emerald-100 text-emerald-600"
                        }`}
                      >
                        {session.user.name?.charAt(0) || "U"}
                      </div>
                    )}
                    <div>
                      <p
                        className={`font-medium ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {session.user.name}
                      </p>
                      <p
                        className={`text-sm ${
                          theme === "dark" ? "text-white/60" : "text-gray-500"
                        }`}
                      >
                        {session.user.email}
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/dashboard"
                    className={`font-medium transition-colors duration-300 py-2 ${
                      theme === "dark"
                        ? "text-primary-green hover:text-primary-green-light"
                        : "text-emerald-600 hover:text-emerald-700"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    ダッシュボード
                  </Link>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleSignOut();
                    }}
                    className={`text-left font-medium transition-colors duration-300 py-2 flex items-center gap-2 ${
                      theme === "dark"
                        ? "text-red-400 hover:text-red-300"
                        : "text-red-600 hover:text-red-700"
                    }`}
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    ログアウト
                  </button>
                </>
              ) : (
                // 未ログイン - モバイルメニュー
                <>
                  <Link
                    href="/auth/signin"
                    className={`font-medium transition-colors duration-300 py-2 ${
                      theme === "dark"
                        ? "text-white/70 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    ログイン
                  </Link>
                  <Link
                    href="/auth/signin"
                    className={`
                      text-center py-3 rounded-full font-semibold text-white
                      transition-all duration-300
                      ${
                        theme === "dark"
                          ? "bg-gradient-to-r from-primary-green to-accent-yellow"
                          : "bg-gradient-to-r from-emerald-600 to-amber-500"
                      }
                    `}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    無料で始める
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
