import { NextResponse } from "next/server";
import { auth } from "@/auth";

/**
 * NextAuth.js v5 ミドルウェア
 * 保護されたルートへの認証チェックを実行
 */
export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  // 保護対象ルートのチェック
  const protectedRoutes = ["/dashboard"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // 認証が必要なルートに未認証でアクセスした場合
  if (isProtectedRoute && !isLoggedIn) {
    const signInUrl = new URL("/auth/signin", req.nextUrl.origin);
    // ログイン後にリダイレクトするためのcallbackUrlを設定
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // 認証済みユーザーがサインインページにアクセスした場合はダッシュボードへ
  if (pathname === "/auth/signin" && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
  }

  return NextResponse.next();
});

/**
 * ミドルウェアを適用するパスの設定
 * - /dashboard 配下: 認証必須
 * - /auth/signin: 認証済みの場合はリダイレクト
 */
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/auth/signin",
  ],
};



