import { isFilled, type ImageField, type KeyTextField, type LinkField } from "@prismicio/client";
import ProjectCard from "@/components/project-card";

type ProjectCategory = "WEB DEVELOPMENT" | "UI DESIGN";

type ProjectsSlicePrimary = {
  section_title: KeyTextField;
};

type ProjectsSliceItem = {
  title: KeyTextField;
  description: KeyTextField;
  category: ProjectCategory | null;
  thumbnail: ImageField;
  link: LinkField;
  is_recent: boolean | null;
};

type ProjectsSlice = {
  slice_type: "projects";
  primary: ProjectsSlicePrimary;
  items: ProjectsSliceItem[];
};

export default function Projects({ slice }: { slice: ProjectsSlice }) {
  const { primary, items } = slice;

  return (
    <div id="Projects" className="mt-32">
      <h2 className="text-2xl">{primary.section_title || "Projects"}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8">
        {items.map((item, index) => (
          <ProjectCard
            key={index}
            title={item.title ?? ""}
            description={item.description ?? ""}
            category={item.category ?? "WEB DEVELOPMENT"}
            thumbnail_image={
              isFilled.image(item.thumbnail) ? item.thumbnail.url : ""
            }
            recent={item.is_recent ?? false}
            link={
              isFilled.link(item.link)
                ? (item.link as { url: string }).url
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}
