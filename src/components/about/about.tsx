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
      gsap.fromTo(
        ".about-left",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-left", start: "top 85%" },
        }
      );
      gsap.fromTo(
        ".about-right",
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-right", start: "top 85%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative px-6 py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* Left - stacked image cards */}
        <div className="about-left flex justify-center">
          <ImageStack />
        </div>

        {/* Right - text */}
        <div className="about-right">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">
            {t("title")}
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
            {t("description")}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {HIGHLIGHTS.map(({ key, icon: Icon }) => (
              <div
                key={key}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground"
              >
                <Icon className="h-4 w-4 text-accent" />
                {t(key)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
