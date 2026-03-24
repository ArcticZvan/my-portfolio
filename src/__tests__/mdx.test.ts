import { describe, it, expect } from "vitest";
import { getBlogPosts, getBlogPost } from "@/lib/mdx";

describe("MDX blog system", () => {
  it("should return blog posts for zh locale", () => {
    const posts = getBlogPosts("zh");
    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0].title).toBeTruthy();
    expect(posts[0].slug).toBeTruthy();
    expect(posts[0].content).toBeTruthy();
  });

  it("should return blog posts for en locale", () => {
    const posts = getBlogPosts("en");
    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0].title).toBeTruthy();
  });

  it("should return a specific blog post by slug", () => {
    const post = getBlogPost("hello-world", "zh");
    expect(post).toBeDefined();
    expect(post?.title).toBe("你好，世界");
  });

  it("should return undefined for non-existent post", () => {
    const post = getBlogPost("does-not-exist", "zh");
    expect(post).toBeUndefined();
  });

  it("should return empty array for non-existent locale", () => {
    const posts = getBlogPosts("fr");
    expect(posts).toEqual([]);
  });
});
