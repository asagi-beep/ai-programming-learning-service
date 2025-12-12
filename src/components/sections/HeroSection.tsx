"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SparklesIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useTheme } from "@/contexts/ThemeContext";
import OrganicBlobs from "@/components/ui/OrganicBlobs";

// ループするフレーズ（業務効率化を図る社会人向け）
const phrases = [
  "業務効率化を劇的に加速",
  "仕事のコードを瞬時に改善",
  "残業を減らして成果を上げる",
  "プログラミング学習を最短ルートで",
];

export default function HeroSection() {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // タイピングエフェクト（ループ）
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayedText.length < currentPhrase.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 40);
      } else {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentPhraseIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 背景グラデーション */}
      <div className={`absolute inset-0 transition-colors duration-500 ${
        theme === "dark" 
          ? "bg-gradient-to-br from-dark-bg via-dark-bg to-primary-green/10" 
          : "bg-gradient-to-br from-white via-emerald-50/50 to-teal-50/50"
      }`} />
      
      {/* 有機的なBlob背景アニメーション */}
      <OrganicBlobs />

      {/* グリッド背景 */}
      <div 
        className={`absolute inset-0 transition-opacity duration-500 ${theme === "dark" ? "opacity-20" : "opacity-10"}`}
        style={{
          backgroundImage: `
            linear-gradient(${theme === "dark" ? "rgba(16, 185, 129, 0.1)" : "rgba(16, 185, 129, 0.08)"} 1px, transparent 1px),
            linear-gradient(90deg, ${theme === "dark" ? "rgba(16, 185, 129, 0.1)" : "rgba(16, 185, 129, 0.08)"} 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* コンテンツ */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
        {/* バッジ */}
        <div
          className={`
            inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full mb-6 sm:mb-8
            transition-all duration-500
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            ${theme === "dark" 
              ? "bg-primary-green/10 border border-primary-green/30" 
              : "bg-emerald-50 border border-emerald-200"
            }
          `}
        >
          <SparklesIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${theme === "dark" ? "text-primary-green-light" : "text-emerald-600"}`} />
          <span className={`text-xs sm:text-sm font-medium ${theme === "dark" ? "text-primary-green-light" : "text-emerald-700"}`}>
            忙しい社会人のためのAIコードレビュー
          </span>
        </div>

        {/* メインコピー */}
        <h1
          className={`
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight
            transition-all duration-500 delay-75
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
        >
          <span className={theme === "dark" ? "text-white" : "text-gray-900"}>
            コードの
          </span>
          <span className={`${theme === "dark" ? "text-primary-green glow-text-green" : "text-emerald-600"}`}>
            『正解』
          </span>
          <span className={theme === "dark" ? "text-white" : "text-gray-900"}>
            を、
          </span>
          <br className="hidden sm:block" />
          <span className={theme === "dark" ? "text-white" : "text-gray-900"}>
            AIが教えます
          </span>
        </h1>

        {/* アニメーションテキスト */}
        <div
          className={`
            h-12 sm:h-16 flex items-center justify-center mb-6 sm:mb-8
            transition-all duration-500 delay-150
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
        >
          <span 
            className={`
              text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold
              ${theme === "dark" 
                ? "bg-gradient-to-r from-primary-green via-accent-teal to-accent-lime bg-clip-text text-transparent" 
                : "bg-gradient-to-r from-emerald-600 via-teal-600 to-lime-600 bg-clip-text text-transparent"
              }
            `}
          >
            {displayedText}
            <span className={`animate-pulse ${theme === "dark" ? "text-primary-green" : "text-emerald-600"}`}>|</span>
          </span>
        </div>

        {/* サブコピー */}
        <p
          className={`
            text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed px-4
            transition-all duration-500 delay-200
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            ${theme === "dark" ? "text-white/70" : "text-gray-600"}
          `}
        >
          業務自動化を目指す社会人のためのAIコードレビューサービス。
          <br className="hidden md:block" />
          コードを貼るだけで、セキュリティ・可読性・パフォーマンスの
          <br className="hidden md:block" />
          改善点をAIが<span className={theme === "dark" ? "text-accent-lime font-semibold" : "text-lime-600 font-semibold"}>わずか3秒</span>でフィードバック。
        </p>

        {/* CTA ボタン */}
        <div
          className={`
            flex flex-col sm:flex-row items-center justify-center gap-4
            transition-all duration-500 delay-300
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
        >
          <Link
            href="/signup"
            className={`
              group relative px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg text-white
              transition-all duration-300 hover:scale-105
              ${theme === "dark"
                ? "bg-gradient-to-r from-primary-green to-accent-yellow hover:shadow-glow-green"
                : "bg-gradient-to-r from-emerald-600 to-amber-500 hover:shadow-lg"
              }
            `}
          >
            <span className="flex items-center gap-2">
              無料で始める
              <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          
          <Link
            href="/demo"
            className={`
              px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg
              border-2 transition-all duration-300 hover:scale-105
              ${theme === "dark"
                ? "border-accent-teal text-accent-teal hover:bg-accent-teal/10"
                : "border-teal-500 text-teal-600 hover:bg-teal-50"
              }
            `}
          >
            デモを見る
          </Link>
        </div>

        {/* 信頼性指標 */}
        <div
          className={`
            mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-12
            transition-all duration-500 delay-400
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
        >
          {[
            { label: "レビュー精度", value: "98%", color: "green" },
            { label: "処理時間", value: "3秒", color: "teal" },
            { label: "対応言語", value: "10+", color: "lime" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-2xl sm:text-3xl md:text-4xl font-bold ${
                theme === "dark" 
                  ? stat.color === "green" ? "text-primary-green" : stat.color === "teal" ? "text-accent-teal" : "text-accent-lime"
                  : stat.color === "green" ? "text-emerald-600" : stat.color === "teal" ? "text-teal-600" : "text-lime-600"
              }`}>
                {stat.value}
              </div>
              <div className={`text-xs sm:text-sm ${theme === "dark" ? "text-white/60" : "text-gray-500"}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* スクロールインジケーター */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className={`w-6 h-10 rounded-full border-2 flex items-start justify-center p-2 ${
          theme === "dark" ? "border-white/30" : "border-gray-400"
        }`}>
          <div className={`w-1.5 h-3 rounded-full animate-pulse ${
            theme === "dark" ? "bg-primary-green" : "bg-emerald-600"
          }`} />
        </div>
      </div>
    </section>
  );
}
