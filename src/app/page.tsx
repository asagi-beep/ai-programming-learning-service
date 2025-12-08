"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  Link,
  Stack,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  Code as CodeIcon,
  AutoAwesome as AutoAwesomeIcon,
  Speed as SpeedIcon,
  Visibility as VisibilityIcon,
  WorkspacePremium as WorkspacePremiumIcon,
  ContentPaste as ContentPasteIcon,
  RateReview as RateReviewIcon,
  TrendingUp as TrendingUpIcon,
  ArrowForward as ArrowForwardIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from "@mui/icons-material";
import { useColorMode } from "@/components/ThemeRegistry";
import NextLink from "next/link";
import { useEffect, useRef } from "react";

// ========================================
// パーティクルコンポーネント（Canvas実装）
// ========================================
function ParticleCanvas({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth || window.innerWidth;
        canvas.height = parent.clientHeight || window.innerHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    window.addEventListener("resize", resizeCanvas);

    // テーマカラーを取得（より鮮やかに）
    const particleColor = isDark
      ? "rgba(110, 231, 183, 0.9)" // より明るく
      : "rgba(16, 185, 129, 0.7)"; // より鮮やかに
    const lineColor = isDark
      ? "rgba(110, 231, 183, 0.4)"
      : "rgba(16, 185, 129, 0.3)";

    const initParticles = () => {
      // パーティクル数を増やす
      const particleCount = window.innerWidth < 768 ? 30 : 60;
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 3 + 2, // より大きく
      }));
    };

    const animate = () => {
      if (canvas.width === 0 || canvas.height === 0) {
        resizeCanvas();
        initParticles();
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;

      // パーティクルを更新・描画
      particles.forEach((particle, i) => {
        // 位置更新
        particle.x += particle.vx;
        particle.y += particle.vy;

        // 境界処理
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // パーティクル描画
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        // 近くのパーティクルと線でつなぐ
        particles.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 180) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1.2;
            ctx.globalAlpha = (1 - distance / 180) * 0.8;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // 初期化を少し遅らせてDOMが確実にレンダリングされるのを待つ
    const initTimeout = setTimeout(() => {
      resizeCanvas();
      initParticles();
      animate();
    }, 50);

    return () => {
      clearTimeout(initTimeout);
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}


// ========================================
// ヒーローセクション
// ========================================
function HeroSection() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: { xs: "90vh", md: "85vh" },
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        // レイヤー1: グラデーション波（最背面）- より鮮やかに
        background: isDark
          ? `linear-gradient(135deg, 
              ${theme.palette.background.default} 0%, 
              ${alpha(theme.palette.primary.dark, 0.5)} 20%, 
              ${alpha(theme.palette.secondary.dark, 0.4)} 40%, 
              ${alpha(theme.palette.primary.main, 0.35)} 60%, 
              ${alpha(theme.palette.secondary.dark, 0.4)} 80%, 
              ${theme.palette.background.default} 100%)`
          : `linear-gradient(135deg, 
              ${theme.palette.background.default} 0%, 
              ${alpha(theme.palette.primary.light, 0.4)} 20%, 
              ${alpha(theme.palette.secondary.light, 0.35)} 40%, 
              ${alpha(theme.palette.primary.main, 0.25)} 60%, 
              ${alpha(theme.palette.secondary.light, 0.35)} 80%, 
              ${theme.palette.background.default} 100%)`,
        backgroundSize: "300% 300%",
        animation: "waveGradient 10s ease-in-out infinite",
        willChange: "background-position",
        "@keyframes waveGradient": {
          "0%": { backgroundPosition: "0% 50%" },
          "25%": { backgroundPosition: "50% 100%" },
          "50%": { backgroundPosition: "100% 50%" },
          "75%": { backgroundPosition: "50% 0%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      }}
    >
      {/* 光の輝きエフェクト */}
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: { xs: "300px", md: "500px" },
          height: { xs: "300px", md: "500px" },
          borderRadius: "50%",
          background: isDark
            ? `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.3)} 0%, transparent 70%)`
            : `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.4)} 0%, transparent 70%)`,
          filter: "blur(60px)",
          animation: "glowPulse 6s ease-in-out infinite",
          zIndex: 1,
          pointerEvents: "none",
          "@keyframes glowPulse": {
            "0%, 100%": { opacity: 0.6, transform: "scale(1)" },
            "50%": { opacity: 1, transform: "scale(1.1)" },
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: { xs: "250px", md: "400px" },
          height: { xs: "250px", md: "400px" },
          borderRadius: "50%",
          background: isDark
            ? `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.25)} 0%, transparent 70%)`
            : `radial-gradient(circle, ${alpha(theme.palette.secondary.light, 0.35)} 0%, transparent 70%)`,
          filter: "blur(50px)",
          animation: "glowPulse2 8s ease-in-out infinite",
          zIndex: 1,
          pointerEvents: "none",
          "@keyframes glowPulse2": {
            "0%, 100%": { opacity: 0.5, transform: "scale(1)" },
            "50%": { opacity: 0.9, transform: "scale(1.15)" },
          },
        }}
      />

      {/* レイヤー2: パーティクル（前面） */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2,
        }}
      >
        <ParticleCanvas isDark={isDark} />
      </Box>

      {/* テキスト視認性のためのオーバーレイ - より透明に調整 */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDark
            ? `linear-gradient(135deg, 
                ${alpha(theme.palette.background.default, 0.75)} 0%, 
                ${alpha(theme.palette.background.default, 0.6)} 50%, 
                ${alpha(theme.palette.background.default, 0.75)} 100%)`
            : `linear-gradient(135deg, 
                ${alpha(theme.palette.background.default, 0.55)} 0%, 
                ${alpha(theme.palette.background.default, 0.45)} 50%, 
                ${alpha(theme.palette.background.default, 0.55)} 100%)`,
          zIndex: 3,
          pointerEvents: "none",
        }}
      />

      {/* コンテンツコンテナ - zIndexを上げてテキストを前面に */}
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 4, px: { xs: 2, sm: 3 } }}>
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 8 }}>
            <Stack spacing={3}>
              {/* バッジ - スマホ対応：テキストが見切れないように調整 */}
              <Box>
                <Box
                  component="span"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: { xs: 0.5, sm: 1 },
                    px: { xs: 1.25, sm: 2 },
                    py: { xs: 0.625, sm: 0.75 },
                    borderRadius: 3,
                    bgcolor: isDark
                      ? alpha(theme.palette.primary.main, 0.15)
                      : alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                    fontWeight: 500,
                    whiteSpace: "normal",
                    maxWidth: "100%",
                    wordBreak: "keep-all",
                  }}
                >
                  <AutoAwesomeIcon sx={{ fontSize: { xs: "0.875rem", sm: "1rem" }, flexShrink: 0 }} />
                  <Box component="span" sx={{ lineHeight: 1.4 }}>
                    AIがあなたのコードをレビュー
                  </Box>
                </Box>
              </Box>

              {/* メインキャッチコピー */}
              <Typography
                variant="h1"
                sx={{
                  color: theme.palette.text.primary,
                  fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.5rem", lg: "3.5rem" },
                  lineHeight: { xs: 1.3, md: 1.2 },
                  "& .highlight": {
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  },
                }}
              >
                書けた。
                <br />
                <span className="highlight">でも、これでいいの？</span>
              </Typography>

              {/* サブコピー */}
              <Typography
                variant="h3"
                component="p"
                sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: 400,
                  maxWidth: { xs: "100%", md: 600 },
                  fontSize: { xs: "1.125rem", sm: "1.25rem", md: "1.5rem" },
                  lineHeight: { xs: 1.6, md: 1.4 },
                }}
              >
                業務自動化を目指す人のための
                <br />
                <Box
                  component="span"
                  sx={{ color: theme.palette.primary.main, fontWeight: 600 }}
                >
                  AIコードレビュー
                </Box>
              </Typography>

              {/* 説明文 */}
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                  maxWidth: { xs: "100%", md: 500 },
                  lineHeight: { xs: 1.7, md: 1.8 },
                  fontSize: { xs: "0.875rem", md: "1rem" },
                }}
              >
                動くコードから、読みやすく安全なコードへ。
                <br />
                コードを貼るだけで、AIが即座にフィードバック。
                <br />
                仕事がもっと楽になる、そんなコードを目指しましょう。
              </Typography>

              {/* CTAボタン - スマホ対応：ボタン幅を調整 */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
              >
                <Button
                  component={NextLink}
                  href="/signup"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.4)}`,
                    "&:hover": {
                      background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                      boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.5)}`,
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  無料で始める
                </Button>
                <Button
                  component={NextLink}
                  href="/demo"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: alpha(theme.palette.text.primary, 0.2),
                    color: theme.palette.text.primary,
                    "&:hover": {
                      borderColor: theme.palette.primary.main,
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                    },
                  }}
                >
                  デモを見る
                </Button>
              </Stack>

              {/* 信頼性バッジ - スマホ対応：横並び（Flexbox wrap）で整列 */}
              <Box
                sx={{
                  pt: 3,
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: { xs: 1, sm: 2, md: 3 },
                  alignItems: "center",
                  justifyContent: { xs: "flex-start", sm: "flex-start" },
                }}
              >
                {[
                  { icon: <SpeedIcon />, text: "3秒で結果表示" },
                  { icon: <CodeIcon />, text: "Python / JS 対応" },
                  { icon: <WorkspacePremiumIcon />, text: "無料プランあり" },
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 0.75,
                      color: theme.palette.text.secondary,
                      bgcolor: { xs: alpha(theme.palette.primary.main, 0.05), sm: "transparent" },
                      px: { xs: 1.25, sm: 0 },
                      py: { xs: 0.625, sm: 0 },
                      borderRadius: { xs: 2, sm: 0 },
                      flexShrink: 0,
                    }}
                  >
                    <Box sx={{ color: theme.palette.primary.main, display: "flex", flexShrink: 0 }}>
                      {item.icon}
                    </Box>
                    <Typography 
                      variant="body2"
                      sx={{ 
                        fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                        whiteSpace: "nowrap",
                        lineHeight: 1.4,
                      }}
                    >
                      {item.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ========================================
// 特徴セクション
// ========================================
function FeaturesSection() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const features = [
    {
      icon: <ContentPasteIcon sx={{ fontSize: 40 }} />,
      title: "コードを貼るだけでAIが即レビュー",
      description:
        "難しい設定は不要。コードをコピー&ペーストするだけで、AIが自動的にコードを分析。3秒で改善点がわかります。",
      color: theme.palette.primary.main,
    },
    {
      icon: <VisibilityIcon sx={{ fontSize: 40 }} />,
      title: "「動く」だけでなく「読みやすさ」も指摘",
      description:
        "動けばOK、ではありません。変数名の付け方、コードの構造、コメントの書き方まで、プロの視点でアドバイス。",
      color: theme.palette.secondary.main,
    },
    {
      icon: <WorkspacePremiumIcon sx={{ fontSize: 40 }} />,
      title: "実務で使えるレベルかフィードバック",
      description:
        "セキュリティリスク、パフォーマンスの問題点も指摘。業務で安心して使えるコードかどうかが一目でわかります。",
      color: theme.palette.success.main,
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: isDark
          ? alpha(theme.palette.primary.main, 0.02)
          : theme.palette.background.paper,
      }}
    >
      <Container maxWidth="lg">
        {/* セクションヘッダー */}
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 8 } }}>
          <Typography
            variant="h2"
            textAlign="center"
            sx={{ color: theme.palette.text.primary }}
          >
            コードの
            <Box
              component="span"
              sx={{ color: theme.palette.primary.main }}
            >
              『正解』
            </Box>
            を、AIが教えます
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: 600,
            }}
          >
            レビューしてくれる人がいなくても大丈夫。
            AIがあなた専属のメンターになります。
          </Typography>
        </Stack>

        {/* 特徴カード */}
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid key={index} size={{ xs: 12, md: 4 }} sx={{ display: "flex" }}>
              <Card
                sx={{
                  height: "100%",
                  bgcolor: isDark
                    ? alpha(theme.palette.background.paper, 0.6)
                    : theme.palette.background.paper,
                  border: `1px solid ${alpha(theme.palette.divider, isDark ? 0.1 : 0.08)}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: `0 20px 40px ${alpha(feature.color, 0.15)}`,
                    borderColor: alpha(feature.color, 0.3),
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Stack spacing={3}>
                    {/* アイコン */}
                    <Box
                      sx={{
                        width: 72,
                        height: 72,
                        borderRadius: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: alpha(feature.color, 0.1),
                        color: feature.color,
                      }}
                    >
                      {feature.icon}
                    </Box>

                    {/* タイトル - スマホ対応：適切なフォントサイズと改行 */}
                    <Typography
                      variant="h3"
                      sx={{ 
                        color: theme.palette.text.primary,
                        fontSize: { xs: "1.125rem", sm: "1.25rem", md: "1.5rem" },
                        lineHeight: { xs: 1.5, md: 1.4 },
                        wordBreak: "keep-all",
                        overflowWrap: "break-word",
                      }}
                    >
                      {feature.title}
                    </Typography>

                    {/* 説明 */}
                    <Typography
                      variant="body1"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      {feature.description}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ========================================
// ステップセクション
// ========================================
function StepsSection() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const steps = [
    {
      number: "01",
      icon: <ContentPasteIcon sx={{ fontSize: 32 }} />,
      title: "コードを貼り付け",
      description: "レビューしたいコードをエディタにペースト。Python、JavaScript、TypeScriptに対応。",
    },
    {
      number: "02",
      icon: <RateReviewIcon sx={{ fontSize: 32 }} />,
      title: "AIがレビュー",
      description: "AIが自動的にコードを分析。セキュリティ、可読性、パフォーマンスの観点でチェック。",
    },
    {
      number: "03",
      icon: <TrendingUpIcon sx={{ fontSize: 32 }} />,
      title: "改善して上達",
      description: "具体的な改善点と修正例を確認。繰り返すことで、自然と良いコードが書けるように。",
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: theme.palette.background.default,
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        {/* セクションヘッダー */}
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 8 } }}>
          <Typography
            variant="h2"
            textAlign="center"
            sx={{ color: theme.palette.text.primary }}
          >
            たった
            <Box component="span" sx={{ color: theme.palette.primary.main }}>
              3ステップ
            </Box>
            で完了
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: 500,
            }}
          >
            面倒な設定は一切なし。今すぐ始められます。
          </Typography>
        </Stack>

        {/* ステップカード */}
        <Grid container spacing={4} alignItems="stretch">
          {steps.map((step, index) => (
            <Grid key={index} size={{ xs: 12, md: 4 }} sx={{ display: "flex" }}>
              <Box
                sx={{
                  height: "100%",
                  position: "relative",
                  p: 4,
                  borderRadius: 4,
                  bgcolor: isDark
                    ? alpha(theme.palette.background.paper, 0.4)
                    : theme.palette.background.paper,
                  border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: isDark
                      ? alpha(theme.palette.background.paper, 0.6)
                      : theme.palette.background.paper,
                    boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.1)}`,
                  },
                }}
              >
                {/* ステップ番号 */}
                <Typography
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 20,
                    fontSize: "3rem",
                    fontWeight: 800,
                    color: alpha(theme.palette.primary.main, isDark ? 0.15 : 0.1),
                    lineHeight: 1,
                  }}
                >
                  {step.number}
                </Typography>

                <Stack spacing={2}>
                  {/* アイコン */}
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      color: "#fff",
                    }}
                  >
                    {step.icon}
                  </Box>

                  {/* タイトル */}
                  <Typography
                    variant="h3"
                    sx={{ color: theme.palette.text.primary }}
                  >
                    {step.title}
                  </Typography>

                  {/* 説明 */}
                  <Typography
                    variant="body1"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    {step.description}
                  </Typography>
                </Stack>
              </Box>

              {/* 矢印（最後以外） */}
              {index < steps.length - 1 && (
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    position: "absolute",
                    right: -28,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: alpha(theme.palette.primary.main, 0.3),
                  }}
                >
                  <ArrowForwardIcon sx={{ fontSize: 32 }} />
                </Box>
              )}
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ========================================
// CTAセクション
// ========================================
function CTASection() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        background: isDark
          ? `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.3)} 0%, ${alpha(theme.palette.secondary.dark, 0.2)} 100%)`
          : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle at 30% 70%, ${alpha("#fff", 0.1)} 0%, transparent 50%)`,
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <Stack spacing={4} alignItems="center" textAlign="center">
          <Typography
            variant="h2"
            sx={{
              color: isDark ? theme.palette.text.primary : "#fff",
            }}
          >
            今日から、良いコードを書こう
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: isDark
                ? theme.palette.text.secondary
                : alpha("#fff", 0.9),
              maxWidth: 500,
              fontSize: "1.1rem",
            }}
          >
            無料プランで今すぐ始められます。
            <br />
            クレジットカードの登録は不要です。
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ pt: 2 }}
          >
            <Button
              component={NextLink}
              href="/signup"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: isDark ? theme.palette.primary.main : "#fff",
                color: isDark ? "#fff" : theme.palette.primary.main,
                px: 5,
                py: 2,
                fontSize: "1.1rem",
                boxShadow: `0 8px 24px ${alpha("#000", 0.2)}`,
                "&:hover": {
                  bgcolor: isDark
                    ? theme.palette.primary.dark
                    : alpha("#fff", 0.9),
                  transform: "translateY(-2px)",
                  boxShadow: `0 12px 32px ${alpha("#000", 0.3)}`,
                },
                transition: "all 0.3s ease",
              }}
            >
              無料で始める
            </Button>
          </Stack>

          <Typography
            variant="body2"
            sx={{
              color: isDark
                ? alpha(theme.palette.text.secondary, 0.7)
                : alpha("#fff", 0.7),
            }}
          >
            ※ 1日5回まで無料でレビュー可能
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

// ========================================
// フッター
// ========================================
function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const footerLinks = [
    { label: "利用規約", href: "/terms" },
    { label: "プライバシーポリシー", href: "/privacy" },
    { label: "特定商取引法に基づく表記", href: "/legal" },
    { label: "お問い合わせ", href: "/contact" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        bgcolor: isDark
          ? theme.palette.background.paper
          : alpha(theme.palette.text.primary, 0.02),
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4}>
          {/* ロゴとリンク */}
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 4 }}>
              <Stack spacing={1}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <CodeIcon sx={{ color: theme.palette.primary.main }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.text.primary,
                    }}
                  >
                    AIコードレビュー
                  </Typography>
                </Stack>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  コードの『正解』を、AIが教えます
                </Typography>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 8 }} sx={{ display: "flex", justifyContent: { sm: "flex-end" } }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 2, sm: 4 }}
                justifyContent={{ sm: "flex-end" }}
                flexWrap="wrap"
              >
                {footerLinks.map((link) => (
                  <Link
                    key={link.label}
                    component={NextLink}
                    href={link.href}
                    underline="hover"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontSize: "0.875rem",
                      "&:hover": {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </Grid>
          </Grid>

          {/* コピーライト */}
          <Box
            sx={{
              pt: 3,
              borderTop: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
              textAlign: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              © {new Date().getFullYear()} AIコードレビュー学習サービス. All
              rights reserved.
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

// ========================================
// ヘッダー（テーマ切り替え付き）
// ========================================
function Header() {
  const theme = useTheme();
  const { mode, toggleColorMode } = useColorMode();
  const isDark = mode === "dark";

  return (
    <Box
      component="header"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        bgcolor: alpha(theme.palette.background.default, 0.8),
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ py: 1.5 }}
        >
          {/* ロゴ - スマホ対応：タイトルを表示 */}
          <Stack direction="row" spacing={1} alignItems="center">
            <CodeIcon sx={{ color: theme.palette.primary.main }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                fontSize: { xs: "0.875rem", sm: "1.25rem" },
                whiteSpace: "nowrap",
              }}
            >
              AIコードレビュー
            </Typography>
          </Stack>

          {/* 右側 */}
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
              href="/login"
              variant="contained"
              size="small"
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              }}
            >
              ログイン
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

// ========================================
// メインページ
// ========================================
export default function LandingPage() {
  return (
    <Box sx={{ pt: 8 }}>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <StepsSection />
        <CTASection />
      </main>
      <Footer />
    </Box>
  );
}


