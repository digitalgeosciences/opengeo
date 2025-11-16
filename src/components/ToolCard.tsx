import { KeyboardEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, CheckCircle2, PauseCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  name: string;
  icon: string;
  description: string;
  link: string;
  tags: string[];
  by?: {
    name: string;
    url?: string | null;
  }[];
  dynamic?: boolean;
  onTagSelect?: (tag: string) => void;
}

export const ToolCard = ({
  name,
  icon,
  description,
  link,
  tags,
  by,
  onTagSelect,
  dynamic,
}: ToolCardProps) => {
  const hostname = (() => {
    try {
      return new URL(link).hostname.replace("www.", "");
    } catch {
      return "";
    }
  })();

  const handleBadgeActivate = (tag: string) => {
    onTagSelect?.(tag);
  };

  const handleBadgeKeyDown = (event: KeyboardEvent<HTMLDivElement>, tag: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleBadgeActivate(tag);
    }
  };

  const status =
    dynamic === true
      ? {
          icon: (
            <CheckCircle2
              className="h-4 w-4 text-blue-500"
              aria-hidden="true"
            />
          ),
          className: "bg-background/80 shadow-sm",
          aria: "Actively enhanced tool",
        }
      : dynamic === false
      ? {
          icon: (
            <PauseCircle
              className="h-4 w-4 text-gray-500"
              aria-hidden="true"
            />
          ),
          className: "bg-background/80 shadow-sm",
          aria: "Archived tool",
        }
      : null;

  return (
    <Card className="relative group h-full transition-all duration-300 hover:shadow-md hover:scale-[1.01] border-border/50 hover:border-primary/40 rounded-xl">
      {/* Header */}
      <CardHeader className="p-3 pb-2">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-2 w-full"
        >
          <div className="text-2xl flex-shrink-0 mt-0.5">{icon}</div>
          <div className="flex-1 min-w-0">
            <CardTitle
              title={name}
              className="text-sm font-semibold leading-tight group-hover:text-primary transition-colors flex items-center gap-1"
            >
              <span className="truncate">{name}</span>
              <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 opacity-0 -translate-y-0.5 group-hover:translate-y-0 group-hover:opacity-100 transition-all" />
            </CardTitle>
            {hostname && (
              <span className="text-[10px] text-muted-foreground block truncate leading-tight mt-0.5">
                {hostname}
              </span>
            )}
          </div>
        </a>
      </CardHeader>

      {/* Content */}
      <CardContent className="px-3 pb-3 space-y-2">
        <CardDescription className="text-xs leading-snug line-clamp-3 text-muted-foreground">
          {description}
        </CardDescription>

        {by?.length ? (
          <div className="text-[10px] text-muted-foreground flex flex-wrap items-center gap-1">
            <span className="text-[10px] font-semibold text-foreground/80">Added by:</span>
            {by.map((author, idx) => {
              const label = author.name?.trim() || "Unknown author";
              const key = `${label}-${idx}`;
              const content = author.url ? (
                <a
                  href={author.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                  onClick={(event) => event.stopPropagation()}
                >
                  {label}
                </a>
              ) : (
                <span className="text-foreground/80">{label}</span>
              );

              return (
                <span key={key} className="flex items-center gap-1">
                  {content}
                  {idx < by.length - 1 && (
                    <span className="text-muted-foreground">,</span>
                  )}
                </span>
              );
            })}
          </div>
        ) : null}

        {tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="text-[10px] px-1.5 py-0.5 bg-muted hover:bg-muted/80 text-foreground/80"
                onClick={(event) => {
                  event.preventDefault();
                  handleBadgeActivate(tag);
                }}
                onKeyDown={(event) => handleBadgeKeyDown(event, tag)}
                role={onTagSelect ? "button" : undefined}
                tabIndex={onTagSelect ? 0 : undefined}
                title={onTagSelect ? `Show tools tagged ${tag}` : undefined}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      {status && (
        <span
          className={cn(
            "absolute bottom-3 right-3 rounded-full px-2 py-0.5 text-xs uppercase tracking-wide flex items-center justify-center",
            status.className,
          )}
          aria-label={status.aria}
          title={status.aria}
        >
          {status.icon}
        </span>
      )}
    </Card>
  );
};
