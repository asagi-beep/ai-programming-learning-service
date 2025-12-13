import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  CodeBracketIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CogIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import DashboardClient from "./DashboardClient";

/**
 * ダッシュボードページ（サーバーコンポーネント）
 * 認証済みユーザーのみアクセス可能
 */
export default async function DashboardPage() {
  // サーバーサイドでセッションを取得
  const session = await auth();

  // 未認証の場合はサインインページへリダイレクト
  if (!session?.user) {
    redirect("/auth/signin");
  }

  const { user } = session;

  return <DashboardClient user={user} />;
}



