import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  DocumentTextIcon,
  ArrowLeftIcon,
  PresentationChartLineIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

/**
 * レポートページ
 * 分析レポートを閲覧
 */
export default async function ReportsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* ヘッダー */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-lg border-b border-gray-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 text-gray-600 dark:text-white/60" />
            </Link>
            <div className="flex items-center gap-2">
              <DocumentTextIcon className="w-6 h-6 text-emerald-600 dark:text-primary-green" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                レポート
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl p-8">
          {/* プレースホルダーコンテンツ */}
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-emerald-100 dark:bg-primary-green/10 flex items-center justify-center">
              <PresentationChartLineIcon className="w-10 h-10 text-emerald-600 dark:text-primary-green" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              分析レポート
            </h2>
            <p className="text-gray-600 dark:text-white/60 mb-6 max-w-md mx-auto">
              コードレビューの統計情報やトレンド分析を確認できます。
              この機能は現在開発中です。
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-sm font-medium">
              <WrenchScrewdriverIcon className="w-4 h-4" />
              Coming Soon
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

