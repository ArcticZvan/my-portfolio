import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  locale: string;
  content: string;
};

const CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

export function getBlogPosts(locale: string): BlogPost[] {
  const localeDir = path.join(CONTENT_DIR, locale);

  if (!fs.existsSync(localeDir)) {
    return [];
  }

  const files = fs.readdirSync(localeDir).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(localeDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      slug,
      title: data.title || slug,
      description: data.description || "",
      date: data.date || new Date().toISOString(),
      tags: data.tags || [],
      locale,
      content,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getBlogPost(
  slug: string,
  locale: string
): BlogPost | undefined {
  const filePath = path.join(CONTENT_DIR, locale, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return undefined;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    date: data.date || new Date().toISOString(),
    tags: data.tags || [],
    locale,
    content,
  };
}
