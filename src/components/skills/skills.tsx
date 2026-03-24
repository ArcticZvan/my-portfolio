"use client";

import { useTranslations } from "next-intl";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillCategories } from "@/data/skills";

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
          scrollTrigger: {
            trigger: ".skills-header",
            start: "top 85%",
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".skill-category").forEach((cat) => {
        gsap.fromTo(
          cat,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cat,
              start: "top 88%",
            },
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
      <div className="mx-auto max-w-6xl">
        <div className="skills-header mb-16 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            <span className="gradient-text">{t("title")}</span>
          </h2>
          <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {skillCategories.map((category) => (
            <div key={category.key} className="skill-category glass-card p-6">
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                {t(`categories.${category.key}`)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="group relative inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-sm font-medium text-foreground transition-all hover:border-accent/50 hover:shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
