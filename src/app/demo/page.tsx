"use client";

import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  useTheme,
  alpha,
  Paper,
  Chip,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import {
  Code as CodeIcon,
  ArrowBack as ArrowBackIcon,
  PlayArrow as PlayArrowIcon,
  ContentPaste as ContentPasteIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from "@mui/icons-material";
import { useColorMode } from "@/components/ThemeRegistry";
import NextLink from "next/link";
import { useState } from "react";

// サンプルコード
const sampleCodes = {
  python: `def calculate_total(items):
    total = 0
    for i in range(len(items)):
        total = total + items[i]['price'] * items[i]['quantity']
    return total

# 使用例
cart = [
    {'name': 'りんご', 'price': 100, 'quantity': 3},
    {'name': 'バナナ', 'price': 80, 'quantity': 5}
]
print(calculate_total(cart))`,
  javascript: `function calculateTotal(items) {
    var total = 0;
    for (var i = 0; i < items.length; i++) {
        total = total + items[i].price * items[i].quantity;
    }
    return total;
}

// 使用例
var cart = [
    {name: 'りんご', price: 100, quantity: 3},
    {name: 'バナナ', price: 80, quantity: 5}
];
console.log(calculateTotal(cart));`,
  typescript: `interface CartItem {
    name: string;
    price: number;
    quantity: number;
}

function calculateTotal(items: CartItem[]): number {
    var total = 0;
    for (var i = 0; i < items.length; i++) {
        total = total + items[i].price * items[i].quantity;
    }
    return total;
}`,
};

// サンプルレビュー結果
const sampleReviewResults = [
  {
    type: "warning",
    title: "forループの改善",
    description:
      "for...ofまたはreduce()を使用することで、コードの可読性が向上します。range(len(items))パターンは冗長です。",
    suggestion: `# 改善例
total = sum(item['price'] * item['quantity'] for item in items)`,
  },
  {
    type: "info",
    title: "型ヒントの追加を推奨",
    description:
      "関数に型ヒントを追加することで、コードの意図が明確になり、IDEの補完機能も活用できます。",
    suggestion: `def calculate_total(items: list[dict]) -> int:`,
  },
  {
    type: "success",
    title: "関数の命名",
    description:
      "calculate_totalという関数名は、処理内容を適切に表現しています。命名規則（スネークケース）も正しいです。",
    suggestion: null,
  },
  {
    type: "warning",
    title: "エラーハンドリングの追加",
    description:
      "空のリストや不正なデータが渡された場合の処理がありません。堅牢なコードにするためにバリデーションを追加しましょう。",
    suggestion: `def calculate_total(items: list[dict]) -> int:
    if not items:
        return 0
    # 以下、計算処理...`,
  },
];

export default function DemoPage() {
  const theme = useTheme();
  const { mode, toggleColorMode } = useColorMode();
  const isDark = mode === "dark";

  // 状態管理
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<"python" | "javascript" | "typescript">("python");
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // サンプルコード挿入
  const handleInsertSample = () => {
    setCode(sampleCodes[language]);
    setShowResults(false);
  };

  // レビュー実行（デモ用）
  const handleRunReview = () => {
    if (!code.trim()) {
      alert("コードを入力してください");
      return;
    }
    
    setIsLoading(true);
    // デモ用：擬似的な読み込み時間
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
    }, 1500);
  };

  // レビュータイプに応じたアイコンと色
  const getReviewTypeStyle = (type: string) => {
    switch (type) {
      case "warning":
        return {
          icon: <WarningIcon />,
          color: theme.palette.warning.main,
          bgcolor: alpha(theme.palette.warning.main, 0.1),
        };
      case "success":
        return {
          icon: <CheckCircleIcon />,
          color: theme.palette.success.main,
          bgcolor: alpha(theme.palette.success.main, 0.1),
        };
      case "info":
      default:
        return {
          icon: <InfoIcon />,
          color: theme.palette.info.main,
          bgcolor: alpha(theme.palette.info.main, 0.1),
        };
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: theme.palette.background.default,
      }}
    >
      {/* ヘッダー */}
      <Box
        component="header"
        sx={{
          py: 2,
          px: { xs: 2, sm: 3 },
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
          bgcolor: alpha(theme.palette.background.default, 0.8),
          backdropFilter: "blur(12px)",
        }}
      >
        <Container maxWidth="lg">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            {/* ロゴ */}
            <Stack
              component={NextLink}
              href="/"
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ textDecoration: "none" }}
            >
              <CodeIcon sx={{ color: theme.palette.primary.main }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                  display: { xs: "none", sm: "block" },
                }}
              >
                AIコードレビュー
              </Typography>
            </Stack>

            {/* 右側のボタン */}
            <Stack direction="row" spacing={2} alignItems="center">
              <IconButton
                onClick={toggleColorMode}
                size="small"
                sx={{
                  color: theme.palette.text.secondary,
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                {isDark ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
              <Button
                component={NextLink}
                href="/"
                startIcon={<ArrowBackIcon />}
                sx={{ color: theme.palette.text.secondary }}
              >
                トップに戻る
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* メインコンテンツ */}
      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          py: { xs: 3, md: 4 },
          px: { xs: 2, sm: 3 },
        }}
      >
        <Stack spacing={4}>
          {/* タイトル */}
          <Stack spacing={1}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
              }}
            >
              デモ：AIコードレビュー
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: theme.palette.text.secondary }}
            >
              コードを入力して、AIがどのようなレビューを行うか体験してみましょう。
            </Typography>
          </Stack>

          {/* 2カラムレイアウト */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
              gap: 3,
            }}
          >
            {/* 左側：コード入力 */}
            <Paper
              elevation={isDark ? 0 : 1}
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 3,
                bgcolor: isDark
                  ? alpha(theme.palette.background.paper, 0.6)
                  : theme.palette.background.paper,
                border: `1px solid ${alpha(theme.palette.divider, isDark ? 0.1 : 0.08)}`,
              }}
            >
              <Stack spacing={3}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent="space-between"
                  alignItems={{ xs: "stretch", sm: "center" }}
                  spacing={2}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    コード入力
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <InputLabel>言語</InputLabel>
                      <Select
                        value={language}
                        label="言語"
                        onChange={(e) => {
                          setLanguage(e.target.value as typeof language);
                          setShowResults(false);
                        }}
                      >
                        <MenuItem value="python">Python</MenuItem>
                        <MenuItem value="javascript">JavaScript</MenuItem>
                        <MenuItem value="typescript">TypeScript</MenuItem>
                      </Select>
                    </FormControl>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<ContentPasteIcon />}
                      onClick={handleInsertSample}
                      sx={{ whiteSpace: "nowrap" }}
                    >
                      サンプル挿入
                    </Button>
                  </Stack>
                </Stack>

                <TextField
                  fullWidth
                  multiline
                  rows={15}
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setShowResults(false);
                  }}
                  placeholder={`${language === "python" ? "Python" : language === "javascript" ? "JavaScript" : "TypeScript"}のコードを入力してください...`}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontFamily: "monospace",
                      fontSize: "0.875rem",
                      borderRadius: 2,
                      bgcolor: isDark
                        ? alpha(theme.palette.background.default, 0.5)
                        : alpha(theme.palette.background.default, 0.3),
                    },
                  }}
                />

                <Button
                  variant="contained"
                  size="large"
                  startIcon={<PlayArrowIcon />}
                  onClick={handleRunReview}
                  disabled={isLoading}
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                    "&:hover": {
                      background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                    },
                    "&:disabled": {
                      background: theme.palette.action.disabledBackground,
                    },
                  }}
                >
                  {isLoading ? "レビュー中..." : "レビューを実行"}
                </Button>
              </Stack>
            </Paper>

            {/* 右側：レビュー結果 */}
            <Paper
              elevation={isDark ? 0 : 1}
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 3,
                bgcolor: isDark
                  ? alpha(theme.palette.background.paper, 0.6)
                  : theme.palette.background.paper,
                border: `1px solid ${alpha(theme.palette.divider, isDark ? 0.1 : 0.08)}`,
                minHeight: { xs: 300, lg: "auto" },
              }}
            >
              <Stack spacing={3}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    レビュー結果
                  </Typography>
                  {showResults && (
                    <Chip
                      label={`${sampleReviewResults.length}件の指摘`}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  )}
                </Stack>

                {!showResults ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      py: 8,
                      color: theme.palette.text.secondary,
                    }}
                  >
                    <CodeIcon sx={{ fontSize: 48, opacity: 0.3, mb: 2 }} />
                    <Typography variant="body1" textAlign="center">
                      コードを入力して「レビューを実行」を
                      <br />
                      クリックしてください
                    </Typography>
                  </Box>
                ) : (
                  <Stack spacing={2} divider={<Divider />}>
                    {sampleReviewResults.map((result, index) => {
                      const style = getReviewTypeStyle(result.type);
                      return (
                        <Box key={index}>
                          <Stack spacing={1.5}>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: 28,
                                  height: 28,
                                  borderRadius: 1,
                                  bgcolor: style.bgcolor,
                                  color: style.color,
                                }}
                              >
                                {style.icon}
                              </Box>
                              <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: 600, color: theme.palette.text.primary }}
                              >
                                {result.title}
                              </Typography>
                            </Stack>
                            <Typography
                              variant="body2"
                              sx={{ color: theme.palette.text.secondary, pl: 4.5 }}
                            >
                              {result.description}
                            </Typography>
                            {result.suggestion && (
                              <Box
                                sx={{
                                  ml: 4.5,
                                  p: 1.5,
                                  borderRadius: 1,
                                  bgcolor: isDark
                                    ? alpha(theme.palette.background.default, 0.5)
                                    : alpha(theme.palette.background.default, 0.5),
                                  fontFamily: "monospace",
                                  fontSize: "0.75rem",
                                  whiteSpace: "pre-wrap",
                                  overflowX: "auto",
                                }}
                              >
                                {result.suggestion}
                              </Box>
                            )}
                          </Stack>
                        </Box>
                      );
                    })}
                  </Stack>
                )}
              </Stack>
            </Paper>
          </Box>

          {/* CTAセクション */}
          <Paper
            elevation={isDark ? 0 : 1}
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: 3,
              background: isDark
                ? `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.2)} 0%, ${alpha(theme.palette.secondary.dark, 0.15)} 100%)`
                : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              textAlign: "center",
            }}
          >
            <Stack spacing={2} alignItems="center">
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                本格的なレビューを受けてみませんか？
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary, maxWidth: 500 }}
              >
                無料登録で、より詳細なレビューや学習履歴の管理が可能になります。
                今すぐ始めましょう。
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 1 }}>
                <Button
                  component={NextLink}
                  href="/signup"
                  variant="contained"
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  }}
                >
                  無料で登録する
                </Button>
                <Button
                  component={NextLink}
                  href="/login"
                  variant="outlined"
                >
                  ログインする
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Container>

      {/* フッター */}
      <Box
        component="footer"
        sx={{
          py: 3,
          textAlign: "center",
          borderTop: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
        }}
      >
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          © {new Date().getFullYear()} AIコードレビュー学習サービス
        </Typography>
      </Box>
    </Box>
  );
}



