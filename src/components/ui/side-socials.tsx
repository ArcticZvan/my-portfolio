"use client";

import { Mail } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";

const SOCIALS = [
  {
    icon: GithubIcon,
    href: "https://github.com/ArcticZvan",
    label: "GitHub",
  },
  {
    icon: Mail,
    href: "mailto:arcticzvan@gmail.com",
    label: "Email",
  },
] as const;

export function SideSocials() {
  return (
    <div className="fixed bottom-0 left-6 z-40 hidden flex-col items-center gap-5 md:flex lg:left-10">
      {SOCIALS.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("mailto") ? undefined : "_blank"}
          rel="noopener noreferrer"
          className="group relative text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:text-foreground"
          aria-label={label}
        >
          <Icon className="h-5 w-5 transition-colors duration-300 group-hover:text-accent group-hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
        </a>
      ))}
      {/* Gradient guide line */}
      <div className="h-24 w-px bg-gradient-to-b from-violet-400 via-fuchsia-400 to-transparent" />
    </div>
  );
}
