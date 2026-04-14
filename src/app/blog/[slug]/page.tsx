import {
  getBlogPostBySlug,
  getBlogPosts,
} from "@/notion/queries/queries.notion";
import { AUTHOR, SITE_URL } from "@/config/seo";
import type { Metadata } from "next";
import { BlogContent } from "../blog.content";
import { HeaderSection } from "../header-section";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${slug}`,
      publishedTime: post.publishedDate ?? undefined,
      authors: [AUTHOR.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
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

  const jsonLd = post
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.publishedDate ?? undefined,
        author: {
          "@type": "Person",
          name: AUTHOR.name,
          url: SITE_URL,
        },
        publisher: {
          "@type": "Person",
          name: AUTHOR.name,
          url: SITE_URL,
        },
        url: `${SITE_URL}/blog/${slug}`,
        keywords: post.tags.join(", "),
      }
    : null;

  return (
    <main className="w-full max-w-[1200px] mx-auto px-4 mt-10">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
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
