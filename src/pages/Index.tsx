import { useState, useMemo, useEffect, useCallback } from "react";
import { Header } from "@/components/Header";
import { ToolCard } from "@/components/ToolCard";
import { Footer } from "@/components/Footer";
import { Filter, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Tool {
  name: string;
  icon: string;
  description: string;
  link: string;
  category: string;
  tags: string[];
  stars: number | null;
}

const loadTools = async (): Promise<Tool[]> => {
  const data = await import("@/data/tools.json");
  return data.default as Tool[];
};

const Index = () => {
  const INITIAL_VISIBLE = 20;
  const PAGE_SIZE = 20;

  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showTags, setShowTags] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  // ✅ Load tools once
  useEffect(() => {
    loadTools().then((data) => {
      setTools(data);
      setIsLoading(false);
    });
  }, []);

  // ✅ Extract tags
  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    tools.forEach((t) => t.tags?.forEach((tg) => tagSet.add(tg)));
    return Array.from(tagSet).sort();
  }, [tools]);

  // ✅ Filter and sort
  const filteredTools = useMemo(() => {
    let list = [...tools];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tg) => tg.toLowerCase().includes(q))
      );
    }
    if (selectedTag) {
      list = list.filter((t) => t.tags.includes(selectedTag));
    }
    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, [tools, searchQuery, selectedTag]);

  // ✅ Reset when filters change
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
  }, [searchQuery, selectedTag]);

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedTag(null);
  }, []);

  // ✅ Show More logic — true incremental pagination
  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredTools.length));
  };

  const handleShowLess = () => {
    setVisibleCount(INITIAL_VISIBLE);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading tools...
      </div>
    );
  }

  const visibleTools = filteredTools.slice(0, visibleCount);
  const canShowMore = visibleCount < filteredTools.length;
  const canShowLess = visibleCount > INITIAL_VISIBLE;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-1">
        {/* Search + Filter Section */}
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-2/3 md:w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTags((v) => !v)}
                className="flex items-center gap-1"
              >
                <Filter className="w-4 h-4" />
                {showTags ? "Hide Tags" : "Filter by Tag"}
              </Button>
              {(searchQuery || selectedTag) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="flex items-center gap-1"
                >
                  <X className="w-4 h-4" /> Clear
                </Button>
              )}
            </div>
          </div>

          {showTags && (
            <div className="flex flex-wrap justify-center gap-2">
              <Badge
                onClick={() => setSelectedTag(null)}
                variant={selectedTag === null ? "default" : "outline"}
                className="cursor-pointer"
              >
                All
              </Badge>
              {tags.map((tg) => (
                <Badge
                  key={tg}
                  onClick={() => setSelectedTag(tg)}
                  variant={selectedTag === tg ? "default" : "outline"}
                  className="cursor-pointer"
                >
                  {tg}
                </Badge>
              ))}
            </div>
          )}

          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {visibleTools.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">
              {filteredTools.length}
            </span>{" "}
            tools
            {searchQuery && ` for "${searchQuery}"`}
            {selectedTag && ` tagged "${selectedTag}"`}
          </p>
        </div>

        {/* Unified Grid */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {visibleTools.map((tool, i) => (
            <ToolCard key={`${tool.name}-${i}`} {...tool} />
          ))}
        </div>

        {/* Show More / Less */}
        {(canShowMore || canShowLess) && (
          <div className="flex justify-center mt-4 gap-3">
            {canShowMore && (
              <Button variant="outline" size="sm" onClick={handleShowMore}>
                Show More
              </Button>
            )}
            {canShowLess && (
              <Button variant="outline" size="sm" onClick={handleShowLess}>
                Show Less
              </Button>
            )}
          </div>
        )}

        {filteredTools.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No tools found matching your criteria.
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
