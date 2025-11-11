import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface ToolCardProps {
  name: string;
  icon: string;
  description: string;
  link: string;
  tags: string[];
}

export const ToolCard = ({ name, icon, description, link, tags }: ToolCardProps) => {
  const hostname = (() => {
    try {
      return new URL(link).hostname.replace("www.", "");
    } catch {
      return "";
    }
  })();

  return (
    <Card className="group h-full transition-all duration-300 hover:shadow-md hover:scale-[1.01] border-border/50 hover:border-primary/40 rounded-xl">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {/* Header */}
        <CardHeader className="p-3 pb-2">
          <div className="flex items-start gap-2">
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
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="px-3 pb-3 space-y-2">
          <CardDescription className="text-xs leading-snug line-clamp-3 text-muted-foreground">
            {description}
          </CardDescription>

          {tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.slice(0, 3).map((tag, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="text-[10px] px-1.5 py-0.5 bg-muted hover:bg-muted/80 text-foreground/80"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </a>
    </Card>
  );
};
