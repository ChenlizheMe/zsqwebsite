import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * 多层背景动效 — 偏 NASA Punk / Starfield 工程图：
 *   layer A: 漂移的 nebula 光斑（CSS）
 *   layer B: 视差星场（SVG，三层不同速度 + 鼠标 / 滚动视差）
 *   layer C: 蓝图栅格 + 标尺铭牌（SVG，静态 + 缓慢呼吸）
 *   layer D: 双层旋转仪表弧（SVG）
 *   layer E: 雷达扫描扇形（SVG，每 ~32s 扫一圈）
 *   layer F: 星座连线（SVG，缓慢描线 + 淡出）
 *   layer G: 远端航线（SVG，pathLength 动画 + 周期重启）
 */

const ease = [0.22, 1, 0.36, 1] as const;

/** 简单 PRNG，保证服务端 / 客户端布局一致 */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

function makeStars(count: number, seed: number, radiusMin = 0.6, radiusMax = 1.8) {
  const r = rng(seed);
  return Array.from({ length: count }, () => ({
    x: r() * 1600,
    y: r() * 1000,
    rad: radiusMin + r() * (radiusMax - radiusMin),
    twinkle: 5 + r() * 9,
    twinkleDelay: r() * 5,
    opacity: 0.35 + r() * 0.55,
  }));
}

const STAR_LAYER_FAR = makeStars(70, 11, 0.4, 1.0);
const STAR_LAYER_MID = makeStars(40, 22, 0.8, 1.6);
const STAR_LAYER_NEAR = makeStars(18, 33, 1.4, 2.4);

/** 星座 — 几条通过预设点位的折线，用来做"航迹被画出"的描线动画 */
const CONSTELLATIONS = [
  { d: "M 220 180 L 320 240 L 400 220 L 460 300 L 540 280", duration: 5.5, delay: 0.2 },
  { d: "M 1140 140 L 1080 220 L 1180 300 L 1240 260 L 1340 320", duration: 6.5, delay: 1.0 },
  { d: "M 200 720 L 300 700 L 360 800 L 460 770", duration: 5.0, delay: 2.0 },
  { d: "M 1080 720 L 1180 760 L 1260 700 L 1380 740", duration: 4.5, delay: 3.0 },
];

