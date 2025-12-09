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
  Security as SecurityIcon,
} from "@mui/icons-material";
import { useColorMode } from "@/components/ThemeRegistry";
import NextLink from "next/link";

export default function PrivacyPage() {
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
                <SecurityIcon sx={{ fontSize: 28 }} />
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
                プライバシーポリシー
              </Typography>
            </Stack>

            {/* 本文 */}
            <Stack spacing={3} sx={{ color: theme.palette.text.secondary }}>
              <Typography variant="body2" sx={{ textAlign: "right" }}>
                最終更新日: {new Date().toLocaleDateString("ja-JP")}
              </Typography>

              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                AIコードレビュー学習サービス（以下「当社」）は、本サービスにおける
                ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシーを定めます。
              </Typography>

              <Box>
                <Typography variant="h6" sx={{ color: theme.palette.text.primary, mb: 1 }}>
                  第1条（個人情報）
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、
                  生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、
                  電話番号、連絡先その他の記述等により特定の個人を識別できる情報を指します。
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" sx={{ color: theme.palette.text.primary, mb: 1 }}>
                  第2条（個人情報の収集方法）
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  当社は、ユーザーが利用登録をする際に氏名、メールアドレスなどの個人情報をお尋ねすることがあります。
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" sx={{ color: theme.palette.text.primary, mb: 1 }}>
                  第3条（個人情報を収集・利用する目的）
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  当社が個人情報を収集・利用する目的は、以下のとおりです。
                </Typography>
                <Box component="ul" sx={{ mt: 1, pl: 2 }}>
                  <li>本サービスの提供・運営のため</li>
                  <li>ユーザーからのお問い合わせに回答するため</li>
                  <li>メンテナンス、重要なお知らせなど必要に応じたご連絡のため</li>
                  <li>利用規約に違反したユーザーの利用制限のため</li>
                  <li>上記の利用目的に付随する目的</li>
                </Box>
              </Box>

              <Box>
                <Typography variant="h6" sx={{ color: theme.palette.text.primary, mb: 1 }}>
                  第4条（個人情報の第三者提供）
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  当社は、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、
                  第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の
                  法令で認められる場合を除きます。
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" sx={{ color: theme.palette.text.primary, mb: 1 }}>
                  第5条（個人情報の開示）
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  当社は、本人から個人情報の開示を求められたときは、本人に対し、
                  遅滞なくこれを開示します。ただし、開示することにより次のいずれかに該当する場合は、
                  その全部または一部を開示しないこともあります。
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" sx={{ color: theme.palette.text.primary, mb: 1 }}>
                  第6条（プライバシーポリシーの変更）
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、
                  ユーザーに通知することなく、変更することができるものとします。
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" sx={{ color: theme.palette.text.primary, mb: 1 }}>
                  第7条（お問い合わせ窓口）
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  本ポリシーに関するお問い合わせは、お問い合わせページよりご連絡ください。
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
