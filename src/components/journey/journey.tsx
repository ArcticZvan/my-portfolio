"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, GraduationCap } from "lucide-react";
import { experiences } from "@/data/experience";

gsap.registerPlugin(ScrollTrigger);

export function Journey() {
  const t = useTranslations("journey");
  const locale = useLocale() as "zh" | "en";
  const sectionRef = useRef<HTMLElement>(null);
  const timelineTrackRef = useRef<HTMLDivElement>(null);
  const glowLineRef = useRef<HTMLDivElement>(null);
  const glowDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        ".journey-header",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".journey-header", start: "top 85%" },
        }
      );

      // Items entrance
      gsap.utils.toArray<HTMLElement>(".journey-item").forEach((item, i) => {
        gsap.fromTo(
          item,
          { x: i % 2 === 0 ? -40 : 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 85%" },
          }
        );
      });

      // Glowing line that fills as you scroll
      if (glowLineRef.current && glowDotRef.current && timelineTrackRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: timelineTrackRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 0.5,
          },
        });

        tl.fromTo(
          glowLineRef.current,
          { scaleY: 0 },
          { scaleY: 1, ease: "none" }
        );

        gsap.fromTo(
          glowDotRef.current,
          { top: "0%" },
          {
            top: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: timelineTrackRef.current,
              start: "top 60%",
              end: "bottom 40%",
              scrub: 0.5,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-4xl">
        <div className="journey-header mb-16 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            <span className="gradient-text">{t("title")}</span>
          </h2>
          <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
        </div>

        {/* Timeline */}
        <div ref={timelineTrackRef} className="relative">
          {/* Static dim background line */}
          <div className="absolute left-[15px] top-0 h-full w-[2px] rounded-full bg-accent/10 md:left-1/2 md:-translate-x-[1px]" />

          {/* Glowing progress line */}
          <div
            ref={glowLineRef}
            className="absolute left-[15px] top-0 h-full w-[3px] origin-top rounded-full md:left-1/2 md:-translate-x-[1.5px]"
            style={{ transform: "scaleY(0)" }}
          >
            <div className="h-full w-full rounded-full bg-gradient-to-b from-violet-300/40 via-violet-400/70 to-accent shadow-[0_0_10px_rgba(139,92,246,0.6),0_0_25px_rgba(139,92,246,0.3)]" />
          </div>

          {/* Glowing orb that travels down */}
          <div
            ref={glowDotRef}
            className="absolute left-[16px] z-10 -translate-x-1/2 md:left-1/2"
            style={{ top: "0%" }}
          >
            <div className="relative flex items-center justify-center">
              {/* Large diffuse glow */}
              <div className="absolute h-16 w-16 rounded-full bg-violet-300/20 blur-[16px]" />
              <div className="absolute h-10 w-10 rounded-full bg-white/10 blur-[8px]" />
              {/* Core orb */}
              <div className="relative h-4 w-4 rounded-full bg-gradient-to-br from-white via-violet-300 to-accent shadow-[0_0_16px_rgba(255,255,255,0.5),0_0_30px_rgba(139,92,246,0.7),0_0_60px_rgba(139,92,246,0.3)]" />
              {/* Ping ripple */}
              <div className="absolute h-4 w-4 animate-ping rounded-full bg-white/30" />
            </div>
          </div>

          <div className="flex flex-col gap-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`journey-item relative flex flex-col gap-4 pl-12 md:w-1/2 md:pl-0 ${
                  index % 2 === 0
                    ? "md:pr-12 md:text-right"
                    : "md:ml-auto md:pl-12"
                }`}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-2 top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-accent bg-background shadow-[0_0_8px_rgba(139,92,246,0.3)] md:top-1 ${
                    index % 2 === 0
                      ? "md:left-auto md:-right-2.5"
                      : "md:-left-2.5"
                  }`}
                >
                  {exp.type === "education" ? (
                    <GraduationCap className="h-2.5 w-2.5 text-accent" />
                  ) : (
                    <Briefcase className="h-2.5 w-2.5 text-accent" />
                  )}
                </div>

                <div className="glass-card p-5">
                  <div className="mb-1 text-xs font-medium text-accent">
                    {exp.period}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {exp.company[locale]}
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground">
                    {exp.role[locale]}
                  </p>
                  {exp.location && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {exp.location[locale]}
                    </p>
                  )}
                  {exp.description[locale].length > 0 && (
                    <ul
                      className={`mt-3 space-y-1 text-sm text-muted-foreground ${
                        index % 2 === 0 ? "md:text-right" : ""
                      }`}
                    >
                      {exp.description[locale].map((desc, i) => (
                        <li key={i}>▹ {desc}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
