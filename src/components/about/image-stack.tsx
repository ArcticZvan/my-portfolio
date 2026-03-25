"use client";

import { useState, useCallback, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

const PLACEHOLDER_IMAGES = [
  { id: 1, bg: "from-violet-600/20 to-indigo-600/20", label: "Photo 1" },
  { id: 2, bg: "from-indigo-600/20 to-blue-600/20", label: "Photo 2" },
  { id: 3, bg: "from-purple-600/20 to-violet-600/20", label: "Photo 3" },
];

export function ImageStack() {
  const [order, setOrder] = useState([0, 1, 2]);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const spread = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

  const shuffle = useCallback(() => {
    setOrder((prev) => {
      const next = [...prev];
      const front = next.shift()!;
      next.push(front);
      return next;
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[380px] w-[300px] cursor-pointer md:h-[440px] md:w-[340px]"
      onClick={shuffle}
    >
      <div className="absolute inset-0 -m-4 rounded-3xl bg-violet-500/10 blur-[60px]" />

      <AnimatePresence initial={false}>
        {order.map((imgIndex, stackPos) => {
          const img = PLACEHOLDER_IMAGES[imgIndex];
          return (
            <CardLayer
              key={img.id}
              stackPos={stackPos}
              spread={spread}
              bg={img.bg}
              label={img.label}
            />
          );
        })}
      </AnimatePresence>

      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground/40">
        click to shuffle
      </div>
    </div>
  );
}

function CardLayer({
  stackPos,
  spread,
  bg,
  label,
}: {
  stackPos: number;
  spread: MotionValue<number>;
  bg: string;
  label: string;
}) {
  const baseRotate = (stackPos - 1) * 1;
  const fanRotate = (stackPos - 1) * 12;
  const baseX = stackPos * 18;
  const fanX = (stackPos - 1) * 30;

  const rotate = useTransform(spread, [0, 1], [baseRotate, fanRotate]);
  const x = useTransform(spread, [0, 1], [baseX, fanX]);
  const y = useTransform(spread, [0, 1], [stackPos * 12, stackPos * 6]);
  const scale = 1 - stackPos * 0.04;
  const zIndex = 3 - stackPos;

  return (
    <motion.div
      layout
      style={{ rotate, x, y, scale, zIndex }}
      className="absolute inset-0 overflow-hidden rounded-2xl border-2 border-violet-500/30 shadow-[0_0_30px_rgba(139,92,246,0.15)]"
    >
      <div
        className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${bg} bg-card`}
      >
        <span className="text-sm text-muted-foreground/50">{label}</span>
      </div>
    </motion.div>
  );
}
