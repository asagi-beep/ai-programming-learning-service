"use client";

import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
  alpha,
  InputAdornment,
  Paper,
} from "@mui/material";
import {
  Code as CodeIcon,
  Visibility,
  VisibilityOff,
  ArrowBack as ArrowBackIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";
import { useColorMode } from "@/components/ThemeRegistry";
import NextLink from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const theme = useTheme();
  const { mode } = useColorMode();
  const isDark = mode === "dark";

  // フォーム状態管理（UIのみ、認証ロジックは後から実装）
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // フォームエラー状態（バリデーション用）
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  // パスワード表示切り替え
  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleToggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  // フォーム送信ハンドラ（UIのみ）
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 簡易バリデーション
    const newErrors: typeof errors = {};
    
    if (!email) {
      newErrors.email = "メールアドレスを入力してください";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "有効なメールアドレスを入力してください";
    }
    
    if (!password) {
      newErrors.password = "パスワードを入力してください";
    } else if (password.length < 8) {
      newErrors.password = "パスワードは8文字以上で入力してください";
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = "パスワード（確認）を入力してください";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "パスワードが一致しません";
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // TODO: 認証ロジックを実装
      console.log("登録処理を実行:", { email, password });
      alert("登録機能は現在準備中です");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: theme.palette.background.default,
        background: isDark
          ? `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.primary.dark, 0.1)} 100%)`
          : `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.primary.light, 0.08)} 100%)`,
      }}
    >
      {/* ヘッダー */}
      <Box
        component="header"
        sx={{
          py: 2,
          px: { xs: 2, sm: 3 },
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

            {/* 戻るリンク */}
            <Button
              component={NextLink}
              href="/"
              startIcon={<ArrowBackIcon />}
              sx={{ color: theme.palette.text.secondary }}
            >
              トップに戻る
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* メインコンテンツ */}
      <Container
        maxWidth="sm"
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: { xs: 4, md: 8 },
          px: { xs: 2, sm: 3 },
        }}
      >
        <Paper
          elevation={isDark ? 0 : 2}
          sx={{
            width: "100%",
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            bgcolor: isDark
              ? alpha(theme.palette.background.paper, 0.6)
              : theme.palette.background.paper,
            border: `1px solid ${alpha(theme.palette.divider, isDark ? 0.1 : 0.08)}`,
          }}
        >
          <Stack spacing={4}>
            {/* タイトル */}
            <Stack spacing={1} alignItems="center">
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  color: "#fff",
                  mb: 1,
                }}
              >
                <PersonAddIcon sx={{ fontSize: 28 }} />
              </Box>
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                  textAlign: "center",
                }}
              >
                新規登録
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  textAlign: "center",
                }}
              >
                無料でAIコードレビューを始めましょう
              </Typography>
            </Stack>

            {/* フォーム */}
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                {/* メールアドレス */}
                <TextField
                  fullWidth
                  label="メールアドレス"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                  autoComplete="email"
                  InputLabelProps={{
                    shrink: email ? true : undefined, // 入力時はラベルを上部に固定
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />

                {/* パスワード */}
                <TextField
                  fullWidth
                  label="パスワード"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!errors.password}
                  helperText={errors.password || "8文字以上で入力してください"}
                  autoComplete="new-password"
                  InputLabelProps={{
                    shrink: password ? true : undefined, // 入力時はラベルを上部に固定
                  }}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePassword}
                            edge="end"
                            size="small"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />

                {/* パスワード（確認） */}
                <TextField
                  fullWidth
                  label="パスワード（確認）"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  autoComplete="new-password"
                  InputLabelProps={{
                    shrink: confirmPassword ? true : undefined, // 入力時はラベルを上部に固定
                  }}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleToggleConfirmPassword}
                            edge="end"
                            size="small"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />

                {/* 登録ボタン */}
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    mt: 2,
                    py: 1.5,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                    "&:hover": {
                      background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                      boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
                    },
                  }}
                >
                  登録する
                </Button>
              </Stack>
            </Box>

            {/* ログインへのリンク */}
            <Stack direction="row" spacing={1} justifyContent="center">
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                すでにアカウントをお持ちですか？
              </Typography>
              <Typography
                component={NextLink}
                href="/login"
                variant="body2"
                sx={{
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                  fontWeight: 600,
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                ログイン
              </Typography>
            </Stack>
          </Stack>
        </Paper>
      </Container>

      {/* フッター */}
      <Box
        component="footer"
        sx={{
          py: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          © {new Date().getFullYear()} AIコードレビュー学習サービス
        </Typography>
      </Box>
    </Box>
  );
}