export function VectorField() {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement | null>(null);

  // 鼠标 + 滚动视差（克制：最大约 ±10px）
  useEffect(() => {
    let frame = 0;
    let target = { x: 0, y: 0 };
    let current = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      target = {
        x: (e.clientX / w - 0.5) * 18,
        y: (e.clientY / h - 0.5) * 18,
      };
    };
    const onScroll = () => {
      target.y = (window.scrollY * 0.04) % 30 - 15;
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.06;
      current.y += (target.y - current.y) * 0.06;
      setParallax({ x: current.x, y: current.y });
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="vector-field" aria-hidden ref={ref}>
      {/* A · drifting nebula glows (pure CSS) */}
      <div className="vf-nebula vf-nebula--a" />
      <div className="vf-nebula vf-nebula--b" />
      <div className="vf-nebula vf-nebula--c" />

      <svg className="vector-field__svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="grid-fine" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.25" opacity="0.35" />
          </pattern>
          <pattern id="grid-coarse" width="160" height="160" patternUnits="userSpaceOnUse">
            <path d="M 160 0 L 0 0 0 160" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.55" />
          </pattern>
          <radialGradient id="vf-glow" cx="50%" cy="20%" r="70%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.16" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="radar" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.32" />
            <stop offset="40%" stopColor="currentColor" stopOpacity="0.12" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sweep" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.6" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
          <mask id="radar-mask">
            <rect width="100%" height="100%" fill="black" />
            <g style={{ transformOrigin: "800px 500px" }}>
              <motion.path
                d="M 800 500 L 800 100 A 400 400 0 0 1 1200 500 Z"
                fill="white"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
              />
            </g>
          </mask>
        </defs>

        {/* B · 视差星场（三层） */}
        <g
          style={{
            transform: `translate3d(${parallax.x * 0.4}px, ${parallax.y * 0.4}px, 0)`,
            transition: "transform 0.4s cubic-bezier(.22,1,.36,1)",
          }}
          opacity="0.7"
        >
          {STAR_LAYER_FAR.map((s, i) => (
            <motion.circle
              key={`far-${i}`}
              cx={s.x}
              cy={s.y}
              r={s.rad}
              fill="currentColor"
              animate={{ opacity: [s.opacity * 0.5, s.opacity, s.opacity * 0.5] }}
              transition={{ duration: s.twinkle, repeat: Infinity, ease: "easeInOut", delay: s.twinkleDelay }}
            />
          ))}
        </g>
        <g
          style={{
            transform: `translate3d(${parallax.x * 1.0}px, ${parallax.y * 1.0}px, 0)`,
            transition: "transform 0.35s cubic-bezier(.22,1,.36,1)",
          }}
          opacity="0.85"
        >
          {STAR_LAYER_MID.map((s, i) => (
            <motion.circle
              key={`mid-${i}`}
              cx={s.x}
              cy={s.y}
              r={s.rad}
              fill="currentColor"
              animate={{ opacity: [s.opacity * 0.4, s.opacity, s.opacity * 0.4] }}
              transition={{ duration: s.twinkle, repeat: Infinity, ease: "easeInOut", delay: s.twinkleDelay }}
            />
          ))}
        </g>
        <g
          style={{
            transform: `translate3d(${parallax.x * 2.0}px, ${parallax.y * 2.0}px, 0)`,
            transition: "transform 0.3s cubic-bezier(.22,1,.36,1)",
          }}
          opacity="1"
        >
          {STAR_LAYER_NEAR.map((s, i) => (
            <motion.circle
              key={`near-${i}`}
              cx={s.x}
              cy={s.y}
              r={s.rad}
              fill="currentColor"
              animate={{ opacity: [s.opacity * 0.5, 1, s.opacity * 0.5] }}
              transition={{ duration: s.twinkle, repeat: Infinity, ease: "easeInOut", delay: s.twinkleDelay }}
            />
          ))}
        </g>

        {/* C · 蓝图栅格 */}
        <rect width="100%" height="100%" fill="url(#grid-fine)" opacity="0.4" />
        <rect width="100%" height="100%" fill="url(#grid-coarse)" opacity="0.5" />
        <rect width="100%" height="100%" fill="url(#vf-glow)" />

        {/* 标尺铭牌 */}
        <g opacity="0.55">
          <path d="M 40 60 L 220 60" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <path d="M 40 60 L 40 75" stroke="currentColor" strokeWidth="0.7" />
          <path d="M 220 60 L 220 75" stroke="currentColor" strokeWidth="0.7" />
          {Array.from({ length: 18 }).map((_, i) => (
            <path key={i} d={`M ${40 + i * 10} 60 L ${40 + i * 10} ${i % 2 === 0 ? 67 : 64}`} stroke="currentColor" strokeWidth="0.4" />
          ))}
          <text x="40" y="50" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="9" fill="currentColor" letterSpacing="0.2em">
            SCALE / 200
          </text>
        </g>
        <g opacity="0.5">
          <path d="M 1380 60 L 1560 60" fill="none" stroke="currentColor" strokeWidth="0.7" />
          {Array.from({ length: 9 }).map((_, i) => (
            <path key={i} d={`M ${1380 + i * 22.5} 60 L ${1380 + i * 22.5} ${i === 4 ? 75 : 66}`} stroke="currentColor" strokeWidth="0.4" />
          ))}
          <text x="1380" y="50" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="9" fill="currentColor" letterSpacing="0.2em">
            HDG · 088°
          </text>
        </g>

        {/* D · 旋转仪表弧 */}
        <motion.g
          style={{ transformOrigin: "800px 500px" }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 220, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="800" cy="500" r="280" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
          <circle cx="800" cy="500" r="280" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 18" opacity="0.5" />
          <path d="M 800 220 L 800 200" stroke="currentColor" strokeWidth="0.8" />
          <path d="M 800 800 L 800 780" stroke="currentColor" strokeWidth="0.8" />
          <path d="M 520 500 L 540 500" stroke="currentColor" strokeWidth="0.8" />
          <path d="M 1080 500 L 1060 500" stroke="currentColor" strokeWidth="0.8" />
        </motion.g>
        <motion.g
          style={{ transformOrigin: "800px 500px" }}
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 380, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="800" cy="500" r="180" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
            const r1 = 180;
            const r2 = i % 3 === 0 ? 168 : 174;
            const x1 = 800 + Math.cos(angle) * r1;
            const y1 = 500 + Math.sin(angle) * r1;
            const x2 = 800 + Math.cos(angle) * r2;
            const y2 = 500 + Math.sin(angle) * r2;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="0.6" opacity="0.5" />;
          })}
        </motion.g>

        {/* 中心十字标点 */}
        <g opacity="0.45">
          <path d="M 794 500 L 806 500 M 800 494 L 800 506" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="800" cy="500" r="3" fill="none" stroke="currentColor" strokeWidth="0.6" />
        </g>

        {/* E · 雷达扫描扇形 */}
        <g mask="url(#radar-mask)" opacity="0.55">
          <circle cx="800" cy="500" r="400" fill="url(#radar)" />
        </g>

        {/* F · 星座连线 — 描线后保持淡显 */}
        <g opacity="0.55">
          {CONSTELLATIONS.map((c, i) => (
            <motion.path
              key={i}
              d={c.d}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.55"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.7, 0.7, 0] }}
              transition={{
                duration: c.duration + 8,
                repeat: Infinity,
                ease: ease,
                delay: c.delay,
                times: [0, 0.35, 0.78, 1],
              }}
            />
          ))}
        </g>

        {/* 星座节点 — 跟随发光 */}
        <g opacity="0.7">
          {CONSTELLATIONS.flatMap((c, ci) => {
            const points = c.d
              .replace(/[ML]/g, "")
              .trim()
              .split(/\s+/)
              .reduce<{ x: number; y: number }[]>((acc, _, idx, arr) => {
                if (idx % 2 === 0) acc.push({ x: parseFloat(arr[idx]), y: parseFloat(arr[idx + 1]) });
                return acc;
              }, []);
            return points.map((p, pi) => (
              <motion.circle
                key={`cs-${ci}-${pi}`}
                cx={p.x}
                cy={p.y}
                r={1.5}
                fill="currentColor"
                animate={{ opacity: [0, 0.9, 0] }}
                transition={{
                  duration: c.duration + 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: c.delay + pi * 0.18,
                  times: [0.2, 0.5, 0.95],
                }}
              />
            ));
          })}
        </g>

        {/* G · 远端航线，pathLength 动画 + 周期重启 */}
        <motion.path
          d="M -100 320 L 1700 220"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.45"
          strokeDasharray="6 6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.45, 0.45, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear", times: [0, 0.45, 0.85, 1] }}
        />
        <motion.path
          d="M -100 720 L 1700 820"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.45"
          strokeDasharray="6 6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.4, 0.4, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear", times: [0, 0.45, 0.85, 1], delay: 5 }}
        />

        {/* 走线轨迹（呼吸） */}
        <motion.g animate={{ opacity: [0.25, 0.45, 0.25] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}>
          <path d="M 220 60 L 380 60 L 420 100 L 420 220" fill="none" stroke="currentColor" strokeWidth="0.55" strokeDasharray="6 6" />
          <path d="M 1380 60 L 1240 60 L 1200 100 L 1200 200" fill="none" stroke="currentColor" strokeWidth="0.55" strokeDasharray="6 6" />
        </motion.g>
      </svg>

      {/* H · 全屏水平扫描线（CSS） */}
      <div className="vf-scan" aria-hidden />
    </div>
  );
}
