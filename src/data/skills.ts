export type Skill = {
  name: string;
  icon: string;
  url: string;
  color: string;
  multicolor?: boolean;
};

export const skills: Skill[] = [
  // Row 1
  { name: "Python", icon: "/icons/python.svg", url: "https://python.org", color: "#3776AB" },
  { name: "Git", icon: "/icons/git.svg", url: "https://git-scm.com", color: "#F05032" },
  { name: "Golang", icon: "/icons/go.svg", url: "https://go.dev", color: "#00ADD8" },
  { name: "Docker", icon: "/icons/docker.svg", url: "https://docker.com", color: "#2496ED" },
  { name: "Kubernetes", icon: "/icons/kubernetes.svg", url: "https://kubernetes.io", color: "#326CE5" },
  { name: "Aliyun", icon: "/icons/alibabacloud.svg", url: "https://aliyun.com", color: "#FF6A00" },
  { name: "Java", icon: "/icons/java.svg", url: "https://java.com", color: "#ED8B00" },
  { name: "Cursor", icon: "/icons/cursor.svg", url: "https://cursor.com", color: "#7C3AED" },
  { name: "React", icon: "/icons/react.svg", url: "https://react.dev", color: "#61DAFB" },
  { name: "Node.js", icon: "/icons/nodedotjs.svg", url: "https://nodejs.org", color: "#339933" },
  // Row 2
  { name: "OpenClaw", icon: "/icons/openclaw.svg", url: "https://openclaw.ai", color: "#EF4444" },
  { name: "Redis", icon: "/icons/redis.svg", url: "https://redis.io", color: "#DC382D" },
  { name: "Claude", icon: "/icons/claude.svg", url: "https://claude.ai", color: "#D97757" },
  { name: "BCE", icon: "/icons/bce.svg", url: "https://console.bce.baidu.com", color: "#2932E1", multicolor: true },
  { name: "TensorFlow", icon: "/icons/tensorflow.svg", url: "https://tensorflow.org", color: "#FF6F00" },
  { name: "PyTorch", icon: "/icons/pytorch.svg", url: "https://pytorch.org", color: "#EE4C2C" },
  { name: "NumPy", icon: "/icons/numpy.svg", url: "https://numpy.org", color: "#4DABCF" },
  { name: "Pandas", icon: "/icons/pandas.svg", url: "https://pandas.pydata.org", color: "#150458" },
  { name: "MySQL", icon: "/icons/mysql.svg", url: "https://mysql.com", color: "#4479A1" },
  { name: "Linux", icon: "/icons/linux.svg", url: "https://kernel.org", color: "#FCC624" },
];
