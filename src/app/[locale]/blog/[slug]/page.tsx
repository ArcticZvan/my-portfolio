import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getBlogPost, getBlogPosts } from "@/lib/mdx";
import { BlogArticle } from "@/components/blog/blog-article";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const locales = ["zh", "en"];
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    const posts = getBlogPosts(locale);
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }

  return params;
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getBlogPost(slug, locale);

  if (!post) {
    notFound();
  }

  return <BlogArticle post={post} />;
}
