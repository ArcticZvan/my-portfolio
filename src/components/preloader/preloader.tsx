"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const arcticRef = useRef<HTMLSpanElement>(null);
  const zvanRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      tl.set([arcticRef.current, zvanRef.current], {
        opacity: 0,
        y: 20,
        filter: "blur(8px)",
      });

      // "Arctic" trembles in from above
      tl.to(arcticRef.current, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "back.out(2)",
      }, 0.2);

      // Subtle shake on Arctic
      tl.to(arcticRef.current, {
        x: -3,
        duration: 0.05,
        yoyo: true,
        repeat: 5,
        ease: "none",
      }, 0.8);

      tl.to(arcticRef.current, { x: 0, duration: 0.1 });

      // "Zvan" trembles in from below
      tl.to(zvanRef.current, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "back.out(2)",
      }, 0.5);

      // Subtle shake on Zvan
      tl.to(zvanRef.current, {
        x: 3,
        duration: 0.05,
        yoyo: true,
        repeat: 5,
        ease: "none",
      }, 1.1);

      tl.to(zvanRef.current, { x: 0, duration: 0.1 });

      // Hold for a moment
      tl.to({}, { duration: 0.4 });

      // Slide overlay up to reveal page
      tl.to(
        overlayRef.current,
        {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
        }
      );

      // Fade out container
      tl.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.2,
          ease: "power2.out",
        },
        "-=0.1"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center"
    >
      <div ref={overlayRef} className="absolute inset-0 bg-[#0a0a0f]" />

      <div className="relative z-10 flex flex-col items-center">
        <span
          ref={arcticRef}
          className="block text-6xl font-black uppercase tracking-widest text-transparent md:text-8xl"
          style={{
            WebkitTextStroke: "2px rgba(139, 92, 246, 0.8)",
            textShadow: "0 0 40px rgba(139, 92, 246, 0.3)",
          }}
        >
          Arctic
        </span>
        <span
          ref={zvanRef}
          className="block text-6xl font-black uppercase tracking-widest text-transparent md:text-8xl"
          style={{
            WebkitTextStroke: "2px rgba(99, 102, 241, 0.8)",
            textShadow: "0 0 40px rgba(99, 102, 241, 0.3)",
          }}
        >
          Zvan
        </span>
      </div>
    </div>
  );
}
