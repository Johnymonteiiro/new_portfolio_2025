"use client";

import clsx from "clsx";
import { LayoutGrid, List, X } from "lucide-react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import type { BlogPostSummary } from "@/types/prismic";

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
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!modalOpen) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [modalOpen]);

  const filtered = allPosts?.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <aside className={clsx(className, "relative flex-1 flex justify-end pl-4")}>
        <div className="fixed w-52 border-l-2 bg-black/10 backdrop-blur-2xl z-10 border-border-color pl-3">
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
                } hover:text-white cursor-pointer flex flex-col text-sm`}
              >
                {section.section_title}
              </a>
            ))}
          </ul>

          {allPosts && (
            <button
              onClick={() => {
                setSearch("");
                setModalOpen(true);
              }}
              className="mt-6 pt-4 border-t border-border-color w-full flex items-center gap-2 text-gray hover:text-white transition-colors duration-200 text-sm"
            >
              <LayoutGrid size={14} />
              All posts
            </button>
          )}
        </div>
      </aside>

      {mounted &&
        modalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setModalOpen(false)}
          >
            <div
              className="bg-[#0f1011] border border-border-color rounded-lg w-full max-w-lg mx-4 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl">All Posts</h2>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-gray hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              <input
                autoFocus
                placeholder="Search posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent border-b border-border-color pb-2 mb-5 outline-none text-white placeholder:text-gray focus:border-green transition-colors"
              />

              <ul className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {filtered?.length === 0 && (
                  <li className="text-gray text-sm">No posts found.</li>
                )}
                {filtered?.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      onClick={() => setModalOpen(false)}
                      className="text-gray hover:text-white transition-colors duration-200 text-sm block py-1"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
