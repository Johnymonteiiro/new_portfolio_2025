"use client";

import { useClickOutside } from "@/hooks/clickOutSide";

import type { BlogTag } from "@/notion/types/types.notion";

type BlogPostSummary = {
  title: string;
  slug: string;
  description: string;
  publishedDate: string | null;
  tags: BlogTag[];
};
import clsx from "clsx";
import { LayoutGrid, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { TagBadges } from "./tag-badges";

interface AllPostsModalProps {
  isOpen: boolean;
  onClose: () => void;
  allPosts: BlogPostSummary[];
}

export function AllPostsModal({
  isOpen,
  onClose,
  allPosts,
}: AllPostsModalProps) {
  const [search, setSearch] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, onClose);

  const filtered = allPosts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div
      ref={modalRef}
      className={clsx(
        "absolute top-full mt-2 right-0 w-[600px] z-30 bg-card-bg border border-border-color rounded-md p-6 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)]",
        isOpen ? "" : "hidden",
      )}
    >
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2">
          <div className="bg-green-flat p-1 rounded-sm">
            <LayoutGrid size={16} className="text-green" />
          </div>
          <h2 className="text-xl">{allPosts.length} Posts</h2>
        </div>
        <button
          onClick={onClose}
          className="text-gray hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>

      <input
        placeholder="Search posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-transparent border-b border-border-color pb-2 mb-5 outline-none text-white placeholder:text-gray focus:border-green transition-colors"
      />

      <ul
        className={clsx(
          "space-y-3 max-h-80 overflow-y-auto pr-[13px]",
          "[&::-webkit-scrollbar]:w-[9px]",
          "[&::-webkit-scrollbar-track]:bg-black [&::-webkit-scrollbar-track]:rounded-full",
          "[&::-webkit-scrollbar-thumb]:bg-gray [&::-webkit-scrollbar-thumb]:rounded-full",
        )}
        style={{ scrollbarWidth: "thin", scrollbarColor: "#939496 #0f1011" }}
      >
        {filtered.length === 0 && (
          <li className="text-gray text-lg">No posts found.</li>
        )}
        {filtered.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              onClick={onClose}
              className="block border border-border-color rounded-md p-4 mr-1 hover:border-green transition-colors duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-lg">{post.title}</span>
                <span className="text-green text-lg shrink-0 ml-2">
                  {post.publishedDate
                    ? new Date(post.publishedDate + "T00:00:00").toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : "—"}
                </span>
              </div>
              <p className="text-gray text-lg line-clamp-2">{post.description}</p>
              <TagBadges tags={post.tags} className="mt-3" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
