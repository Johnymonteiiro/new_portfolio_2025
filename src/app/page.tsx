"use client";

import JourneyCard from "@/components/journey-card";
import Profile from "@/components/profile";
import ProjectCard from "@/components/project-card";
import ServiceCard from "@/components/service-card";
import { MonitorIcon } from "@/components/ui/icon/monitor";
import { PenIcon } from "@/components/ui/icon/pen";
import { content_data } from "@/static_data/content";

import BlogCard from "@/components/blog-card";
import RecommendationCard from "@/components/recommendation-card";
import Sidebar from "@/components/sidebar";
import { useActiveLink } from "@/hooks/useActive";

export default function Home() {
  const [refCallback, active] = useActiveLink();

  return (
    <main
      id="main-container"
      className="max-w-[1400px] flex mx-auto px-4 relative"
    >
      <section className="max-w-[1100px]">
        <Profile refCallback={refCallback} />

        <div className="mt-32" id="Service" ref={refCallback}>
          <h2 className="text-2xl">Service</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8">
            <ServiceCard
              iconBg="green-flat"
              icon={<MonitorIcon size={25} className="stroke-green" />}
              title={content_data.service.service_1.title}
              description={content_data.service.service_1.description}
            />
            <ServiceCard
              iconBg="purple-flat"
              icon={<PenIcon size={25} className="stroke-purple" />}
              title={content_data.service.service_2.title}
              description={content_data.service.service_2.description}
            />
          </div>
        </div>

        <div id="Projects" ref={refCallback} className="mt-32">
          <h2 className="text-2xl">Projects</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8">
            {content_data.projects.map((project, index) => {
              return (
                <ProjectCard
                  key={index}
                  title={project.title}
                  category={project.category}
                  recent={project.recent}
                  link={project.link}
                  thumbnail_image={project.thumbnail_image.src}
                  description={project.description}
                />
              );
            })}
          </div>
        </div>

        <div className="mt-32" id="My journey" ref={refCallback}>
          <h2 className="text-2xl mb-12">My journey</h2>
          <JourneyCard />
          <JourneyCard />
        </div>

        <div className="mt-32" id="Latest blog" ref={refCallback}>
          <h2 className="text-2xl mb-12">Latest blog</h2>
          {content_data.blog
            .map((blog, index) => {
              return (
                <BlogCard
                  key={index}
                  section_title={blog.title}
                  slug={blog.slug}
                  description={blog.description}
                  date={blog.data}
                />
              );
            })
            .slice(0, 3)}
        </div>

        <div className="mt-32" id="Recommendations" ref={refCallback}>
          <h2 className="text-2xl mb-12">Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center">
            <RecommendationCard />
            <RecommendationCard />
            <RecommendationCard className="md:col-span-2 place-self-center" />
          </div>
        </div>
      </section>

      <Sidebar
        sections={content_data.sidebar}
        active={active}
        className="mt-20"
      />
    </main>
  );
}
