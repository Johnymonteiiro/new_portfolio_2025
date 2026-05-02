import type { PortableTextBlock } from "@portabletext/react";

export type BlogTag =
  | "Next.js"
  | "NestJS"
  | "gRPC"
  | "AI"
  | "Auth"
  | "RabbitMQ"
  | "React";

export type CodeLanguage = "ts" | "tsx" | "proto" | "js" | "none";

export type ContentStatus = "Published" | "Draft" | "Archived";

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  slug: string;
  publishedDate: string | null;
  status: ContentStatus;
  tags: BlogTag[];
}

export interface BlogContentSection {
  subTitle: string;
  body: PortableTextBlock[];
  language: CodeLanguage;
  code: string | null;
}

export interface BlogPostWithContent extends BlogPost {
  content: BlogContentSection[];
}

export type ProjectCategory = "WEB DEVELOPMENT" | "UI DESIGN";
export type ProjectStatus = "Published" | "Draft" | "Archived";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  link: string;
  recent: boolean;
  status: ProjectStatus;
  thumbnailUrl: string | null;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  order: number;
  active: boolean;
}

export interface SidebarItem {
  id: string;
  sectionTitle: string;
  anchor: string;
  order: number;
  visible: boolean;
}

export interface Profile {
  id: string;
  name: string;
  status: string;
  title: string;
  specializations: string;
  bio: string;
  communicationNote: string;
  quote: string;
  githubUrl: string | null;
  linkedinUrl: string | null;
  cvUrl: string | null;
  cvFileUrl: string | null;
  profileImageUrl: string | null;
}

export interface InterestArea {
  id: string;
  name: string;
  description: string;
  order: number;
}

export interface JourneyEntry {
  id: string;
  company: string;
  position: string;
  companyUrl: string | null;
  dateStart: string;
  dateEnd: string;
  order: number;
  responsibilities: string[];
}

export interface Recommendation {
  id: string;
  name: string;
  jobTitle: string;
  recommendationText: string;
  linkedinUrl: string | null;
  profileImageUrl: string | null;
  span: boolean;
  order: number;
}
