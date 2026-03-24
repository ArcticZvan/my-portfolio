import { setRequestLocale } from "next-intl/server";
import { HomeContent } from "@/components/home-content";
import { getBlogPosts } from "@/lib/mdx";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = getBlogPosts(locale);

  return <HomeContent posts={posts} />;
}
