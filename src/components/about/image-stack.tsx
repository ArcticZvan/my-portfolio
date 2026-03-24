"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PLACEHOLDER_IMAGES = [
  { id: 1, bg: "from-violet-600/20 to-indigo-600/20", label: "Photo 1" },
  { id: 2, bg: "from-indigo-600/20 to-blue-600/20", label: "Photo 2" },
  { id: 3, bg: "from-purple-600/20 to-violet-600/20", label: "Photo 3" },
];

export function ImageStack() {
  const [order, setOrder] = useState([0, 1, 2]);

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
      className="relative h-[380px] w-[300px] cursor-pointer md:h-[440px] md:w-[340px]"
      onClick={shuffle}
    >
      {/* Glow behind the stack */}
      <div className="absolute inset-0 -m-4 rounded-3xl bg-violet-500/10 blur-[60px]" />

      <AnimatePresence initial={false}>
        {order.map((imgIndex, stackPos) => {
          const offset = stackPos * 12;
          const rotate = (stackPos - 1) * 3;
          const scale = 1 - stackPos * 0.04;
          const zIndex = 3 - stackPos;
          const img = PLACEHOLDER_IMAGES[imgIndex];

          return (
            <motion.div
              key={img.id}
              layout
              initial={false}
              animate={{
                x: offset,
                y: offset,
                rotate,
                scale,
                zIndex,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              className="absolute inset-0 overflow-hidden rounded-2xl border-2 border-violet-500/30 shadow-[0_0_30px_rgba(139,92,246,0.15)]"
            >
              {/* Placeholder gradient — replace with <Image> when you have photos */}
              <div
                className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${img.bg} bg-card`}
              >
                <span className="text-sm text-muted-foreground/50">
                  {img.label}
                </span>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Hint */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground/40">
        click to shuffle
      </div>
    </div>
  );
}
