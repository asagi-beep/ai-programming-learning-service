/**
 * NextAuth.js v5 APIルートハンドラー
 * /api/auth/* へのリクエストを処理
 */
import { handlers } from "@/auth";

// GET, POSTリクエストをNextAuthハンドラーに委譲
export const { GET, POST } = handlers;



