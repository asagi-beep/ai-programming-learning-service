import type { Metadata } from "next";
import ThemeRegistry from "@/components/ThemeRegistry";

export const metadata: Metadata = {
  title: "AIコードレビュー学習サービス | コードの『正解』を、AIが教えます",
  description:
    "業務自動化を目指す方のためのAIコードレビューサービス。コードを貼るだけで、セキュリティ・可読性・パフォーマンスの改善点をAIが即座にフィードバック。",
  keywords: [
    "コードレビュー",
    "AI",
    "プログラミング学習",
    "業務自動化",
    "Python",
    "JavaScript",
  ],
  openGraph: {
    title: "AIコードレビュー学習サービス",
    description: "コードの『正解』を、AIが教えます",
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
    <html lang="ja">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}

