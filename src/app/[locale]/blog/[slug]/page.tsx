import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getBlogPost, getBlogPosts } from "@/lib/mdx";
import { BlogHeader } from "@/components/blog/blog-header";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const mdxOptions = {
  remarkPlugins: [remarkGfm],
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

  return (
    <article className="mx-auto max-w-5xl px-6 pb-24 pt-32">
      <BlogHeader post={post} />

      <div className="glass-card p-6 md:p-10">
        <div className="blog-content">
          {/* @ts-expect-error async RSC */}
          <MDXRemote source={post.content} options={{ mdxOptions }} />
        </div>
      </div>
    </article>
  );
}
