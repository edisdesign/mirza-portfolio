import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import svgPaths from "../../imports/svg-b9tvxp02ga";

function ArchLogo({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 60 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <motion.path
        d="M5 80 V40 C5 18.5 14 5 30 5 C46 5 55 18.5 55 40 V80"
        stroke="#c9a96e"
        strokeWidth="2.5"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        d="M18 80 V44 C18 28 22 18 30 18 C38 18 42 28 42 44 V80"
        stroke="#c9a96e"
        strokeWidth="1.5"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        d="M30 0 L33 4 L30 8 L27 4 Z"
        fill="#c9a96e"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.8 }}
      />
    </motion.svg>
  );
}

function Signature({ phase }: { phase: string }) {
  const isVisible = phase === "name" || phase === "exit";

  return (
    <div className="relative w-[280px] h-[66px] md:w-[406px] md:h-[97px]">
      <svg
        className="absolute inset-0 w-full h-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 406.372 96.618"
      >
        <defs>
          {/* Animated mask that reveals left to right */}
          <mask id="signature-reveal">
            <motion.rect
              x="0"
              y="0"
              height="100"
              fill="white"
              initial={{ width: 0 }}
              animate={isVisible ? { width: 420 } : { width: 0 }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.05,
              }}
            />
          </mask>
        </defs>
        <g mask="url(#signature-reveal)">
          <path d={svgPaths.p1c3cc380} fill="#f5f0eb" fillOpacity="0.97" />
          <path d={svgPaths.p2ac06900} fill="#f5f0eb" fillOpacity="0.98" />
          <path d={svgPaths.p3cbfdff1} fill="#f5f0eb" fillOpacity="0.99" />
          <path d={svgPaths.p311f4440} fill="#f5f0eb" fillOpacity="0.98" />
          <path d={svgPaths.pd6a9000} fill="#f5f0eb" fillOpacity="0.97" />
          <path d={svgPaths.p17339b80} fill="#f5f0eb" />
        </g>
      </svg>
    </div>
  );
}

export function LoadingScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<"logo" | "name" | "exit">("logo");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("name"), 1000);
    const t2 = setTimeout(() => setPhase("exit"), 2800);
    const t3 = setTimeout(() => onComplete(), 3500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <ArchLogo className="w-[50px] h-[65px] md:w-[60px] md:h-[80px]" />
          </motion.div>

          {/* Signature */}
          <Signature phase={phase} />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={
              phase === "name" || phase === "exit"
                ? { opacity: 0.4 }
                : { opacity: 0 }
            }
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-['Inter'] text-white/40 text-[10px] md:text-[11px] tracking-[0.4em] uppercase mt-6"
          >
            Akademski slikar
          </motion.p>

          {/* Loading line */}
          <motion.div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[120px] h-[1px] bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-[#c9a96e]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.2, ease: "linear" }}
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}