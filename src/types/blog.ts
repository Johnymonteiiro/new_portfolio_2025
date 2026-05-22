import type { BlogTag } from "@/sanity/lib/types";

export type BlogPostSummary = {
  title: string;
  slug: string;
  description: string;
  publishedDate: string | null;
  tags: BlogTag[];
};