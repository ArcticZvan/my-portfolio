import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { getBlogPosts } from "@/lib/mdx";
import { Link } from "@/i18n/navigation";
import { Calendar, Tag } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const posts = getBlogPosts(locale);

  return <BlogContent posts={posts} />;
}

function BlogContent({
  posts,
}: {
  posts: ReturnType<typeof getBlogPosts>;
}) {
  const t = useTranslations("blog");

  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-32">
      <div className="mb-16 text-center">
        <h1 className="text-3xl font-bold md:text-4xl">
          <span className="gradient-text">{t("title")}</span>
        </h1>
        <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No posts yet. Check back soon!
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="glass-card group block p-6 transition-all hover:border-accent/40 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)]"
            >
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(post.date).toLocaleDateString(post.locale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                {post.tags.length > 0 && (
                  <span className="flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    {post.tags.join(", ")}
                  </span>
                )}
              </div>
              <h2 className="mt-2 text-xl font-semibold text-foreground transition-colors group-hover:text-accent">
                {post.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {post.description}
              </p>
              <span className="mt-3 inline-block text-sm font-medium text-accent">
                {t("readMore")} →
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
