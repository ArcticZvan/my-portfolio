import { useTranslations } from "next-intl";
import { GithubIcon } from "@/components/ui/icons";
import { Mail } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <span className="text-sm font-medium text-foreground">
            Arctic Zvan
          </span>
          <span className="text-xs text-muted-foreground">
            &copy; {currentYear} · {t("rights")}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground">
            {t("builtWith")}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="GitHub"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href="mailto:hello@example.com"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
