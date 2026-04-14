"use client";

import BlogCard from "@/components/blog-card";
import JourneyCard from "@/components/journey-card";
import ProfileSection from "@/components/profile";
import ProjectCard from "@/components/project-card";
import RecommendationCard from "@/components/recommendation-card";
import ServiceCard from "@/components/service-card";
import Sidebar from "@/components/sidebar";
import { MonitorIcon } from "@/components/ui/icon/monitor";
import { PenIcon } from "@/components/ui/icon/pen";
import { useActiveLink } from "@/hooks/useActive";
import type {
  BlogPost,
  InterestArea,
  JourneyEntry,
  Profile,
  Project,
  Recommendation,
  Service,
  SidebarItem,
} from "@/notion/types/types.notion";
import { type ReactNode } from "react";

const serviceIcons: { icon: ReactNode; iconBg: "green-flat" | "purple-flat" | "gray" }[] = [
  { icon: <MonitorIcon size={25} className="stroke-green" />, iconBg: "green-flat" },
  { icon: <PenIcon size={25} className="stroke-purple" />, iconBg: "purple-flat" },
];

interface HomeContentProps {
  posts: BlogPost[];
  projects: Project[];
  services: Service[];
  sidebarItems: SidebarItem[];
  profile: Profile | null;
  interests: InterestArea[];
  journey: JourneyEntry[];
  recommendations: Recommendation[];
}

export default function HomeContent({
  posts,
  projects,
  services,
  sidebarItems,
  profile,
  interests,
  journey,
  recommendations,
}: HomeContentProps) {
  const [refCallback, active] = useActiveLink("About");

  const latestPosts = [...posts]
    .sort((a, b) => {
      const dateA = a.publishedDate ? new Date(a.publishedDate).getTime() : 0;
      const dateB = b.publishedDate ? new Date(b.publishedDate).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 3);

  return (
    <main
      id="main-container"
      className="max-w-[1400px] flex mx-auto px-4 relative"
    >
      <section className="max-w-[1100px]">
        {profile && (
          <ProfileSection
            refCallback={refCallback}
            profile={profile}
            interests={interests}
          />
        )}

        <div className="mt-32" id="Service" ref={refCallback}>
          <h2 className="text-2xl">Service</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                iconBg={serviceIcons[index]?.iconBg ?? "gray"}
                icon={serviceIcons[index]?.icon ?? null}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>

        <div id="Projects" ref={refCallback} className="mt-32">
          <h2 className="text-2xl">Projects</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                category={project.category}
                recent={project.recent}
                link={project.link}
                thumbnail_image={project.thumbnailUrl ?? ""}
                description={project.description}
              />
            ))}
          </div>
        </div>

        <div className="mt-32" id="My journey" ref={refCallback}>
          <h2 className="text-2xl mb-12">My journey</h2>
          {journey.map((entry) => (
            <JourneyCard key={entry.id} entry={entry} />
          ))}
        </div>

        <div className="mt-32" id="Latest blog" ref={refCallback}>
          <h2 className="text-2xl mb-12">Latest blog</h2>
          {latestPosts.map((post) => (
            <BlogCard
              key={post.id}
              section_title={post.title}
              slug={post.slug}
              description={post.description}
              tags={post.tags}
              date={post.publishedDate ? new Date(post.publishedDate + "T00:00:00") : new Date()}
            />
          ))}
        </div>

        <div className="mt-32" id="Recommendations" ref={refCallback}>
          <h2 className="text-2xl mb-12">Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center">
            {recommendations.map((rec) => (
              <RecommendationCard
                key={rec.id}
                rec={rec}
                className={rec.span ? "md:col-span-2 place-self-center" : undefined}
              />
            ))}
          </div>
        </div>
      </section>

      <Sidebar
        sections={sidebarItems.map((item) => ({ section_title: item.sectionTitle }))}
        active={active}
        className="mt-20"
      />
    </main>
  );
}
