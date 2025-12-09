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
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import {
  Code as CodeIcon,
  ArrowBack as ArrowBackIcon,
  Business as BusinessIcon,
} from "@mui/icons-material";
import { useColorMode } from "@/components/ThemeRegistry";
import NextLink from "next/link";

export default function LegalPage() {
  const theme = useTheme();
  const { mode } = useColorMode();
  const isDark = mode === "dark";

  const legalInfo = [
    { label: "事業者名", value: "AIコードレビュー学習サービス運営事務局" },
    { label: "運営責任者", value: "代表者名" },
    { label: "所在地", value: "〒000-0000 東京都○○区○○ 0-0-0" },
    { label: "電話番号", value: "お問い合わせページよりご連絡ください" },
    { label: "メールアドレス", value: "お問い合わせページよりご連絡ください" },
    { label: "サービスの対価", value: "各プランの料金ページをご確認ください" },
    { label: "対価以外の費用", value: "インターネット接続に必要な通信費等" },
    { label: "支払方法", value: "クレジットカード決済" },
    { label: "支払時期", value: "サービス利用開始時" },
    { label: "サービス提供時期", value: "決済完了後、即時" },
    { label: "返品・キャンセル", value: "デジタルコンテンツの性質上、原則として返品・返金はお受けしておりません" },
  ];

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
                <BusinessIcon sx={{ fontSize: 28 }} />
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
                特定商取引法に基づく表記
              </Typography>
            </Stack>

            {/* テーブル */}
            <Table>
              <TableBody>
                {legalInfo.map((item) => (
                  <TableRow key={item.label}>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        width: { xs: "35%", sm: "30%" },
                        borderColor: alpha(theme.palette.divider, 0.1),
                        py: 2,
                        px: { xs: 1, sm: 2 },
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                      }}
                    >
                      {item.label}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: theme.palette.text.secondary,
                        borderColor: alpha(theme.palette.divider, 0.1),
                        py: 2,
                        px: { xs: 1, sm: 2 },
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                      }}
                    >
                      {item.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* 補足 */}
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                textAlign: "center",
                mt: 2,
              }}
            >
              ※ 詳細についてはお問い合わせページよりお気軽にご連絡ください
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
