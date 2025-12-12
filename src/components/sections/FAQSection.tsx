"use client";

import { useEffect, useRef, useState } from "react";
import Accordion from "@/components/ui/Accordion";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { useTheme } from "@/contexts/ThemeContext";

const faqItems = [
  // サービス概要（4問）
  {
    question: "AIコードレビューサービスとは何ですか？",
    answer:
      "当サービスは、AIがあなたの業務コードを即座に分析し、改善点やベストプラクティスを提案するオンライン学習プラットフォームです。コードを貼り付けるだけで、セキュリティ、可読性、パフォーマンスの観点から詳細なフィードバックを受け取ることができます。人間のメンターがいなくても、24時間いつでもプロ級のコードレビューを受けられるため、忙しい社会人の業務効率化に最適です。",
  },
  {
    question: "どのようなコードをレビューできますか？",
    answer:
      "Python、JavaScript、TypeScript、VBA、Google Apps Scriptを中心に、業務でよく使われるプログラミング言語に対応しています。Excel自動化、Webアプリケーション、API、データ処理スクリプト、業務自動化ツールなど、あらゆる種類の業務コードをレビュー可能です。1回のレビューで最大500行程度のコードに対応しており、それ以上の場合は分割してレビューすることをお勧めします。",
  },
  {
    question: "レビュー結果はどのように表示されますか？",
    answer:
      "レビュー結果は、カテゴリ別（セキュリティ/可読性/パフォーマンス）に整理されて表示されます。各指摘事項には、問題の説明、改善の理由、具体的な修正コード例が含まれます。また、全体の品質スコア（100点満点）も表示されるため、自分のコードの現在地を把握でき、業務での改善点を明確にできます。",
  },
  {
    question: "既存のIDE（VS Code等）と連携できますか？",
    answer:
      "現在はWebブラウザ上でのコード貼り付け方式を採用しています。VS Code拡張機能については現在開発中で、2024年内のリリースを予定しています。拡張機能がリリースされると、エディタ上で直接レビューを受けられるようになり、さらに業務効率が向上します。",
  },

  // 料金・プラン（3問）
  {
    question: "無料プランでは何ができますか？",
    answer:
      "無料プランでは、1日5回までのコードレビューをご利用いただけます。基本的なセキュリティチェック、可読性評価、パフォーマンス提案のすべてが含まれます。まずは無料プランで機能を試していただき、業務での本格的な活用には有料プランへのアップグレードをおすすめします。",
  },
  {
    question: "有料プランの料金体系を教えてください",
    answer:
      "有料プランは月額1,980円（税込）からご利用いただけます。Standardプランでは無制限のレビュー、詳細な改善履歴、優先サポートが含まれます。Proプラン（月額3,980円）では、チーム機能、高度な分析レポート、1on1メンタリング（月1回）も利用可能です。年間プランは20%オフでご提供しており、業務でフル活用される方におすすめです。",
  },
  {
    question: "途中でプランを変更できますか？",
    answer:
      "はい、いつでもプランの変更が可能です。アップグレードは即時反映され、日割り計算で差額をお支払いいただきます。ダウングレードの場合は次回更新日から適用されます。解約手続きもマイページから簡単に行え、違約金等は一切ありません。",
  },

  // 対象者・難易度（3問）
  {
    question: "プログラミング初心者でも利用できますか？",
    answer:
      "はい、初心者の方でも安心してご利用いただけます。レビュー結果は専門用語を避け、わかりやすい日本語で説明されます。また、なぜその改善が必要なのか、背景知識も含めて解説するため、学習効果も高いです。業務で初めてコードを書く方にも、しっかりサポートします。",
  },
  {
    question: "業務経験がなくても役立ちますか？",
    answer:
      "もちろんです。むしろ業務経験がない方こそ、実践的なコードレビューを受けることで、即戦力となるスキルを身につけられます。当サービスは業務で実際に使われるコードパターンをベースにしているため、就職・転職活動でのポートフォリオ作成にも役立ちます。",
  },
  {
    question: "どの程度のスキルアップが期待できますか？",
    answer:
      "個人差はありますが、多くのユーザーが3ヶ月程度で明確なスキルアップを実感されています。特に、コードの品質スコアが平均30%向上、セキュリティ関連のエラーが80%減少といった効果が報告されています。継続的な利用と実践が業務効率化の鍵となります。",
  },

  // 学習内容・カリキュラム（3問）
  {
    question: "どのような学習カリキュラムがありますか？",
    answer:
      "当サービスはカリキュラム形式ではなく、実際のコードレビューを通じた実践的学習を重視しています。あなたが書いた業務コードに対して、改善点を学んでいくスタイルです。これにより、机上の学習ではなく、実務に直結するスキルが身につきます。",
  },
  {
    question: "Excel VBAやGoogle Apps Scriptのレビューは可能ですか？",
    answer:
      "はい、業務自動化で人気のVBAとGoogle Apps Script（GAS）に完全対応しています。Excelマクロの効率化、スプレッドシートの自動化など、日常業務で使うコードをプロ品質に改善できます。業務効率化を目指す社会人の方に特に好評いただいています。",
  },
  {
    question: "セキュリティに関する学習もできますか？",
    answer:
      "はい、セキュリティは当サービスの強みの一つです。SQLインジェクション、XSS、認証・認可の問題など、業務システムでよくあるセキュリティ脆弱性を検出し、安全なコードの書き方を学べます。セキュリティ意識の高いエンジニアへの成長を強力にサポートします。",
  },

  // サポート・コミュニティ（2問）
  {
    question: "わからないことがあった場合のサポート体制は？",
    answer:
      "無料プランでもメールサポートをご利用いただけます。有料プランでは優先サポート（24時間以内に回答）が利用可能です。また、Proプランでは月1回の1on1メンタリングで、キャリア相談や技術的な質問に直接お答えします。忙しい社会人でも安心してご利用いただけます。",
  },
  {
    question: "他のユーザーと交流できるコミュニティはありますか？",
    answer:
      "有料プラン（Standard以上）のユーザー向けに、Slackコミュニティを運営しています。同じく業務効率化を目指す社会人の方々と情報交換ができ、モチベーション維持にも役立ちます。定期的なオンライン勉強会も開催しており、実践的なTipsを共有しています。",
  },
];

