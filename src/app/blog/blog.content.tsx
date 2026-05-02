"use client";

import Sidebar from "@/components/sidebar";
import { useActiveLink } from "@/hooks/useActive";
import { CodeBlock } from "./code";

import { PortableText, type PortableTextBlock, type PortableTextComponents } from "@portabletext/react";
import type { BlogPostSummary } from "@/types/blog";

interface BlogContentProps {
  content: {
    sub_title: string;
    body: PortableTextBlock[];
    language: string;
    code?: string | null;
  }[];
  allPosts?: BlogPostSummary[];
}

const portableTextComponents: PortableTextComponents = {
  marks: {
    code: ({ children }) => (
      <code className="bg-[#1e1e1e] text-green font-mono text-sm px-1.5 py-0.5 rounded border border-[#3a3a3a]">
        {children}
      </code>
    ),
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
  },
  block: {
    normal: ({ children }) => (
      <p className="mt-5 font-light text-gray mb-8">{children}</p>
    ),
  },
};

export function BlogContent({ content, allPosts }: BlogContentProps) {
  const [refCallback, active] = useActiveLink(content?.[0]?.sub_title ?? "");
  return (
    <section className="mt-16 flex relative">
      <div className="flex-1 min-w-0">
        {content?.map((section, index) => (
          <div className="max-w-[900px] w-full" key={index}>
            <h2 className="text-xl" id={section.sub_title} ref={refCallback}>
              {section.sub_title}
            </h2>
            <PortableText value={section.body} components={portableTextComponents} />
            {section.code && (
              <CodeBlock language={section.language} code={section.code} />
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
