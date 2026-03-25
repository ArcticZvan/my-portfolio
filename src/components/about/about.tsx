"use client";

import { useTranslations } from "next-intl";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Bot, Heart } from "lucide-react";
import { ImageStack } from "./image-stack";

gsap.registerPlugin(ScrollTrigger);

const HIGHLIGHTS = [
  { key: "highlight1", icon: Code2 },
  { key: "highlight2", icon: Bot },
  { key: "highlight3", icon: Heart },
] as const;

export function About() {
  const t = useTranslations("about");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) {
        return;
      }

      // Entrance: left side slides in
      gsap.fromTo(
        ".about-left",
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-left", start: "top 85%" },
        }
      );

      // redoyanulhaque-style text parallax:
      // each element on the right is scrub-linked with different speeds
      const rightElements = section.querySelectorAll<HTMLElement>(".about-line");
      rightElements.forEach((el, i) => {
        const speed = 30 + i * 25;
        // Entrance reveal
        gsap.fromTo(
          el,
          { y: 40 + i * 10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
          }
        );
        // Continuous parallax while scrolling
        gsap.to(el, {
          y: -speed,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      });

      // Tags stagger in
      gsap.fromTo(
        ".about-tag",
        { y: 20, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.12,
          duration: 0.5,
          ease: "back.out(1.5)",
          scrollTrigger: { trigger: ".about-tags", start: "top 90%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden px-6 py-32 md:py-44"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* Left - stacked image cards with scroll-driven fan */}
        <div className="about-left flex justify-center">
          <ImageStack />
        </div>

        {/* Right - text with per-line parallax */}
        <div>
          <h2 className="about-line art-text text-3xl font-black uppercase tracking-[0.2em] md:text-4xl lg:text-5xl">
            {t("title")}
          </h2>

          <p className="about-line mt-8 text-lg leading-relaxed text-muted-foreground md:text-xl">
            {t("description")}
          </p>

          <div className="about-line about-tags mt-8 flex flex-wrap gap-3">
            {HIGHLIGHTS.map(({ key, icon: Icon }) => (
              <div
                key={key}
                className="about-tag inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-2 text-sm font-medium text-foreground shadow-[0_0_12px_rgba(139,92,246,0.1)]"
              >
                <Icon className="h-4 w-4 text-accent drop-shadow-[0_0_6px_rgba(139,92,246,0.5)]" />
                {t(key)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
