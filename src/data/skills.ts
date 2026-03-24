export type Skill = {
  name: string;
  icon?: string;
};

export type SkillCategory = {
  key: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    key: "languages",
    skills: [
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "Python" },
      { name: "Java" },
      { name: "C++" },
      { name: "HTML/CSS" },
    ],
  },
  {
    key: "frameworks",
    skills: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Node.js" },
      { name: "Tailwind CSS" },
      { name: "Express.js" },
      { name: "Framer Motion" },
    ],
  },
  {
    key: "tools",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Docker" },
      { name: "VS Code" },
      { name: "Linux" },
      { name: "Vercel" },
    ],
  },
  {
    key: "databases",
    skills: [
      { name: "PostgreSQL" },
      { name: "MySQL" },
      { name: "MongoDB" },
      { name: "Redis" },
    ],
  },
];
