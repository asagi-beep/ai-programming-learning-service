import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import ThemeRegistry from "@/components/ThemeRegistry";
import { ThemeProvider } from "@/contexts/ThemeContext";
import SessionProvider from "@/components/SessionProvider";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: "AIコードレビュー学習サービス | 業務効率化を図る社会人のためのAIコードレビュー",
  description:
    "業務自動化を目指す社会人のためのAIコードレビューサービス。コードを貼るだけで、セキュリティ・可読性・パフォーマンスの改善点をAIが即座にフィードバック。忙しい社会人の業務効率化を強力にサポート。",
  keywords: [
    "コードレビュー",
    "AI",
    "プログラミング学習",
    "業務自動化",
    "業務効率化",
    "社会人",
    "Python",
    "JavaScript",
    "VBA",
    "GAS",
  ],
  openGraph: {
    title: "AIコードレビュー学習サービス | 業務効率化を図る社会人のために",
    description: "コードの『正解』を、AIが教えます。業務効率化を劇的に加速。",
    type: "website",
    locale: "ja_JP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} light`}>
      <body className={notoSansJP.className}>
        <SessionProvider>
          <ThemeProvider>
            <ThemeRegistry>{children}</ThemeRegistry>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
