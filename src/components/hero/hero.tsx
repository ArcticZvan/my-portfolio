"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function Hero({ ready }: { ready: boolean }) {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (!ready || animatedRef.current) {
      return;
    }
    animatedRef.current = true;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      tl.fromTo(
        ".hero-badge",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
      );

      tl.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        "-=0.2"
      );

      tl.fromTo(
        subRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.4"
      );

      tl.fromTo(
        ".hero-cta",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      );

      tl.fromTo(
        ".hero-scroll",
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.2"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-violet-500/10 blur-[128px]" />
        <div className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-indigo-500/10 blur-[128px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="hero-badge mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground opacity-0">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          <span>{t("greeting")}</span>
        </div>

        <h1
          ref={headingRef}
          className="text-5xl font-bold leading-tight tracking-tight opacity-0 md:text-7xl lg:text-8xl"
        >
          <span className="gradient-text">{t("name")}</span>
          <br />
          <span className="text-3xl font-medium text-muted-foreground md:text-4xl lg:text-5xl">
            {t("role")}
          </span>
        </h1>

        <p
          ref={subRef}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground opacity-0 md:text-xl"
        >
          {t("description")}
        </p>

        <div className="hero-cta mt-10 opacity-0">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-violet-500/40 hover:brightness-110"
          >
            {t("cta")}
          </a>
        </div>
      </div>

      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0">
        <motion.div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-muted-foreground/30 p-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50"
          />
        </motion.div>
      </div>
    </section>
  );
}
