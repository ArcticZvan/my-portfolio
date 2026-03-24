export type Project = {
  id: string;
  title: { zh: string; en: string };
  description: { zh: string; en: string };
  image?: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: "project-1",
    title: {
      zh: "个人作品集网站",
      en: "Personal Portfolio",
    },
    description: {
      zh: "基于 Next.js 15 + TypeScript + Tailwind CSS 构建的个人作品集，支持中英双语、暗色模式和丰富的动画效果。",
      en: "A personal portfolio built with Next.js 15, TypeScript, and Tailwind CSS, featuring bilingual support, dark mode, and rich animations.",
    },
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
    github: "https://github.com",
    featured: true,
  },
];
