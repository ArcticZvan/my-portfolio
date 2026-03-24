"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import type { BlogPost } from "@/lib/mdx";

const mdxOptions = {
  rehypePlugins: [
    [
      rehypePrettyCode,
      {
        theme: "github-dark-default",
        keepBackground: true,
      },
    ],
  ],
};

export function BlogArticle({ post }: { post: BlogPost }) {
  const t = useTranslations("blog");

  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("backToBlog")}
      </Link>

      <header className="mb-10">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(post.date).toLocaleDateString(post.locale, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <h1 className="mt-3 text-3xl font-bold md:text-4xl">{post.title}</h1>
        {post.description && (
          <p className="mt-3 text-lg text-muted-foreground">
            {post.description}
          </p>
        )}
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-md bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-accent prose-strong:text-foreground prose-code:text-accent prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-border">
        {/* @ts-expect-error async RSC component */}
        <MDXRemote source={post.content} options={{ mdxOptions }} />
      </div>
    </article>
  );
}
