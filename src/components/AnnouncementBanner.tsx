import { Megaphone } from "lucide-react";

import { cn } from "@/lib/utils";
import announcement from "@/data/announcement.json";

type AnnouncementVariant = "info" | "success" | "warning";

type AnnouncementConfig = {
  active: boolean;
  title?: string;
  message: string;
  ctaText?: string;
  ctaUrl?: string;
  variant?: AnnouncementVariant;
};

const VARIANT_STYLES: Record<AnnouncementVariant, string> = {
  info: "border-primary/30 bg-primary/10 text-primary",
  success: "border-emerald-300 bg-emerald-500/10 text-emerald-700 dark:text-emerald-200",
  warning: "border-amber-300 bg-amber-500/10 text-amber-800 dark:text-amber-100",
};

const isConfigValid = (config: AnnouncementConfig): config is AnnouncementConfig & { active: true } => {
  return Boolean(config.active && config.message?.trim());
};

export const AnnouncementBanner = () => {
  const config = announcement as AnnouncementConfig;

  if (!isConfigValid(config)) {
    return null;
  }

  const variant = config.variant ?? "info";

  return (
    <div className={cn("border-b", VARIANT_STYLES[variant])}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2 text-left">
            <Megaphone className="h-4 w-4 shrink-0 mt-0.5" />
            <div className="space-y-1">
              {config.title && <p className="font-semibold leading-tight text-sm">{config.title}</p>}
              <p className="text-sm sm:text-base leading-tight">{config.message}</p>
            </div>
          </div>
          {config.ctaText && config.ctaUrl && (
            <a
              href={config.ctaUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-current px-4 py-1 text-xs font-semibold uppercase tracking-wide transition-colors hover:bg-background/10"
            >
              {config.ctaText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

