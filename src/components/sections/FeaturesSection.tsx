"use client";

import { useEffect, useRef, useState } from "react";
import Card from "@/components/ui/Card";
import { useTheme } from "@/contexts/ThemeContext";
import {
  SparklesIcon,
  CodeBracketIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  UserGroupIcon,
  ClockIcon,
  AcademicCapIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";

// カードの色を交互に配置: 緑→ティール→ライム→アンバー→緑→シアン...
const glowColors = ["green", "teal", "lime", "amber", "green", "teal", "lime", "amber", "green"] as const;

const features = [
  {
    icon: SparklesIcon,
    title: "AIリアルタイムレビュー",
    description:
      "業務コードを貼り付けた瞬間、AIが自動で解析。わずか3秒で改善点と最適化提案を提示。仕事中の待ち時間ゼロで即座にフィードバック。",
  },
  {
    icon: ShieldCheckIcon,
    title: "セキュリティ脆弱性検出",
    description:
      "SQLインジェクション、XSS、認証漏れなどの脆弱性を自動検出。本番環境にデプロイする前にセキュリティリスクを排除し、業務品質を担保。",
  },
  {
    icon: CodeBracketIcon,
    title: "マルチ言語サポート",
    description:
      "Python、JavaScript、TypeScript、VBA、GASなど業務でよく使う言語に対応。言語ごとのベストプラクティスで業務効率化をサポート。",
  },
  {
    icon: ClockIcon,
    title: "時短コードレビュー",
    description:
      "人間のレビュアーを待つ必要なし。24時間いつでも即座にレビュー完了。忙しい社会人の限られた時間を最大限に活用できます。",
  },
  {
    icon: ChartBarIcon,
    title: "成長トラッキング",
    description:
      "コードの品質スコア、改善率、習得スキルを可視化。業務での成長を数値で実感でき、キャリアアップに直結するスキルを蓄積。",
  },
  {
    icon: RocketLaunchIcon,
    title: "業務自動化支援",
    description:
      "Excel VBA、Google Apps Script、Pythonスクリプトなど、業務自動化に特化したレビュー。効率化のベストプラクティスを提案。",
  },
  {
    icon: AcademicCapIcon,
    title: "実践的学習パス",
    description:
      "業務で即使えるスキルを最短で習得。机上の空論ではなく、実際の業務コードをベースにした実践的なカリキュラムを自動生成。",
  },
  {
    icon: CpuChipIcon,
    title: "パフォーマンス最適化",
    description:
      "処理速度の遅いコードを自動検出。ボトルネックを特定し、業務システムの高速化につながる具体的な改善案を提示。",
  },
  {
    icon: UserGroupIcon,
    title: "チーム導入サポート",
    description:
      "部署・チーム単位での導入もOK。コードの品質基準を統一し、チーム全体の業務効率化と生産性向上を実現します。",
  },
];

export default function FeaturesSection() {
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
          : "bg-gradient-to-b from-gray-50 via-emerald-50/50 to-gray-50"
      }`} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* セクションヘッダー */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2
            className={`
              text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6
              transition-all duration-700
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              ${theme === "dark" ? "text-white" : "text-gray-900"}
            `}
          >
            <span className={theme === "dark" ? "text-primary-green" : "text-emerald-600"}>業務効率化</span>
            を実現する
            <br className="sm:hidden" />
            9つの機能
          </h2>
          <p
            className={`
              text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4
              transition-all duration-700 delay-100
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              ${theme === "dark" ? "text-white/70" : "text-gray-600"}
            `}
          >
            忙しい社会人のために設計された、業務で即使える機能を搭載。
            <br className="hidden md:block" />
            AIの力で、あなたの仕事の生産性を劇的に向上させます。
          </p>
        </div>

        {/* カードグリッド */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`
                transition-all duration-700
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              `}
              style={{ transitionDelay: `${150 + index * 100}ms` }}
            >
              <Card
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                glowColor={glowColors[index]}
                className="h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

