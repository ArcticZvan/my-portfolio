"use client";

import { useState, useCallback, useEffect } from "react";
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

let hasPlayedPreloader = false;

export function HomeContent({ posts }: { posts: BlogPost[] }) {
  const [isLoading, setIsLoading] = useState(!hasPlayedPreloader);

  useEffect(() => {
    if (isLoading) {
      window.scrollTo(0, 0);
    }
  }, [isLoading]);

  const handlePreloaderComplete = useCallback(() => {
    hasPlayedPreloader = true;
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
