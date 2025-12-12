"use client";

import { useTheme } from "@/contexts/ThemeContext";

interface BlobConfig {
  id: string;
  d: string;
  size: number;
  x: string;
  y: string;
  gradientColors: string[];
  duration: number;
  delay: number;
  blur: number;
  opacity: number;
}

const blobPaths = [
  // 有機的なBlob形状のSVGパス
  "M45.5,-78.3C58.9,-71.1,69.8,-59.1,77.9,-45.1C86.1,-31.1,91.5,-15.5,91.6,0.1C91.7,15.7,86.5,31.4,78.1,45.2C69.7,59.1,58.1,71.2,44.2,79.3C30.2,87.5,13.9,91.7,-1.7,94.6C-17.4,97.6,-34.7,99.2,-49.3,92.4C-63.9,85.6,-75.7,70.3,-83.5,53.6C-91.3,36.9,-95.1,18.5,-93.5,0.9C-91.9,-16.7,-84.9,-33.3,-75.4,-48.1C-65.9,-62.8,-53.9,-75.6,-39.7,-82.2C-25.5,-88.8,-9.1,-89.1,3.5,-95.2C16.1,-101.3,32.1,-85.5,45.5,-78.3Z",
  "M39.5,-67.8C50.9,-61.3,59.8,-50.3,67.2,-38C74.6,-25.7,80.5,-12.9,81.3,0.5C82.1,13.8,77.8,27.7,70.3,39.7C62.8,51.7,52.1,61.9,39.6,69.5C27.1,77.1,12.8,82.1,-1.5,84.7C-15.8,87.3,-31.5,87.4,-44.8,81.3C-58.1,75.2,-69,62.9,-76.8,48.7C-84.6,34.5,-89.3,17.2,-89.2,0C-89.1,-17.1,-84.1,-34.3,-75.3,-48.3C-66.5,-62.3,-53.9,-73.2,-39.7,-78.2C-25.5,-83.2,-9.7,-82.3,2.4,-86.5C14.5,-90.7,28.1,-74.4,39.5,-67.8Z",
  "M44.7,-75.3C57.3,-68.5,66.7,-55.6,74,-41.6C81.3,-27.7,86.6,-12.8,86.5,0C86.4,12.8,81,25.5,73.3,37.1C65.5,48.7,55.5,59.1,43.3,67.3C31.1,75.5,16.6,81.5,0.8,80.1C-15,78.7,-30,69.9,-43.1,59.9C-56.2,49.9,-67.3,38.7,-74.9,25.1C-82.5,11.5,-86.6,-4.5,-84.7,-19.8C-82.8,-35.1,-74.9,-49.7,-63.4,-58.5C-51.9,-67.3,-36.9,-70.3,-23.2,-76.3C-9.5,-82.3,3,-91.3,16.2,-91.8C29.4,-92.3,32.1,-82.1,44.7,-75.3Z",
  "M47.9,-82.1C60.7,-73.8,69.2,-58.6,76.2,-43.1C83.2,-27.6,88.7,-11.8,87.9,0.5C87.1,12.8,80,25.5,71.2,36.5C62.4,47.5,51.9,56.8,39.8,64.3C27.7,71.8,14,77.5,-0.8,78.9C-15.6,80.3,-31.1,77.4,-44.3,70.5C-57.5,63.6,-68.3,52.7,-75.8,39.6C-83.3,26.5,-87.4,11.2,-86.5,-3.3C-85.6,-17.8,-79.7,-35.7,-69.9,-49.4C-60.1,-63.1,-46.4,-72.7,-32.4,-80.3C-18.4,-87.9,-4.2,-93.5,7.2,-105.8C18.6,-118.1,35.1,-90.4,47.9,-82.1Z",
];

const blobs: BlobConfig[] = [
  {
    id: "blob1",
    d: blobPaths[0],
    size: 400,
    x: "-5%",
    y: "10%",
    gradientColors: ["#10b981", "#14b8a6"],
    duration: 10,
    delay: 0,
    blur: 60,
    opacity: 0.4,
  },
  {
    id: "blob2",
    d: blobPaths[1],
    size: 350,
    x: "60%",
    y: "-10%",
    gradientColors: ["#14b8a6", "#06b6d4"],
    duration: 12,
    delay: 2,
    blur: 70,
    opacity: 0.35,
  },
  {
    id: "blob3",
    d: blobPaths[2],
    size: 300,
    x: "30%",
    y: "50%",
    gradientColors: ["#84cc16", "#eab308"],
    duration: 8,
    delay: 4,
    blur: 50,
    opacity: 0.3,
  },
  {
    id: "blob4",
    d: blobPaths[3],
    size: 250,
    x: "75%",
    y: "60%",
    gradientColors: ["#34d399", "#10b981"],
    duration: 11,
    delay: 1,
    blur: 55,
    opacity: 0.25,
  },
  {
    id: "blob5",
    d: blobPaths[0],
    size: 200,
    x: "15%",
    y: "70%",
    gradientColors: ["#06b6d4", "#14b8a6"],
    duration: 9,
    delay: 3,
    blur: 45,
    opacity: 0.3,
  },
];

