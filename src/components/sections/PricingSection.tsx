"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CheckIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { useTheme } from "@/contexts/ThemeContext";

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaText: string;
  ctaLink: string;
  badge?: string;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "無料プラン",
    price: "¥0",
    period: "/月",
    description: "まずはお試しで始めたい方向け",
    features: [
      "1日5回までのコードレビュー",
      "基本的なセキュリティチェック",
      "可読性・パフォーマンス評価",
      "10種類以上の言語対応",
      "メールサポート",
    ],
    ctaText: "無料で始める",
    ctaLink: "/signup",
  },
  {
    name: "ベーシックプラン",
    price: "¥1,980",
    period: "/月",
    description: "業務で本格的に活用したい社会人向け",
    features: [
      "無制限のコードレビュー",
      "詳細な改善履歴・レポート",
      "高度なセキュリティ分析",
      "コード品質スコアリング",
      "優先サポート（24時間以内）",
      "チームメンバー追加（最大3名）",
      "API連携（Webhook対応）",
    ],
    highlighted: true,
    badge: "おすすめ",
    ctaText: "今すぐ始める",
    ctaLink: "/signup?plan=basic",
  },
  {
    name: "プロフェッショナルプラン",
    price: "¥3,980",
    period: "/月",
    description: "チームでの業務効率化を目指す方向け",
    features: [
      "ベーシックプランの全機能",
      "無制限のチームメンバー",
      "カスタムルール設定",
      "専属メンター（月1回1on1）",
      "プライベートSlackチャンネル",
      "高度な分析レポート（週次/月次）",
      "VS Code拡張機能（優先アクセス）",
      "オンボーディング支援",
    ],
    badge: "チーム向け",
    ctaText: "チームで始める",
    ctaLink: "/signup?plan=pro",
  },
];

export default function PricingSection() {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden transition-colors duration-500 ${
        theme === "dark" ? "bg-dark-bg" : "bg-gray-50"
      }`}
    >
      {/* 背景グラデーション */}
      <div className={`absolute inset-0 transition-colors duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-b from-dark-bg via-primary-green/5 to-dark-bg"
          : "bg-gradient-to-b from-gray-50 via-emerald-50/30 to-gray-50"
      }`} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* セクションヘッダー */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <div
            className={`
              inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6
              transition-all duration-700
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              ${theme === "dark"
                ? "bg-primary-green/10 border border-primary-green/30"
                : "bg-emerald-50 border border-emerald-200"
              }
            `}
          >
            <SparklesIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${
              theme === "dark" ? "text-primary-green" : "text-emerald-600"
            }`} />
            <span className={`text-xs sm:text-sm font-medium ${
              theme === "dark" ? "text-primary-green" : "text-emerald-700"
            }`}>
              料金プラン
            </span>
          </div>

          <h2
            className={`
              text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6
              transition-all duration-700 delay-100
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              ${theme === "dark" ? "text-white" : "text-gray-900"}
            `}
          >
            あなたに最適な
            <span className={theme === "dark" ? "text-primary-green" : "text-emerald-600"}>プラン</span>
            を選ぶ
          </h2>
          <p
            className={`
              text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4
              transition-all duration-700 delay-200
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              ${theme === "dark" ? "text-white/70" : "text-gray-600"}
            `}
          >
            業務効率化を実現する、シンプルで透明性の高い料金体系
          </p>
        </div>

        {/* 料金プランカード */}
        <div
          className={`
            grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8
            transition-all duration-700 delay-300
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`
                relative rounded-2xl overflow-hidden
                transition-all duration-300 hover:scale-105
                ${plan.highlighted
                  ? theme === "dark"
                    ? "bg-dark-card border-2 border-primary-green shadow-glow-green"
                    : "bg-white border-2 border-emerald-500 shadow-xl"
                  : theme === "dark"
                    ? "bg-dark-card border border-dark-border"
                    : "bg-white border border-gray-200 shadow-lg"
                }
              `}
            >
              {/* バッジ */}
              {plan.badge && (
                <div className={`absolute top-0 right-0 px-4 py-1 rounded-bl-xl text-xs font-bold ${
                  plan.highlighted
                    ? theme === "dark"
                      ? "bg-primary-green text-white"
                      : "bg-emerald-500 text-white"
                    : theme === "dark"
                      ? "bg-accent-teal/20 text-accent-teal"
                      : "bg-teal-100 text-teal-700"
                }`}>
                  {plan.badge}
                </div>
              )}

              <div className="p-6 sm:p-8">
                {/* プラン名 */}
                <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                  {plan.name}
                </h3>

                {/* 説明 */}
                <p className={`text-sm mb-6 ${
                  theme === "dark" ? "text-white/60" : "text-gray-600"
                }`}>
                  {plan.description}
                </p>

                {/* 価格 */}
                <div className="mb-6">
                  <span className={`text-4xl sm:text-5xl font-bold ${
                    plan.highlighted
                      ? theme === "dark" ? "text-primary-green" : "text-emerald-600"
                      : theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>
                    {plan.price}
                  </span>
                  <span className={`text-base ml-2 ${
                    theme === "dark" ? "text-white/60" : "text-gray-600"
                  }`}>
                    {plan.period}
                  </span>
                </div>

                {/* CTA ボタン */}
                <Link
                  href={plan.ctaLink}
                  className={`
                    block w-full py-3 sm:py-4 rounded-full font-semibold text-center
                    transition-all duration-300 hover:scale-105 mb-8
                    ${plan.highlighted
                      ? theme === "dark"
                        ? "bg-gradient-to-r from-primary-green to-accent-yellow text-white hover:shadow-glow-green"
                        : "bg-gradient-to-r from-emerald-600 to-amber-500 text-white hover:shadow-lg"
                      : theme === "dark"
                        ? "border-2 border-accent-teal text-accent-teal hover:bg-accent-teal/10"
                        : "border-2 border-teal-500 text-teal-600 hover:bg-teal-50"
                    }
                  `}
                >
                  {plan.ctaText}
                </Link>

                {/* 機能リスト */}
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <CheckIcon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        plan.highlighted
                          ? theme === "dark" ? "text-primary-green" : "text-emerald-600"
                          : theme === "dark" ? "text-accent-teal" : "text-teal-600"
                      }`} />
                      <span className={`text-sm ${
                        theme === "dark" ? "text-white/80" : "text-gray-700"
                      }`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 追加情報 */}
        <div
          className={`
            mt-10 sm:mt-12 text-center
            transition-all duration-700 delay-400
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          <p className={`text-sm sm:text-base ${
            theme === "dark" ? "text-white/60" : "text-gray-600"
          }`}>
            すべてのプランは<span className={theme === "dark" ? "text-primary-green font-semibold" : "text-emerald-600 font-semibold"}>いつでもキャンセル可能</span>です。
            年間プランは<span className={theme === "dark" ? "text-accent-yellow font-semibold" : "text-amber-600 font-semibold"}>20%オフ</span>でご利用いただけます。
          </p>
        </div>
      </div>
    </section>
  );
}

