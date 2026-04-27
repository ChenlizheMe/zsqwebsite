import { motion } from "framer-motion";

/** 背景：偏 Starfield UI 的钢架几何与仪表弧线，动效克制 */
export function VectorField() {
  return (
    <div className="vector-field" aria-hidden>
      <svg className="vector-field__svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="hex" width="56" height="49" patternUnits="userSpaceOnUse" patternTransform="scale(1)">
            <path
              d="M28 2 L52 15 L52 34 L28 47 L4 34 L4 15 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.55"
            />
          </pattern>
          <radialGradient id="vf-glow" cx="50%" cy="20%" r="60%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.14" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex)" opacity="0.55" />
        <rect width="100%" height="100%" fill="url(#vf-glow)" />
        <g opacity="0.55">
          <path d="M0 420 L1200 280" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <path d="M120 0 L120 800" fill="none" stroke="currentColor" strokeWidth="0.35" opacity="0.5" />
          <path d="M1040 0 L1040 800" fill="none" stroke="currentColor" strokeWidth="0.35" opacity="0.5" />
        </g>
        <motion.g style={{ transformOrigin: "600px 380px" }} animate={{ opacity: [0.35, 0.6, 0.35] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}>
          <path
            d="M 600 380 m -200 0 a 200 200 0 1 0 400 0 a 200 200 0 1 0 -400 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.7"
            strokeDasharray="32 20"
            opacity="0.55"
          />
          <path d="M 400 380 L 800 380" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.4" />
        </motion.g>
        <motion.path
          d="M 40 120 L 180 100 L 220 200 L 80 220 Z M 900 60 L 1040 80 L 1020 200 L 880 180 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
          opacity="0.45"
        />
      </svg>
    </div>
  );
}
