import type { BlogTag } from "@/notion/types/types.notion";

const TAG_STYLES: Record<BlogTag, string> = {
  "Next.js":  "bg-green-flat text-green",
  "React":    "bg-green-flat text-green",
  "NestJS":   "bg-purple-flat text-purple",
  "Auth":     "bg-purple-flat text-purple",
  "gRPC":     "bg-purple-flat text-purple",
  "RabbitMQ": "bg-purple-flat text-purple",
  "AI":       "text-yellow",
};

export function TagBadges({ tags, className }: { tags: BlogTag[]; className?: string }) {
  if (!tags.length) return null;
  return (
    <div className={`flex flex-wrap gap-2 ${className ?? ""}`}>
      {tags.map((tag) => (
        <span
          key={tag}
          className={`text-xs px-2 py-1 rounded-sm border border-border-color ${TAG_STYLES[tag] ?? "text-gray"}`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
