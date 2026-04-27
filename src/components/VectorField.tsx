import { motion } from "framer-motion";

/** 背景矢量装饰：几何网格与线构，偏平面构成感 */
export function VectorField() {
  return (
    <div className="vector-field" aria-hidden>
      <svg
        className="vector-field__svg"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="grid"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.4"
              opacity="0.4"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <circle cx="900" cy="180" r="118" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.35" />
        <motion.g
          style={{ transformOrigin: "900px 180px" }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="900" cy="62" r="4" fill="currentColor" opacity="0.5" />
        </motion.g>
        <line x1="0" y1="520" x2="1200" y2="320" stroke="currentColor" strokeWidth="0.6" opacity="0.22" />
        <motion.path
          d="M 80 700 Q 400 400 700 650 T 1120 480"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        />
        <motion.path
          d="M 1050 120 L 1180 40 M 1120 200 L 1180 120 L 1120 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="square"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          opacity="0.35"
        />
      </svg>
    </div>
  );
}
