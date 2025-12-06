"use client";

import { createTheme } from "@mui/material/styles";

// ライトテーマ
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#10b981", // 緑系メインカラー
      light: "#34d399", // 明るい緑
      dark: "#059669", // 濃い緑
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#14b8a6", // ティールグリーン（アクセント）
      light: "#5eead4",
      dark: "#0d9488",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a",
      secondary: "#475569",
    },
    success: {
      main: "#10b981",
      light: "#34d399",
      dark: "#059669",
    },
    warning: {
      main: "#f59e0b",
      light: "#fbbf24",
      dark: "#d97706",
    },
    error: {
      main: "#ef4444",
      light: "#f87171",
      dark: "#dc2626",
    },
  },
  typography: {
    fontFamily: [
      '"Noto Sans JP"',
      '"Hiragino Sans"',
      '"Hiragino Kaku Gothic ProN"',
      "Meiryo",
      "sans-serif",
    ].join(","),
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      lineHeight: 1.3,
      "@media (min-width:600px)": {
        fontSize: "3rem",
      },
      "@media (min-width:900px)": {
        fontSize: "3.5rem",
      },
    },
    h2: {
      fontWeight: 700,
      fontSize: "1.75rem",
      lineHeight: 1.4,
      "@media (min-width:600px)": {
        fontSize: "2rem",
      },
      "@media (min-width:900px)": {
        fontSize: "2.25rem",
      },
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.4,
      "@media (min-width:600px)": {
        fontSize: "1.5rem",
      },
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.7,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
          padding: "12px 24px",
        },
        sizeLarge: {
          padding: "16px 32px",
          fontSize: "1.1rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        },
      },
    },
  },
});

// ダークテーマ
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#34d399", // 緑系メインカラー（ダークモード用に明るめ）
      light: "#6ee7b7",
      dark: "#10b981",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#5eead4", // ティールグリーン（ダークモード用）
      light: "#99f6e4",
      dark: "#14b8a6",
      contrastText: "#ffffff",
    },
    background: {
      default: "#0f172a",
      paper: "#1e293b",
    },
    text: {
      primary: "#f1f5f9",
      secondary: "#94a3b8",
    },
    success: {
      main: "#34d399",
      light: "#6ee7b7",
      dark: "#10b981",
    },
    warning: {
      main: "#fbbf24",
      light: "#fcd34d",
      dark: "#f59e0b",
    },
    error: {
      main: "#f87171",
      light: "#fca5a5",
      dark: "#ef4444",
    },
  },
  typography: {
    fontFamily: [
      '"Noto Sans JP"',
      '"Hiragino Sans"',
      '"Hiragino Kaku Gothic ProN"',
      "Meiryo",
      "sans-serif",
    ].join(","),
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      lineHeight: 1.3,
      "@media (min-width:600px)": {
        fontSize: "3rem",
      },
      "@media (min-width:900px)": {
        fontSize: "3.5rem",
      },
    },
    h2: {
      fontWeight: 700,
      fontSize: "1.75rem",
      lineHeight: 1.4,
      "@media (min-width:600px)": {
        fontSize: "2rem",
      },
      "@media (min-width:900px)": {
        fontSize: "2.25rem",
      },
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.4,
      "@media (min-width:600px)": {
        fontSize: "1.5rem",
      },
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.7,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
          padding: "12px 24px",
        },
        sizeLarge: {
          padding: "16px 32px",
          fontSize: "1.1rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 8px 16px -4px rgb(0 0 0 / 0.3), 0 4px 8px -4px rgb(0 0 0 / 0.2)",
        },
      },
    },
  },
});



