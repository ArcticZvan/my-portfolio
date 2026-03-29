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
    id: "project-eeg",
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
  {
    id: "project-dns",
    title: {
      zh: "DNS Relay 中继服务",
      en: "DNS Relay Server",
    },
    description: {
      zh: "基于 Java 实现的 UDP DNS 中继服务器，支持本地缓存命中、域名拦截与上游转发，手动解析 DNS 报文（RFC1035），采用线程池处理高并发查询。",
      en: "A UDP-based DNS relay server built in Java, featuring local cache lookup, domain blocking, and upstream forwarding. Manually parses DNS packets per RFC1035 with thread pool concurrency.",
    },
    image: "/images/dns-project.png",
    tags: ["Java", "DNS", "Networking", "Concurrency"],
    github: "https://github.com/JPArcticZvan",
    featured: true,
  },
  {
    id: "project-finance",
    title: {
      zh: "个人财务管理系统",
      en: "Financial Management Application",
    },
    description: {
      zh: "基于 Java + Maven 构建的桌面端个人财务管理应用，支持收支记录、分类统计、数据可视化和报表导出，团队协作开发的软件工程课程项目。",
      en: "A desktop financial management app built with Java and Maven, supporting income/expense tracking, categorized statistics, data visualization, and report export. A team-based software engineering course project.",
    },
    image: "/images/finance-project.png",
    tags: ["Java", "Maven", "Desktop App", "Software Engineering"],
    github: "https://github.com/JPArcticZvan",
    featured: true,
  },
];
