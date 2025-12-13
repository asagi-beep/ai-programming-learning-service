import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  CogIcon,
  ArrowLeftIcon,
  UserCircleIcon,
  BellIcon,
  ShieldCheckIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

/**
 * 設定ページ
 * アカウント設定を管理
 */
export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const settingsItems = [
    {
      icon: UserCircleIcon,
      title: "プロフィール",
      description: "名前、メールアドレス、プロフィール画像の変更",
    },
    {
      icon: BellIcon,
      title: "通知",
      description: "メール通知やプッシュ通知の設定",
    },
    {
      icon: ShieldCheckIcon,
      title: "セキュリティ",
      description: "パスワードや二要素認証の設定",
    },
  ];

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
              <CogIcon className="w-6 h-6 text-emerald-600 dark:text-primary-green" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                設定
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl overflow-hidden">
          {/* 設定項目リスト */}
          <div className="divide-y divide-gray-200 dark:divide-white/10">
            {settingsItems.map((item, index) => (
              <div
                key={index}
                className="p-6 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-primary-green/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-emerald-600 dark:text-primary-green" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-white/60">
                      {item.description}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-medium">
                    準備中
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 開発中のお知らせ */}
        <div className="mt-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20">
          <div className="flex items-center justify-center gap-2">
            <InformationCircleIcon className="w-5 h-5 text-blue-700 dark:text-blue-400 flex-shrink-0" />
            <p className="text-sm text-blue-700 dark:text-blue-400 text-center">
              設定機能は現在開発中です。今後のアップデートでご利用いただけます。
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