export default function FAQSection() {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [openStates, setOpenStates] = useState<Record<number, boolean>>({});

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

  const toggleAccordion = (index: number) => {
    setOpenStates(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <section
      ref={sectionRef}
      className={`relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden transition-colors duration-500 ${
        theme === "dark" ? "bg-dark-bg" : "bg-white"
      }`}
    >
      {/* 背景グラデーション */}
      <div className={`absolute inset-0 transition-colors duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-b from-dark-bg via-accent-teal/5 to-dark-bg"
          : "bg-gradient-to-b from-white via-teal-50/30 to-white"
      }`} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        {/* セクションヘッダー */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <div
            className={`
              inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6
              transition-all duration-700
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              ${theme === "dark"
                ? "bg-accent-teal/10 border border-accent-teal/30"
                : "bg-teal-50 border border-teal-200"
              }
            `}
          >
            <QuestionMarkCircleIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${
              theme === "dark" ? "text-accent-teal" : "text-teal-600"
            }`} />
            <span className={`text-xs sm:text-sm font-medium ${
              theme === "dark" ? "text-accent-teal" : "text-teal-700"
            }`}>
              よくある質問
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
            <span className={theme === "dark" ? "text-primary-green" : "text-emerald-600"}>FAQ</span>
            ・よくあるご質問
          </h2>
          <p
            className={`
              text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4
              transition-all duration-700 delay-200
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              ${theme === "dark" ? "text-white/70" : "text-gray-600"}
            `}
          >
            業務効率化を図る社会人の皆様からよくいただくご質問をまとめました
          </p>
        </div>

        {/* アコーディオン */}
        <div
          className={`
            space-y-3 sm:space-y-4
            transition-all duration-700 delay-300
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          <Accordion
            items={faqItems}
            openStates={openStates}
            onToggle={toggleAccordion}
          />
        </div>
      </div>
    </section>
  );
}

