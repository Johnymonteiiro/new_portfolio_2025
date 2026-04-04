import { content_data } from "@/static_data/content";
import { BlogContent } from "../blog.content";
import { HeaderSection } from "../header-section";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = content_data.blog.find((blog) => blog.slug === slug);

  return (
    <main className="w-full max-w-[1200px] mx-auto px-4 mt-10">
      <HeaderSection
        date={content?.data}
        content={content?.content}
        section_title={content?.title}
      />
      <BlogContent content={content?.content || []} />
    </main>
  );
}
