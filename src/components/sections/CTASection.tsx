"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { RocketLaunchIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { useTheme } from "@/contexts/ThemeContext";

const benefits = [
  "クレジットカード不要で今すぐ開始",
  "1日5回まで無料でレビュー",
  "いつでもキャンセル可能",
];

export default function CTASection() {
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
      { threshold: 0.2 }
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
          ? "bg-gradient-to-br from-primary-green/20 via-dark-bg to-accent-teal/20"
          : "bg-gradient-to-br from-emerald-100/50 via-gray-50 to-teal-100/50"
      }`} />

      {/* グローエフェクト */}
      <div className={`absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full blur-[150px] ${
        theme === "dark" ? "bg-primary-green/30" : "bg-emerald-200/50"
      }`} />
      <div className={`absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full blur-[150px] ${
        theme === "dark" ? "bg-accent-amber/30" : "bg-amber-200/50"
      }`} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* アイコン */}
        <div
          className={`
            inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl mb-6 sm:mb-8
            transition-all duration-700
            ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"}
            ${theme === "dark"
              ? "bg-gradient-to-br from-primary-green/20 to-accent-teal/20"
              : "bg-gradient-to-br from-emerald-100 to-teal-100"
            }
          `}
        >
          <RocketLaunchIcon className={`w-8 h-8 sm:w-10 sm:h-10 ${
            theme === "dark" ? "text-primary-green" : "text-emerald-600"
          }`} />
        </div>

        {/* ヘッドライン */}
        <h2
          className={`
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6
            transition-all duration-700 delay-100
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
            ${theme === "dark" ? "text-white" : "text-gray-900"}
          `}
        >
          今すぐ
          <span className={theme === "dark" ? "text-primary-green" : "text-emerald-600"}>業務効率化</span>
          を始めよう
        </h2>

        {/* サブヘッドライン */}
        <p
          className={`
            text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto px-4
            transition-all duration-700 delay-200
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
            ${theme === "dark" ? "text-white/70" : "text-gray-600"}
          `}
        >
          忙しい社会人のあなたへ。AIの力で、仕事のコードを瞬時に改善。
          <br className="hidden sm:block" />
          まずは無料で、その効果を実感してください。
        </p>

        {/* ベネフィットリスト */}
        <div
          className={`
            flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-8 sm:mb-10
            transition-all duration-700 delay-300
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircleIcon className={`w-5 h-5 flex-shrink-0 ${
                theme === "dark" ? "text-accent-lime" : "text-lime-600"
              }`} />
              <span className={`text-sm sm:text-base ${
                theme === "dark" ? "text-white/80" : "text-gray-700"
              }`}>
                {benefit}
              </span>
            </div>
          ))}
        </div>

        {/* CTAボタン */}
        <div
          className={`
            transition-all duration-700 delay-400
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          <Link
            href="/signup"
            className={`
              inline-flex items-center gap-2 px-8 sm:px-12 py-4 sm:py-5 rounded-full
              text-base sm:text-lg font-bold text-white
              transition-all duration-300 hover:scale-105
              ${theme === "dark"
                ? "bg-gradient-to-r from-primary-green to-accent-yellow hover:shadow-glow-green animate-pulse-glow"
                : "bg-gradient-to-r from-emerald-600 to-amber-500 hover:shadow-xl"
              }
            `}
          >
            <span>無料で始める</span>
            <RocketLaunchIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </Link>
        </div>

        {/* 注釈 */}
        <p
          className={`
            mt-6 text-xs sm:text-sm
            transition-all duration-700 delay-500
            ${isVisible ? "opacity-100" : "opacity-0"}
            ${theme === "dark" ? "text-white/50" : "text-gray-500"}
          `}
        >
          ※ 無料プランは1日5回までのレビューが可能です。クレジットカードの登録は不要です。
        </p>
      </div>
    </section>
  );
}

