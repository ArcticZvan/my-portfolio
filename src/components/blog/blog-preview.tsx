"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@/i18n/navigation";
import { Calendar, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/mdx";

gsap.registerPlugin(ScrollTrigger);

export function BlogPreview({ posts }: { posts: BlogPost[] }) {
  const t = useTranslations("blog");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".blog-preview-header",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".blog-preview-header",
            start: "top 85%",
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".blog-preview-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  if (posts.length === 0) {
    return null;
  }

  const displayPosts = posts.slice(0, 3);

  return (
    <section
      ref={sectionRef}
      id="blog-preview"
      className="relative px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="blog-preview-header mb-16 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">
              <span className="gradient-text">{t("title")}</span>
            </h2>
            <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
          </div>
          <Link
            href="/blog"
            className="hidden items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent/80 md:flex"
          >
            {t("readMore")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-preview-card group relative"
            >
              {/* Glow behind card */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-violet-500/20 via-transparent to-indigo-500/20 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100" />

              <div className="glass-card relative flex h-full flex-col p-6 transition-all group-hover:border-accent/40 group-hover:shadow-[0_0_25px_rgba(139,92,246,0.12)]">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {new Date(post.date).toLocaleDateString(locale, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>

                <h3 className="mt-3 text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
                  {post.title}
                </h3>

                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {post.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  {t("readMore")} <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent"
          >
            {t("readMore")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
