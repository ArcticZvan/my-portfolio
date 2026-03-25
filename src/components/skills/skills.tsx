"use client";

import { useTranslations } from "next-intl";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { skills } from "@/data/skills";

gsap.registerPlugin(ScrollTrigger);

export function Skills() {
  const t = useTranslations("skills");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skills-header",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".skills-header", start: "top 85%" },
        }
      );

      gsap.utils.toArray<HTMLElement>(".skill-tile").forEach((tile, i) => {
        gsap.fromTo(
          tile,
          { y: 30, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: i * 0.04,
            ease: "back.out(1.4)",
            scrollTrigger: { trigger: tile, start: "top 92%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative px-6 py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.07] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <div className="skills-header mb-16 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            <span className="gradient-text">{t("title")}</span>
          </h2>
          <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {skills.map((skill) => (
            <a
              key={skill.name}
              href={skill.url}
              target="_blank"
              rel="noopener noreferrer"
              className="skill-tile group flex flex-col items-center gap-2 rounded-xl border border-transparent bg-white/[0.03] p-4 transition-all duration-300 hover:-translate-y-1.5 hover:scale-105 hover:border-white/[0.12] hover:bg-white/[0.07]"
              style={
                {
                  width: "80px",
                  "--brand": skill.color,
                } as React.CSSProperties
              }
            >
              {skill.multicolor ? (
                <div className="relative h-8 w-8 transition-transform duration-300 group-hover:scale-110">
                  {/* White mask layer (default) */}
                  <div
                    className="skill-icon absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
                    style={{
                      WebkitMaskImage: `url(${skill.icon})`,
                      maskImage: `url(${skill.icon})`,
                      WebkitMaskSize: "contain",
                      maskSize: "contain",
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                      maskPosition: "center",
                    }}
                  />
                  {/* Original color layer (hover) */}
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    width={32}
                    height={32}
                    className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>
              ) : (
                <div
                  className="skill-icon h-8 w-8 transition-all duration-300 group-hover:scale-110"
                  style={{
                    WebkitMaskImage: `url(${skill.icon})`,
                    maskImage: `url(${skill.icon})`,
                    WebkitMaskSize: "contain",
                    maskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                  }}
                />
              )}
              <span className="text-[10px] font-medium text-muted-foreground/70 transition-colors duration-300 group-hover:text-foreground">
                {skill.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
