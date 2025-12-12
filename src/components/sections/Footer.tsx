"use client";

import Link from "next/link";
import { CodeBracketIcon } from "@heroicons/react/24/outline";
import { useTheme } from "@/contexts/ThemeContext";

const footerLinks = {
  service: [
    { label: "特徴", href: "#features" },
    { label: "料金プラン", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  company: [
    { label: "お問い合わせ", href: "/contact" },
    { label: "利用規約", href: "/terms" },
    { label: "プライバシーポリシー", href: "/privacy" },
    { label: "特定商取引法に基づく表記", href: "/legal" },
  ],
};

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className={`relative py-12 sm:py-16 transition-colors duration-500 ${
      theme === "dark"
        ? "bg-dark-bg border-t border-white/10"
        : "bg-white border-t border-gray-200"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* ロゴ・説明 */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className={`p-2 rounded-lg ${
                theme === "dark" ? "bg-primary-green/10" : "bg-emerald-100"
              }`}>
                <CodeBracketIcon className={`w-5 h-5 sm:w-6 sm:h-6 ${
                  theme === "dark" ? "text-primary-green" : "text-emerald-600"
                }`} />
              </div>
              <span className={`text-lg sm:text-xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                AI<span className={theme === "dark" ? "text-primary-green" : "text-emerald-600"}>Review</span>
              </span>
            </Link>
            <p className={`text-sm sm:text-base max-w-md ${
              theme === "dark" ? "text-white/60" : "text-gray-600"
            }`}>
              業務効率化を図る社会人のためのAIコードレビューサービス。
              コードを貼るだけで、セキュリティ・可読性・パフォーマンスの改善点をAIが即座にフィードバック。
            </p>
          </div>

          {/* サービス */}
          <div>
            <h3 className={`font-semibold mb-4 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              サービス
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.service.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm sm:text-base transition-colors duration-300 ${
                      theme === "dark"
                        ? "text-white/60 hover:text-primary-green"
                        : "text-gray-600 hover:text-emerald-600"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 会社情報 */}
          <div>
            <h3 className={`font-semibold mb-4 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              サポート
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm sm:text-base transition-colors duration-300 ${
                      theme === "dark"
                        ? "text-white/60 hover:text-accent-yellow"
                        : "text-gray-600 hover:text-amber-600"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* コピーライト */}
        <div className={`mt-10 sm:mt-12 pt-6 sm:pt-8 border-t ${
          theme === "dark" ? "border-white/10" : "border-gray-200"
        }`}>
          <p className={`text-xs sm:text-sm text-center ${
            theme === "dark" ? "text-white/40" : "text-gray-500"
          }`}>
            © {new Date().getFullYear()} AIReview. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

