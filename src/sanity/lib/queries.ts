import { cache } from "react";

import { sanityClient } from "./client";
import { sanityFetch } from "./live";
import type {
  BlogPost,
  BlogPostWithContent,
  InterestArea,
  JourneyEntry,
  Profile,
  Project,
  Recommendation,
  Service,
  SidebarItem,
} from "./types";

const blogPostFields = /* groq */ `
  "id": _id,
  title,
  description,
  "slug": slug.current,
  "publishedDate": publishedDate,
  status,
  "tags": coalesce(tags, [])
`;

const blogSectionFields = /* groq */ `
  "subTitle": subTitle,
  "body": coalesce(body, []),
  "language": coalesce(language, "none"),
  "code": code
`;

export const getBlogPosts = cache(async function getBlogPosts(): Promise<BlogPost[]> {
  const { data } = await sanityFetch({
    query: /* groq */ `*[_type == "blogPost" && status == "Published"] | order(publishedDate desc) {
      ${blogPostFields}
    }`,
  });
  return data as BlogPost[];
});

/**
 * Build-time slug list for `generateStaticParams`. Uses the raw client (no
 * `sanityFetch`) because `defineLive`'s fetcher reads `draftMode()` cookies,
 * which are unavailable outside of a request scope.
 */
export async function getBlogPostSlugs(): Promise<string[]> {
  const slugs = await sanityClient
    .withConfig({ useCdn: false })
    .fetch<string[]>(
      /* groq */ `*[_type == "blogPost" && status == "Published" && defined(slug.current)].slug.current`
    );
  return slugs ?? [];
}

export const getBlogPostBySlug = cache(async function getBlogPostBySlug(
  slug: string
): Promise<BlogPostWithContent | null> {
  const { data } = await sanityFetch({
    query: /* groq */ `*[_type == "blogPost" && slug.current == $slug][0]{
      ${blogPostFields},
      "content": coalesce(sections[]{
        ${blogSectionFields}
      }, [])
    }`,
    params: { slug },
  });
  return data as BlogPostWithContent | null;
});

export const getProjects = cache(async function getProjects(): Promise<Project[]> {
  const { data } = await sanityFetch({
    query: /* groq */ `*[_type == "project" && status == "Published"]{
      "id": _id,
      title,
      category,
      description,
      "link": coalesce(link, ""),
      "recent": coalesce(recent, false),
      status,
      "thumbnailUrl": thumbnail.asset->url
    }`,
  });
  return data as Project[];
});

export const getServices = cache(async function getServices(): Promise<Service[]> {
  const { data } = await sanityFetch({
    query: /* groq */ `*[_type == "service" && active == true] | order(order asc){
      "id": _id,
      title,
      description,
      "order": coalesce(order, 0),
      "active": coalesce(active, true)
    }`,
  });
  return data as Service[];
});

export const getSidebarItems = cache(async function getSidebarItems(): Promise<SidebarItem[]> {
  const { data } = await sanityFetch({
    query: /* groq */ `*[_type == "sidebarItem" && visible == true] | order(order asc){
      "id": _id,
      sectionTitle,
      anchor,
      "order": coalesce(order, 0),
      "visible": coalesce(visible, true)
    }`,
  });
  return data as SidebarItem[];
});

export const getProfile = cache(async function getProfile(): Promise<Profile | null> {
  const { data } = await sanityFetch({
    query: /* groq */ `*[_type == "profile"][0]{
      "id": _id,
      "name": coalesce(name, ""),
      "status": coalesce(status, ""),
      "title": coalesce(title, ""),
      "specializations": coalesce(specializations, ""),
      "bio": coalesce(bio, ""),
      "communicationNote": coalesce(communicationNote, ""),
      "quote": coalesce(quote, ""),
      "githubUrl": githubUrl,
      "linkedinUrl": linkedinUrl,
      "cvUrl": cvUrl,
      "cvFileUrl": cvFile.asset->url,
      "profileImageUrl": profileImage.asset->url
    }`,
  });
  return data as Profile | null;
});

export const getInterestAreas = cache(async function getInterestAreas(): Promise<InterestArea[]> {
  const { data } = await sanityFetch({
    query: /* groq */ `*[_type == "interestArea"] | order(order asc){
      "id": _id,
      name,
      "description": coalesce(description, ""),
      "order": coalesce(order, 0)
    }`,
  });
  return data as InterestArea[];
});

export const getJourneyEntries = cache(async function getJourneyEntries(): Promise<JourneyEntry[]> {
  const { data } = await sanityFetch({
    query: /* groq */ `*[_type == "journeyEntry"] | order(order asc){
      "id": _id,
      company,
      "position": coalesce(position, ""),
      "companyUrl": companyUrl,
      "dateStart": coalesce(dateStart, ""),
      "dateEnd": coalesce(dateEnd, ""),
      "order": coalesce(order, 0),
      "responsibilities": coalesce(responsibilities, [])
    }`,
  });
  return data as JourneyEntry[];
});

export const getRecommendations = cache(async function getRecommendations(): Promise<Recommendation[]> {
  const { data } = await sanityFetch({
    query: /* groq */ `*[_type == "recommendation"] | order(order asc){
      "id": _id,
      name,
      "jobTitle": coalesce(jobTitle, ""),
      recommendationText,
      "linkedinUrl": linkedinUrl,
      "profileImageUrl": profileImage.asset->url,
      "span": coalesce(span, false),
      "order": coalesce(order, 0)
    }`,
  });
  return data as Recommendation[];
});
