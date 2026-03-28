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
  },
  {
    id: "edu-2",
    company: { zh: "伦敦玛丽女王大学", en: "Queen Mary University of London" },
    role: { zh: "物联网工程 本科", en: "B.S. in Internet of Things Engineering" },
    period: "2022 - 2026",
    location: { zh: "伦敦,英国", en: "London, United Kingdom" },
    description: { zh: ["专业课程：机器学习、数字音频处理、数据结构、中间件"], en: ["Coursework: Machine Learning, Middleware, Data Structures, Digital Audio Processing"] },
    type: "education"
  },
  {
    id: "work-1",          // 唯一 ID
    company: {
      zh: "新石器慧通（北京）科技有限公司",
      en: "Neolix (Beijing) Technology Co., Ltd.",
    },
    role: {
      zh: "DevOps工程师, 无人车独角兽公司",
      en: "DevOps Engineer, RoboVan Unicorn Company",
    },
    period: "2026 - Present",
    location: {
      zh: "北京,中国",
      en: "Beijing, China",
    },
    description: {
      zh: ["负责公司内部CI/CD流水线搭建和维护", "负责公司内部自动化/AI化运维工具开发", "参与公司AI Agent和MCP开发"],
      en: ["Responsible for building and maintaining the internal CI/CD pipeline", "Responsible for developing the internal automation maintenance tools", "Participate in the development of company AI Agent and MCP"],
    },
    type: "work",
  },
];
