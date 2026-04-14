import {
  getBlogPostBySlug,
  getBlogPosts,
} from "@/notion/queries/queries.notion";
import { BlogContent } from "../blog.content";
import { HeaderSection } from "../header-section";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [post, allPosts] = await Promise.all([
    getBlogPostBySlug(slug),
    getBlogPosts(),
  ]);

  const content = post?.content.map((s) => ({
    sub_title: s.subTitle,
    text: s.text,
    language: s.language,
    code: s.code,
  }));

  const allPostsSummary = allPosts.map((p) => ({
    title: p.title,
    slug: p.slug,
    description: p.description,
    publishedDate: p.publishedDate,
    tags: p.tags,
  }));

  return (
    <main className="w-full max-w-[1200px] mx-auto px-4 mt-10">
      <HeaderSection
        date={post?.publishedDate ? new Date(post.publishedDate + "T00:00:00") : undefined}
        content={content}
        section_title={post?.title}
        tags={post?.tags}
      />
      <BlogContent content={content || []} allPosts={allPostsSummary} />
    </main>
  );
}
