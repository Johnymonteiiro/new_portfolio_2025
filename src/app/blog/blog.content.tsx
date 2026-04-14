"use client";

import Sidebar from "@/components/sidebar";
import { useActiveLink } from "@/hooks/useActive";
import { CodeBlock } from "./code";

import type { BlogTag } from "@/notion/types/types.notion";

type BlogPostSummary = {
  title: string;
  slug: string;
  description: string;
  publishedDate: string | null;
  tags: BlogTag[];
};

interface BlogContentProps {
  content: {
    sub_title: string;
    text: string;
    language: string;
    code?: string | null;
  }[];
  allPosts?: BlogPostSummary[];
}

export function BlogContent({ content, allPosts }: BlogContentProps) {
  const [refCallback, active] = useActiveLink(content?.[0]?.sub_title ?? "");
  return (
    <section className="mt-16 flex relative">
      <div>
        {content?.map((content, index) => (
          <div className="max-w-[900px]" key={index}>
            <h2 className="text-xl" id={content.sub_title} ref={refCallback}>
              {content.sub_title}
            </h2>
            <p className="mt-5 font-light text-gray mb-8">{content.text}</p>
            {content.code && (
              <CodeBlock language={content.language} code={content.code} />
            )}
          </div>
        ))}
      </div>

      <Sidebar
        active={active}
        allPosts={allPosts}
        sections={content?.map((item) => ({
          section_title: item.sub_title,
        }))}
      />
    </section>
  );
}
