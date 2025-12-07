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
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Code as CodeIcon,
  ArrowBack as ArrowBackIcon,
  Email as EmailIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { useColorMode } from "@/components/ThemeRegistry";
import NextLink from "next/link";
import { useState } from "react";

/**
 * バリデーションエラーの型
 */
interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

/**
 * フォームデータの型
 */
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * クライアントサイドバリデーション
 */
function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};

  // お名前
  if (!data.name.trim()) {
    errors.name = "お名前を入力してください";
  } else if (data.name.length > 100) {
    errors.name = "お名前は100文字以内で入力してください";
  }

  // メールアドレス
  if (!data.email.trim()) {
    errors.email = "メールアドレスを入力してください";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "有効なメールアドレスを入力してください";
  }

  // 件名
  if (!data.subject.trim()) {
    errors.subject = "件名を入力してください";
  } else if (data.subject.length > 200) {
    errors.subject = "件名は200文字以内で入力してください";
  }

  // お問い合わせ内容
  if (!data.message.trim()) {
    errors.message = "お問い合わせ内容を入力してください";
  } else if (data.message.length < 10) {
    errors.message = "お問い合わせ内容は10文字以上で入力してください";
  } else if (data.message.length > 5000) {
    errors.message = "お問い合わせ内容は5000文字以内で入力してください";
  }

  return errors;
}

export default function ContactPage() {
  const theme = useTheme();
  const { mode } = useColorMode();
  const isDark = mode === "dark";

  // フォーム状態管理
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // エラー状態
  const [errors, setErrors] = useState<FormErrors>({});

  // 送信状態
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  // 入力値変更ハンドラ
  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));

    // リアルタイムバリデーション（入力中のフィールドのみ）
    if (errors[field]) {
      const newErrors = validateForm({ ...formData, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
    }
  };

  // フォーカスアウト時のバリデーション
  const handleBlur = (field: keyof FormData) => () => {
    const newErrors = validateForm(formData);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
  };

  // フォーム送信ハンドラ
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 送信前バリデーション
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus("success");
        setSubmitMessage(result.message);
        // フォームをクリア
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setErrors({});
      } else {
        setSubmitStatus("error");
        setSubmitMessage(result.error || "送信に失敗しました。");
        // サーバーからのバリデーションエラーを設定
        if (result.errors) {
          setErrors(result.errors);
        }
      }
    } catch {
      setSubmitStatus("error");
      setSubmitMessage("送信に失敗しました。時間をおいて再度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 送信完了画面
  if (submitStatus === "success") {
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
        <Box component="header" sx={{ py: 2, px: { xs: 2, sm: 3 } }}>
          <Container maxWidth="lg">
            <Stack direction="row" justifyContent="space-between" alignItems="center">
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

        {/* 完了メッセージ */}
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
              p: { xs: 4, sm: 6 },
              borderRadius: 4,
              bgcolor: isDark
                ? alpha(theme.palette.background.paper, 0.6)
                : theme.palette.background.paper,
              border: `1px solid ${alpha(theme.palette.divider, isDark ? 0.1 : 0.08)}`,
              textAlign: "center",
            }}
          >
            <Stack spacing={3} alignItems="center">
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: alpha(theme.palette.success.main, 0.1),
                  color: theme.palette.success.main,
                }}
              >
                <CheckCircleIcon sx={{ fontSize: 48 }} />
              </Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                }}
              >
                送信完了
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                  lineHeight: 1.8,
                }}
              >
                {submitMessage}
                <br />
                内容を確認の上、担当者よりご連絡いたします。
              </Typography>
              <Button
                component={NextLink}
                href="/"
                variant="contained"
                size="large"
                sx={{
                  mt: 2,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                  "&:hover": {
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                    boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
                  },
                }}
              >
                トップページへ
              </Button>
            </Stack>
          </Paper>
        </Container>

        {/* フッター */}
        <Box component="footer" sx={{ py: 3, textAlign: "center" }}>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            © {new Date().getFullYear()} AIコードレビュー学習サービス
          </Typography>
        </Box>
      </Box>
    );
  }

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
      <Box component="header" sx={{ py: 2, px: { xs: 2, sm: 3 } }}>
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
                <EmailIcon sx={{ fontSize: 28 }} />
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
                お問い合わせ
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  textAlign: "center",
                }}
              >
                ご質問・ご要望などお気軽にお問い合わせください
              </Typography>
            </Stack>

            {/* エラーアラート */}
            {submitStatus === "error" && (
              <Alert severity="error" sx={{ borderRadius: 2 }}>
                {submitMessage}
              </Alert>
            )}

            {/* フォーム */}
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                {/* お名前 */}
                <TextField
                  fullWidth
                  label="お名前"
                  value={formData.name}
                  onChange={handleChange("name")}
                  onBlur={handleBlur("name")}
                  error={!!errors.name}
                  helperText={errors.name}
                  disabled={isSubmitting}
                  InputLabelProps={{
                    shrink: formData.name ? true : undefined,
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />

                {/* メールアドレス */}
                <TextField
                  fullWidth
                  label="メールアドレス"
                  type="email"
                  value={formData.email}
                  onChange={handleChange("email")}
                  onBlur={handleBlur("email")}
                  error={!!errors.email}
                  helperText={errors.email}
                  disabled={isSubmitting}
                  autoComplete="email"
                  InputLabelProps={{
                    shrink: formData.email ? true : undefined,
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />

                {/* 件名 */}
                <TextField
                  fullWidth
                  label="件名"
                  value={formData.subject}
                  onChange={handleChange("subject")}
                  onBlur={handleBlur("subject")}
                  error={!!errors.subject}
                  helperText={errors.subject}
                  disabled={isSubmitting}
                  InputLabelProps={{
                    shrink: formData.subject ? true : undefined,
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />

                {/* お問い合わせ内容 */}
                <TextField
                  fullWidth
                  label="お問い合わせ内容"
                  multiline
                  rows={6}
                  value={formData.message}
                  onChange={handleChange("message")}
                  onBlur={handleBlur("message")}
                  error={!!errors.message}
                  helperText={
                    errors.message ||
                    `${formData.message.length}/5000文字`
                  }
                  disabled={isSubmitting}
                  InputLabelProps={{
                    shrink: formData.message ? true : undefined,
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />

                {/* 送信ボタン */}
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{
                    mt: 1,
                    py: 1.5,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                    "&:hover": {
                      background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                      boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
                    },
                    "&:disabled": {
                      background: theme.palette.action.disabledBackground,
                    },
                  }}
                >
                  {isSubmitting ? (
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CircularProgress size={20} color="inherit" />
                      <span>送信中...</span>
                    </Stack>
                  ) : (
                    "送信する"
                  )}
                </Button>
              </Stack>
            </Box>

            {/* 補足テキスト */}
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                textAlign: "center",
                fontSize: "0.8125rem",
              }}
            >
              ※ 通常2〜3営業日以内にご返信いたします
            </Typography>
          </Stack>
        </Paper>
      </Container>

      {/* フッター */}
      <Box component="footer" sx={{ py: 3, textAlign: "center" }}>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          © {new Date().getFullYear()} AIコードレビュー学習サービス
        </Typography>
      </Box>
    </Box>
  );
}
