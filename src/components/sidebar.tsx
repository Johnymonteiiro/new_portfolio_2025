"use client";

import type { BlogPostSummary } from "@/types/prismic";
import clsx from "clsx";
import { LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import { AllPostsModal } from "./all-posts-modal";

interface SidebarProps {
  className?: string;
  active?: string;
  sections?: {
    section_title: string;
  }[];
  allPosts?: BlogPostSummary[];
}

export default function Sidebar({
  className,
  sections,
  active,
  allPosts,
}: SidebarProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <aside
        className={clsx(className, "relative flex-1 flex justify-end pl-4")}
      >
        <div className="sticky top-4 self-start w-52 border-l-2 bg-black/10 backdrop-blur-2xl z-10 border-border-color pl-3">
          <div className="flex items-center space-x-2 mb-4">
            <List size={24} className="text-gray" />
            <h2 className="text-lg">On this page</h2>
          </div>

          <ul className="space-y-2">
            {sections?.map((section, index) => (
              <a
                href={`#${section.section_title}`}
                key={index}
                className={`${
                  active === section.section_title ? "text-green" : "text-gray"
                } hover:text-white cursor-pointer flex flex-col text-lg`}
              >
                {section.section_title}
              </a>
            ))}
          </ul>

          {allPosts && (
            <div className="relative">
              <button
                onClick={() => setModalOpen((prev) => !prev)}
                className="mt-6 pt-4 border-t border-border-color w-full flex items-center gap-2 text-gray hover:text-white transition-colors duration-200 text-lg"
              >
                <LayoutGrid size={14} className="stroke-green" />
                All posts
              </button>
              <AllPostsModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                allPosts={allPosts}
              />
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
