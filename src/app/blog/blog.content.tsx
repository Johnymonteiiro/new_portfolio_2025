"use client";

import Sidebar from "@/components/sidebar";
import { useActiveLink } from "@/hooks/useActive";
import { CodeBlock } from "./code";

import type { RichTextSegment } from "@/notion/types/types.notion";
import type { BlogPostSummary } from "@/types/blog";

interface BlogContentProps {
  content: {
    sub_title: string;
    text: RichTextSegment[];
    language: string;
    code?: string | null;
  }[];
  allPosts?: BlogPostSummary[];
}

function RichText({ segments }: { segments: RichTextSegment[] }) {
  return (
    <>
      {segments.map((seg, i) => {
        if (seg.content === "\n") return <br key={i} />;
        if (seg.code)
          return (
            <code
              key={i}
              className="bg-[#1e1e1e] text-green font-mono text-sm px-1.5 py-0.5 rounded border border-[#3a3a3a]"
            >
              {seg.content}
            </code>
          );
        if (seg.bold) return <strong key={i}>{seg.content}</strong>;
        if (seg.italic) return <em key={i}>{seg.content}</em>;
        return <span key={i}>{seg.content}</span>;
      })}
    </>
  );
}

export function BlogContent({ content, allPosts }: BlogContentProps) {
  const [refCallback, active] = useActiveLink(content?.[0]?.sub_title ?? "");
  return (
    <section className="mt-16 flex relative">
      <div className="flex-1 min-w-0">
        {content?.map((content, index) => (
          <div className="max-w-[900px] w-full" key={index}>
            <h2 className="text-xl" id={content.sub_title} ref={refCallback}>
              {content.sub_title}
            </h2>
            <p className="mt-5 font-light text-gray mb-8">
              <RichText segments={content.text} />
            </p>
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
