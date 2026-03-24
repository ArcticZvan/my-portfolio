"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, FolderOpen } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const t = useTranslations("projects");
  const locale = useLocale() as "zh" | "en";
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".projects-header",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-header",
            start: "top 85%",
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="projects-header mb-16 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            <span className="gradient-text">{t("title")}</span>
          </h2>
          <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card glass-card group flex flex-col overflow-hidden transition-all hover:border-accent/40 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)]"
            >
              {/* Project image placeholder */}
              <div className="flex h-48 items-center justify-center bg-muted/30">
                <FolderOpen className="h-12 w-12 text-muted-foreground/30" />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                  {project.title[locale]}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {project.description[locale]}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <GithubIcon className="h-4 w-4" />
                      <span>{t("viewCode")}</span>
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>{t("viewProject")}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
