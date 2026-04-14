import type {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { cache } from "react";

import { notion } from "../client/notion.client";
import {
  getCheckbox,
  getDate,
  getFiles,
  getMultiSelect,
  getNumber,
  getRelationIds,
  getSelect,
  getText,
  getUrl,
} from "../helpers/helpers.notion";
import type {
  BlogContentSection,
  BlogPost,
  BlogPostWithContent,
  CodeLanguage,
  InterestArea,
  JourneyEntry,
  Profile,
  Project,
  Recommendation,
  RichTextSegment,
  Service,
  SidebarItem,
} from "../types/types.notion";

// ─── Database IDs ─────────────────────────────────────────────────────────────
const DB = {
  BLOG_POSTS:               "7ab05863-53b3-4b87-953c-2280205e9411",
  BLOG_SECTIONS:            "b24703c1-34cc-49f3-997c-cd949863ccf9",
  PROJECTS:                 "ef66164d-df32-4644-b28d-d6056671b508",
  SERVICES:                 "06436d82-cdb7-4e8f-b13a-0e3d9446f818",
  SIDEBAR:                  "cb7baa92-17d6-44bd-9f65-94be834b87d9",
  PROFILE:                  "61afe697-9319-4f80-8fbe-bc3ad2fbf285",
  INTEREST_AREAS:           "a3ab0514-cf62-49ff-8e22-0fb024adab79",
  JOURNEY:                  "353e3277-8419-4da3-9711-2433dcf81297",
  JOURNEY_RESPONSIBILITIES: "22ae1840-c9a4-4449-8f8c-70f93a01a99c",
  RECOMMENDATIONS:          "c017395c-cc31-4a36-98a2-0ac828c85a1c",
} as const;

// ─── Block parser ─────────────────────────────────────────────────────────────

/**
 * Reads the blocks of a section page and returns { text, code }.
 * The page body is always: paragraph block(s) followed by an optional code block.
 */
async function parseSectionBlocks(
  pageId: string
): Promise<{ text: RichTextSegment[]; code: string | null }> {
  const { results } = await notion.blocks.children.list({ block_id: pageId });

  const allSegments: RichTextSegment[] = [];
  let code: string | null = null;

  for (const block of results as BlockObjectResponse[]) {
    if (block.type === "paragraph") {
      const segments = block.paragraph.rich_text
        .filter((t) => t.plain_text)
        .map((t) => ({
          content: t.plain_text,
          code:    t.annotations.code,
          bold:    t.annotations.bold,
          italic:  t.annotations.italic,
        }));

      if (segments.length > 0) {
        if (allSegments.length > 0) {
          allSegments.push({ content: "\n", code: false, bold: false, italic: false });
        }
        allSegments.push(...segments);
      }
    }

    if (block.type === "code") {
      code = block.code.rich_text.map((t) => t.plain_text).join("");
    }
  }

  return { text: allSegments, code };
}

// ─── Blog Posts ───────────────────────────────────────────────────────────────

function mapBlogPost(page: PageObjectResponse): BlogPost {
  const p = page.properties;
  return {
    id:            page.id,
    title:         getText(p, "Title"),
    description:   getText(p, "Description"),
    slug:          getText(p, "Slug"),
    publishedDate: getDate(p, "Published Date"),
    status:        getSelect(p, "Status") as BlogPost["status"],
    tags:          getMultiSelect(p, "Tags") as BlogPost["tags"],
  };
}

/** Returns all published blog posts, ordered by Published Date descending */
export const getBlogPosts = cache(async function getBlogPosts(): Promise<BlogPost[]> {
  const { results } = await notion.dataSources.query({
    data_source_id: DB.BLOG_POSTS,
    filter: {
      property: "Status",
      select: { equals: "Published" },
    },
    sorts: [{ property: "Published Date", direction: "descending" }],
  });

  return (results as PageObjectResponse[]).map(mapBlogPost);
});

// ─── Blog Content Sections ────────────────────────────────────────────────────

async function mapBlogSection(
  page: PageObjectResponse
): Promise<BlogContentSection> {
  const p = page.properties;
  const postIds = getRelationIds(p, "Post");
  const { text, code } = await parseSectionBlocks(page.id);

  return {
    id:       page.id,
    subTitle: getText(p, "Sub Title"),
    language: (getSelect(p, "Language") || "none") as CodeLanguage,
    hasCode:  getCheckbox(p, "Has Code"),
    order:    getNumber(p, "Order"),
    postId:   postIds[0] ?? "",
    text,
    code,
  };
}

/** Returns all sections for a given post ID, sorted by Order */
export const getSectionsByPostId = cache(async function getSectionsByPostId(
  postId: string
): Promise<BlogContentSection[]> {
  const { results } = await notion.dataSources.query({
    data_source_id: DB.BLOG_SECTIONS,
    filter: {
      property: "Post",
      relation: { contains: postId },
    },
    sorts: [{ property: "Order", direction: "ascending" }],
  });

  const sections = await Promise.all(
    (results as PageObjectResponse[]).map(mapBlogSection)
  );

  return sections;
});

// ─── Blog Post + Content (full page) ─────────────────────────────────────────

/** Fetches a single post by slug with all its sections — use in [slug]/page.tsx */
export const getBlogPostBySlug = cache(async function getBlogPostBySlug(
  slug: string
): Promise<BlogPostWithContent | null> {
  const { results } = await notion.dataSources.query({
    data_source_id: DB.BLOG_POSTS,
    filter: {
      property: "Slug",
      rich_text: { equals: slug },
    },
  });

  if (!results.length) return null;

  const post = mapBlogPost(results[0] as PageObjectResponse);
  const content = await getSectionsByPostId(post.id);

  return { ...post, content };
});

/** Fetches all published posts, each with their full content sections */
export async function getAllBlogPostsWithContent(): Promise<BlogPostWithContent[]> {
  const posts = await getBlogPosts();
  const withContent = await Promise.all(
    posts.map(async (post) => {
      const content = await getSectionsByPostId(post.id);
      return { ...post, content };
    })
  );
  return withContent;
}

// ─── Projects ─────────────────────────────────────────────────────────────────

function mapProject(page: PageObjectResponse): Project {
  const p = page.properties;
  return {
    id:           page.id,
    title:        getText(p, "Title"),
    category:     getSelect(p, "Category") as Project["category"],
    description:  getText(p, "Description"),
    link:         getUrl(p, "Link"),
    recent:       getCheckbox(p, "Recent"),
    status:       getSelect(p, "Status") as Project["status"],
    thumbnailUrl: getFiles(p, "Thumbnail"),
  };
}

export const getProjects = cache(async function getProjects(): Promise<Project[]> {
  const { results } = await notion.dataSources.query({
    data_source_id: DB.PROJECTS,
    filter: {
      property: "Status",
      select: { equals: "Published" },
    },
  });

  return (results as PageObjectResponse[]).map(mapProject);
});

// ─── Services ─────────────────────────────────────────────────────────────────

function mapService(page: PageObjectResponse): Service {
  const p = page.properties;
  return {
    id:          page.id,
    title:       getText(p, "Title"),
    description: getText(p, "Description"),
    order:       getNumber(p, "Order"),
    active:      getCheckbox(p, "Active"),
  };
}

export const getServices = cache(async function getServices(): Promise<Service[]> {
  const { results } = await notion.dataSources.query({
    data_source_id: DB.SERVICES,
    filter: {
      property: "Active",
      checkbox: { equals: true },
    },
    sorts: [{ property: "Order", direction: "ascending" }],
  });

  return (results as PageObjectResponse[]).map(mapService);
});

// ─── Sidebar Navigation ───────────────────────────────────────────────────────

function mapSidebarItem(page: PageObjectResponse): SidebarItem {
  const p = page.properties;
  return {
    id:           page.id,
    sectionTitle: getText(p, "Section Title"),
    anchor:       getText(p, "Anchor"),
    order:        getNumber(p, "Order"),
    visible:      getCheckbox(p, "Visible"),
  };
}

export const getSidebarItems = cache(async function getSidebarItems(): Promise<SidebarItem[]> {
  const { results } = await notion.dataSources.query({
    data_source_id: DB.SIDEBAR,
    filter: {
      property: "Visible",
      checkbox: { equals: true },
    },
    sorts: [{ property: "Order", direction: "ascending" }],
  });

  return (results as PageObjectResponse[]).map(mapSidebarItem);
});

// ─── Profile ──────────────────────────────────────────────────────────────────

function mapProfile(page: PageObjectResponse): Profile {
  const p = page.properties;
  return {
    id:                page.id,
    name:              getText(p, "Name"),
    status:            getText(p, "Status"),
    title:             getText(p, "Title"),
    specializations:   getText(p, "Specializations"),
    bio:               getText(p, "Bio"),
    communicationNote: getText(p, "Communication Note"),
    quote:             getText(p, "Quote"),
    githubUrl:         getUrl(p, "Github URL"),
    linkedinUrl:       getUrl(p, "LinkedIn URL"),
    cvUrl:             getUrl(p, "CV URL"),
    cvFileUrl:         getFiles(p, "CV File"),
    profileImageUrl:   getFiles(p, "Profile Image"),
  };
}

export const getProfile = cache(async function getProfile(): Promise<Profile | null> {
  const { results } = await notion.dataSources.query({
    data_source_id: DB.PROFILE,
  });

  if (!results.length) return null;
  return mapProfile(results[0] as PageObjectResponse);
});

// ─── Interest Areas ───────────────────────────────────────────────────────────

function mapInterestArea(page: PageObjectResponse): InterestArea {
  const p = page.properties;
  return {
    id:          page.id,
    name:        getText(p, "Name"),
    description: getText(p, "Description"),
    order:       getNumber(p, "Order"),
  };
}

export const getInterestAreas = cache(async function getInterestAreas(): Promise<InterestArea[]> {
  const { results } = await notion.dataSources.query({
    data_source_id: DB.INTEREST_AREAS,
    sorts: [{ property: "Order", direction: "ascending" }],
  });

  return (results as PageObjectResponse[]).map(mapInterestArea);
});

// ─── Journey ──────────────────────────────────────────────────────────────────

async function getResponsibilitiesForEntry(entryId: string): Promise<string[]> {
  const { results } = await notion.dataSources.query({
    data_source_id: DB.JOURNEY_RESPONSIBILITIES,
    filter: {
      property: "Journey Entry",
      relation: { contains: entryId },
    },
    sorts: [{ property: "Order", direction: "ascending" }],
  });

  return (results as PageObjectResponse[]).map((page) =>
    getText(page.properties, "Name")
  );
}

export const getJourneyEntries = cache(async function getJourneyEntries(): Promise<JourneyEntry[]> {
  const { results } = await notion.dataSources.query({
    data_source_id: DB.JOURNEY,
    sorts: [{ property: "Order", direction: "ascending" }],
  });

  const entries = await Promise.all(
    (results as PageObjectResponse[]).map(async (page) => {
      const p = page.properties;
      const responsibilities = await getResponsibilitiesForEntry(page.id);
      return {
        id:              page.id,
        company:         getText(p, "Name"),
        position:        getText(p, "Position"),
        companyUrl:      getUrl(p, "Company URL"),
        dateStart:       getText(p, "Date Start"),
        dateEnd:         getText(p, "Date End"),
        order:           getNumber(p, "Order"),
        responsibilities,
      } satisfies JourneyEntry;
    })
  );

  return entries;
});

// ─── Recommendations ─────────────────────────────────────────────────────────

function mapRecommendation(page: PageObjectResponse): Recommendation {
  const p = page.properties;
  return {
    id:                 page.id,
    name:               getText(p, "Name"),
    jobTitle:           getText(p, "Job Title"),
    recommendationText: getText(p, "Recommendation Text"),
    linkedinUrl:        getUrl(p, "LinkedIn URL"),
    profileImageUrl:    getFiles(p, "Profile Image"),
    span:               getCheckbox(p, "Span"),
    order:              getNumber(p, "Order"),
  };
}

export const getRecommendations = cache(async function getRecommendations(): Promise<Recommendation[]> {
  const { results } = await notion.dataSources.query({
    data_source_id: DB.RECOMMENDATIONS,
    sorts: [{ property: "Order", direction: "ascending" }],
  });

  return (results as PageObjectResponse[]).map(mapRecommendation);
});