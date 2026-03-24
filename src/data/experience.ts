export type Experience = {
  id: string;
  company: { zh: string; en: string };
  role: { zh: string; en: string };
  period: string;
  location: { zh: string; en: string };
  description: { zh: string[]; en: string[] };
  type: "work" | "education";
};

export const experiences: Experience[] = [
  {
    id: "edu-1",
    company: { zh: "北京邮电大学", en: "Beijing University of Posts and Telecommunications  " },
    role: { zh: "物联网工程 本科", en: "B.S. in Internet of Things Engineering" },
    period: "2022 - 2026",
    location: { zh: "北京,中国", en: "Beijing, China" },
    description: { zh: ["专业课程：云计算、物联网、操作系统、计算机网络"], en: ["Coursework: Cloud Computing, Internet of Things, Operating Systems, Computer Networks"] },
    type: "education"
  }
];
