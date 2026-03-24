"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Languages } from "lucide-react";
import { useTransition } from "react";

export function LanguageToggle() {
  const locale = useLocale();
  const t = useTranslations("common");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function switchLocale() {
    const nextLocale = locale === "zh" ? "en" : "zh";
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <button
      onClick={switchLocale}
      disabled={isPending}
      className="flex h-9 items-center gap-1.5 rounded-lg border border-border bg-card px-3 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-50"
      aria-label="Switch language"
    >
      <Languages className="h-4 w-4" />
      <span>{t("switchLang")}</span>
    </button>
  );
}