export default function OrganicBlobs() {
  const { theme } = useTheme();

  return (
    <>
      {/* CSS Keyframes for each blob */}
      <style jsx global>{`
        @keyframes blob-float-1 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          25% {
            transform: translate(80px, -120px) rotate(15deg) scale(1.15);
          }
          50% {
            transform: translate(-60px, 80px) rotate(-15deg) scale(0.85);
          }
          75% {
            transform: translate(100px, 50px) rotate(10deg) scale(1.08);
          }
        }

        @keyframes blob-float-2 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          33% {
            transform: translate(-100px, 100px) rotate(-20deg) scale(1.2);
          }
          66% {
            transform: translate(80px, -80px) rotate(18deg) scale(0.8);
          }
        }

        @keyframes blob-float-3 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          20% {
            transform: translate(120px, 60px) rotate(25deg) scale(1.25);
          }
          40% {
            transform: translate(-80px, 120px) rotate(-15deg) scale(0.75);
          }
          60% {
            transform: translate(60px, -100px) rotate(20deg) scale(1.15);
          }
          80% {
            transform: translate(-100px, -60px) rotate(-10deg) scale(0.9);
          }
        }

        @keyframes blob-float-4 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          25% {
            transform: translate(-120px, -80px) rotate(-25deg) scale(0.75);
          }
          50% {
            transform: translate(100px, 100px) rotate(15deg) scale(1.25);
          }
          75% {
            transform: translate(-60px, 140px) rotate(-12deg) scale(1.05);
          }
        }

        @keyframes blob-float-5 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          33% {
            transform: translate(140px, -60px) rotate(30deg) scale(1.3);
          }
          66% {
            transform: translate(-100px, 80px) rotate(-20deg) scale(0.7);
          }
        }

        .organic-blob {
          position: absolute;
          pointer-events: none;
        }

        .organic-blob svg {
          width: 100%;
          height: 100%;
        }
      `}</style>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* SVG Gradients定義 */}
        <svg className="absolute w-0 h-0" aria-hidden="true">
          <defs>
            {blobs.map((blob) => (
              <linearGradient
                key={blob.id}
                id={`gradient-${blob.id}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor={blob.gradientColors[0]}
                  stopOpacity={theme === "dark" ? blob.opacity * 1.5 : blob.opacity}
                />
                <stop
                  offset="100%"
                  stopColor={blob.gradientColors[1]}
                  stopOpacity={theme === "dark" ? blob.opacity * 1.2 : blob.opacity * 0.8}
                />
              </linearGradient>
            ))}
          </defs>
        </svg>

        {/* Blob図形 */}
        {blobs.map((blob, index) => (
          <div
            key={blob.id}
            className="organic-blob"
            style={{
              width: blob.size,
              height: blob.size,
              left: blob.x,
              top: blob.y,
              filter: `blur(${blob.blur}px)`,
              animation: `blob-float-${index + 1} ${blob.duration}s ease-in-out infinite`,
              animationDelay: `${blob.delay}s`,
              opacity: theme === "dark" ? 1 : 0.8,
            }}
          >
            <svg viewBox="-100 -100 200 200" xmlns="http://www.w3.org/2000/svg">
              <path
                d={blob.d}
                fill={`url(#gradient-${blob.id})`}
                transform="scale(1)"
              />
            </svg>
          </div>
        ))}

        {/* ガラスモーフィズム風のオーバーレイ層 */}
        <div
          className={`absolute inset-0 ${
            theme === "dark"
              ? "bg-gradient-to-br from-transparent via-primary-green/5 to-transparent"
              : "bg-gradient-to-br from-transparent via-emerald-100/20 to-transparent"
          }`}
          style={{
            backdropFilter: "blur(1px)",
          }}
        />
      </div>
    </>
  );
}

