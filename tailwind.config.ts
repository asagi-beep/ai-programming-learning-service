import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ========================================
        // プライマリカラー: 緑系（メイン）
        // ========================================
        "primary-green": "#10b981",
        "primary-green-light": "#34d399",
        "primary-green-dark": "#059669",

        // ========================================
        // アクセントカラー1: ティール/ターコイズ系
        // ========================================
        "accent-teal": "#14b8a6",
        "accent-teal-light": "#2dd4bf",
        "accent-cyan": "#06b6d4",

        // ========================================
        // アクセントカラー2: イエロー/アンバー系
        // ========================================
        "accent-yellow": "#eab308",
        "accent-amber": "#f59e0b",
        "accent-lime": "#84cc16",

        // ========================================
        // アクセントカラー3: ピンク/ローズ系（オプション）
        // ========================================
        "accent-pink": "#ec4899",
        "accent-rose": "#f43f5e",

        // ========================================
        // ダーク背景
        // ========================================
        "dark-bg": "#0a0a0a",
        "dark-card": "rgba(20, 20, 30, 0.8)",
        "dark-border": "rgba(255, 255, 255, 0.1)",
      },
      boxShadow: {
        // 緑系のグロー
        "glow-green": "0 0 20px rgba(16, 185, 129, 0.5), 0 0 40px rgba(16, 185, 129, 0.3)",
        "glow-green-light": "0 4px 12px rgba(16, 185, 129, 0.3)",
        // ティール系のグロー
        "glow-teal": "0 0 20px rgba(20, 184, 166, 0.5), 0 0 40px rgba(20, 184, 166, 0.3)",
        "glow-teal-light": "0 4px 12px rgba(20, 184, 166, 0.3)",
        // イエロー系のグロー
        "glow-yellow": "0 0 20px rgba(234, 179, 8, 0.5), 0 0 40px rgba(234, 179, 8, 0.3)",
        "glow-yellow-light": "0 4px 12px rgba(234, 179, 8, 0.3)",
        // ライム系のグロー
        "glow-lime": "0 0 20px rgba(132, 204, 22, 0.5), 0 0 40px rgba(132, 204, 22, 0.3)",
        "glow-lime-light": "0 4px 12px rgba(132, 204, 22, 0.3)",
        // アンバー系のグロー
        "glow-amber": "0 0 20px rgba(245, 158, 11, 0.5), 0 0 40px rgba(245, 158, 11, 0.3)",
        "glow-amber-light": "0 4px 12px rgba(245, 158, 11, 0.3)",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "float": "float 3s ease-in-out infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "float-slower": "float 8s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(16, 185, 129, 0.5)" },
          "100%": { boxShadow: "0 0 30px rgba(16, 185, 129, 0.8), 0 0 60px rgba(16, 185, 129, 0.4)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        // 緑系グラデーション
        "gradient-green-teal": "linear-gradient(135deg, #10b981, #14b8a6)",
        "gradient-green-yellow": "linear-gradient(135deg, #10b981, #eab308)",
        "gradient-teal-cyan": "linear-gradient(135deg, #14b8a6, #06b6d4)",
        "gradient-lime-amber": "linear-gradient(135deg, #84cc16, #f59e0b)",
        "gradient-trio": "linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #eab308 100%)",
      },
    },
  },
  plugins: [],
};

export default config;

