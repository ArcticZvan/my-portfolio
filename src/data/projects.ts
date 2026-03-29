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
    github: "https://github.com/ArcticZvan/my-portfolio",
    featured: true,
  },
  {
    id: "project-2",
    title: {
      zh: "基于 AI 的脑电信号癫痫检测",
      en: "AI-Assisted Epilepsy Detection Using EEG Signals",
    },
    description: {
      zh: "利用机器学习与深度学习技术，对脑电图（EEG）信号进行分析，实现癫痫发作的自动化辅助检测，基于 Bonn 数据集进行实验验证。",
      en: "Leveraging machine learning and deep learning techniques to analyze EEG signals for automated epilepsy seizure detection, experimentally validated on the Bonn dataset.",
    },
    image: "/images/eeg-project.png",
    tags: ["Python", "EEG", "Machine Learning", "Deep Learning"],
    github: "https://github.com/ArcticZvan/AI-Assisted-Epilepsy-detection-using-EEG-signals",
    featured: true,
  },
];
