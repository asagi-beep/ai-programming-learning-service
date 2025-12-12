"use client";

import { ComponentType } from "react";
import { useTheme } from "@/contexts/ThemeContext";

type GlowColor = "green" | "teal" | "lime" | "amber";

interface CardProps {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  glowColor?: GlowColor;
  className?: string;
}

// ダークモード用グロースタイル
const darkGlowStyles: Record<GlowColor, string> = {
  green: "hover:border-primary-green/50 hover:shadow-glow-green",
  teal: "hover:border-accent-teal/50 hover:shadow-glow-teal",
  lime: "hover:border-accent-lime/50 hover:shadow-glow-lime",
  amber: "hover:border-accent-amber/50 hover:shadow-glow-amber",
};

// ライトモード用グロースタイル
const lightGlowStyles: Record<GlowColor, string> = {
  green: "hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-100",
  teal: "hover:border-teal-400 hover:shadow-lg hover:shadow-teal-100",
  lime: "hover:border-lime-400 hover:shadow-lg hover:shadow-lime-100",
  amber: "hover:border-amber-400 hover:shadow-lg hover:shadow-amber-100",
};

// ダークモード用アイコンカラー
const darkIconColors: Record<GlowColor, string> = {
  green: "text-primary-green",
  teal: "text-accent-teal",
  lime: "text-accent-lime",
  amber: "text-accent-amber",
};

// ライトモード用アイコンカラー
const lightIconColors: Record<GlowColor, string> = {
  green: "text-emerald-600",
  teal: "text-teal-600",
  lime: "text-lime-600",
  amber: "text-amber-600",
};

// ライトモード用アイコン背景
const lightIconBgColors: Record<GlowColor, string> = {
  green: "bg-emerald-50",
  teal: "bg-teal-50",
  lime: "bg-lime-50",
  amber: "bg-amber-50",
};

export default function Card({
  icon: Icon,
  title,
  description,
  glowColor = "green",
  className = "",
}: CardProps) {
  const { theme } = useTheme();

  return (
    <div
      className={`
        group relative h-full
        backdrop-blur-sm rounded-2xl
        border p-5 sm:p-6 md:p-8
        transition-all duration-300 ease-out
        ${theme === "dark" 
          ? `bg-dark-card border-dark-border ${darkGlowStyles[glowColor]}` 
          : `bg-white border-gray-200 ${lightGlowStyles[glowColor]}`
        }
        ${className}
      `}
    >
      {/* アイコン */}
      <div
        className={`
          w-12 h-12 sm:w-14 sm:h-14 rounded-xl
          flex items-center justify-center
          mb-4 sm:mb-5
          transition-all duration-300
          group-hover:scale-110
          ${theme === "dark" 
            ? `bg-white/5 ${darkIconColors[glowColor]}` 
            : `${lightIconBgColors[glowColor]} ${lightIconColors[glowColor]}`
          }
        `}
      >
        <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
      </div>

      {/* タイトル */}
      <h3 className={`text-lg sm:text-xl font-bold mb-2 sm:mb-3 transition-colors duration-300 ${
        theme === "dark" ? "text-white" : "text-gray-900"
      }`}>
        {title}
      </h3>

      {/* 説明文 */}
      <p className={`leading-relaxed text-sm sm:text-base ${
        theme === "dark" ? "text-white/70" : "text-gray-600"
      }`}>
        {description}
      </p>
    </div>
  );
}

