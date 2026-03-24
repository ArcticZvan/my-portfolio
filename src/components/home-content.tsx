"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { Preloader } from "@/components/preloader/preloader";
import { Hero } from "@/components/hero/hero";
import { About } from "@/components/about/about";
import { Journey } from "@/components/journey/journey";
import { Skills } from "@/components/skills/skills";
import { Projects } from "@/components/projects/projects";
import { BlogPreview } from "@/components/blog/blog-preview";
import { Contact } from "@/components/contact/contact";
import type { BlogPost } from "@/lib/mdx";

export function HomeContent({ posts }: { posts: BlogPost[] }) {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>
      <div className="flex flex-col">
        <Hero ready={!isLoading} />
        <About />
        <Journey />
        <Skills />
        <Projects />
        <BlogPreview posts={posts} />
        <Contact />
      </div>
    </>
  );
}
