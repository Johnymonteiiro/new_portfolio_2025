import type { BlogTag } from "@/notion/types/types.notion";

export type BlogPostSummary = {
  title: string;
  slug: string;
  description: string;
  publishedDate: string | null;
  tags: BlogTag[];
};