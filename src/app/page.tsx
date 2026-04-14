import HomeContent from "@/components/home-content";
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

export default async function Home() {
  const [posts, projects, services, sidebarItems, profile, interests, journey, recommendations] =
    await Promise.all([
      getBlogPosts(),
      getProjects(),
      getServices(),
      getSidebarItems(),
      getProfile(),
      getInterestAreas(),
      getJourneyEntries(),
      getRecommendations(),
    ]);

  return (
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
  );
}
