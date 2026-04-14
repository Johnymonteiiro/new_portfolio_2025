import HomeContent from "@/components/home-content";
import { DESCRIPTION, SITE_URL } from "@/config/seo";
import {
  getBlogPosts,
  getInterestAreas,
  getJourneyEntries,
  getProfile,
  getProjects,
  getRecommendations,
  getServices,
  getSidebarItems,
} from "@/notion/queries/queries.notion";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const title = profile?.name ?? "Jhony Monteiro";
  const description = profile?.bio ?? DESCRIPTION;

  return {
    title,
    description,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      title: `${title} | Software Engineer`,
      description,
      url: SITE_URL,
    },
    twitter: {
      title: `${title} | Software Engineer`,
      description,
    },
  };
}

export default async function Home() {
  const [
    posts,
    projects,
    services,
    sidebarItems,
    profile,
    interests,
    journey,
    recommendations,
  ] = await Promise.all([
    getBlogPosts(),
    getProjects(),
    getServices(),
    getSidebarItems(),
    getProfile(),
    getInterestAreas(),
    getJourneyEntries(),
    getRecommendations(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile?.name ?? "Jhony Monteiiro",
    jobTitle: profile?.title ?? "Software Engineer",
    url: SITE_URL,
    description: profile?.bio,
    sameAs: [profile?.linkedinUrl, profile?.githubUrl].filter(Boolean),
    knowsAbout: [
      "Next.js",
      "React",
      "Node.js",
      "NestJS",
      "TypeScript",
      "Python",
      "PostgreSQL",
      "Inteligência Artificial",
      "Agentes de IA",
      "LangChain",
      "UI Design",
      "Fullstack Development",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeContent
        posts={posts}
        projects={projects}
        services={services}
        sidebarItems={sidebarItems}
        profile={profile}
        interests={interests}
        journey={journey}
        recommendations={recommendations}
      />
    </>
  );
}
