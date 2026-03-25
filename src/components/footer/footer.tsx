import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-8">
        <p className="text-sm text-muted-foreground">
          {t("thanks")}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
          <span>&copy; {currentYear} Arctic Zvan · {t("rights")}</span>
          <span>·</span>
          <span>{t("builtWith")}</span>
        </div>
      </div>
    </footer>
  );
}
