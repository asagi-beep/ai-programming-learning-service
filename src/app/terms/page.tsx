"use client";

import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useTheme,
  alpha,
  Paper,
} from "@mui/material";
import {
  Code as CodeIcon,
  ArrowBack as ArrowBackIcon,
  Gavel as GavelIcon,
} from "@mui/icons-material";
import { useColorMode } from "@/components/ThemeRegistry";
import NextLink from "next/link";

export default function TermsPage() {
  const theme = useTheme();
  const { mode } = useColorMode();
  const isDark = mode === "dark";

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

      {/* メインコンテンツ */}
      <Container
        maxWidth="md"
        sx={{
          flex: 1,
          py: { xs: 4, md: 6 },
          px: { xs: 2, sm: 3 },
        }}
      >
        <Paper
          elevation={isDark ? 0 : 2}
          sx={{
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
                <GavelIcon sx={{ fontSize: 28 }} />
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
                利用規約
              </Typography>
            </Stack>

            {/* 本文 */}
            <Stack spacing={3} sx={{ color: theme.palette.text.secondary }}>
              <Typography variant="body2" sx={{ textAlign: "right" }}>
                最終更新日: {new Date().toLocaleDateString("ja-JP")}
              </Typography>

              <Box>
                <Typography variant="h6" sx={{ color: theme.palette.text.primary, mb: 1 }}>
                  第1条（適用）
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  本規約は、AIコードレビュー学習サービス（以下「本サービス」）の利用条件を定めるものです。
                  登録ユーザーの皆さま（以下「ユーザー」）には、本規約に従って本サービスをご利用いただきます。
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" sx={{ color: theme.palette.text.primary, mb: 1 }}>
                  第2条（利用登録）
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  登録希望者が本規約に同意の上、当社の定める方法によって利用登録を申請し、
                  当社がこれを承認することによって、利用登録が完了するものとします。
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" sx={{ color: theme.palette.text.primary, mb: 1 }}>
                  第3条（禁止事項）
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
                </Typography>
                <Box component="ul" sx={{ mt: 1, pl: 2 }}>
                  <li>法令または公序良俗に違反する行為</li>
                  <li>犯罪行為に関連する行為</li>
                  <li>本サービスの運営を妨害する行為</li>
                  <li>他のユーザーに迷惑をかける行為</li>
                  <li>不正アクセスをし、またはこれを試みる行為</li>
                </Box>
              </Box>

              <Box>
                <Typography variant="h6" sx={{ color: theme.palette.text.primary, mb: 1 }}>
                  第4条（本サービスの提供の停止等）
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  当社は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく
                  本サービスの全部または一部の提供を停止または中断することができるものとします。
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" sx={{ color: theme.palette.text.primary, mb: 1 }}>
                  第5条（免責事項）
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  当社は、本サービスに事実上または法律上の瑕疵がないことを明示的にも黙示的にも保証しておりません。
                  当社は、本サービスに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" sx={{ color: theme.palette.text.primary, mb: 1 }}>
                  第6条（規約の変更）
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  当社は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。
                </Typography>
              </Box>
            </Stack>
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

