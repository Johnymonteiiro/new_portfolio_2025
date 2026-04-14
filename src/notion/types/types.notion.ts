// ─── Blog ────────────────────────────────────────────────────────────────────

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
  id: string;
  subTitle: string;
  language: CodeLanguage;
  hasCode: boolean;
  order: number;
  /** postId of the related Blog Post */
  postId: string;
  /** Parsed from page body blocks */
  text: string;
  code: string | null;
}

/** Full blog post with its sections — mirrors your original content_data shape */
export interface BlogPostWithContent extends BlogPost {
  content: BlogContentSection[];
}

// ─── Projects ────────────────────────────────────────────────────────────────

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

// ─── Services ────────────────────────────────────────────────────────────────

export interface Service {
  id: string;
  title: string;
  description: string;
  order: number;
  active: boolean;
}

// ─── Sidebar Navigation ──────────────────────────────────────────────────────

export interface SidebarItem {
  id: string;
  sectionTitle: string;
  anchor: string;
  order: number;
  visible: boolean;
}

// ─── Profile ─────────────────────────────────────────────────────────────────

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

// ─── Interest Areas ──────────────────────────────────────────────────────────

export interface InterestArea {
  id: string;
  name: string;
  description: string;
  order: number;
}

// ─── Journey ─────────────────────────────────────────────────────────────────

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

// ─── Recommendations ─────────────────────────────────────────────────────────

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