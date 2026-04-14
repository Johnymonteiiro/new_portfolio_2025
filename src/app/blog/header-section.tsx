"use client";

import { TagBadges } from "@/components/tag-badges";
import { CalendarIcon } from "@/components/ui/icon/calendar";
import { formatDate } from "@/lib/format-date";
import { calculateReadingTime } from "@/lib/reading-time";
import type { BlogTag } from "@/notion/types/types.notion";
import { Clock1, MoveLeft } from "lucide-react";

interface BlogContentProps {
  date?: Date;
  section_title?: string;
  tags?: BlogTag[];
  content?: {
    sub_title: string;
    text: string;
    language: string;
    code: string | null;
  }[];
}

export function HeaderSection({
  content,
  date,
  section_title,
  tags = [],
}: BlogContentProps) {
  const formated_date = formatDate(date);

  const readingTime = content ? calculateReadingTime(content) : 1;

  return (
    <section>
      <a
        href="/"
        className="flex items-center w-20 text-gray hover:text-white transition-all duration-200 cursor-pointer"
      >
        <MoveLeft className="mr-3" />
        Home
      </a>

      <div className="py-10 px-6 mt-5 bg-card-bg rounded-md">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">{section_title}</h1>

          <div className="flex items-center">
            <div className="flex items-center">
              <CalendarIcon size={18} className="stroke-green" />
              <p className="ml-2">{formated_date}</p>
            </div>
            <div className="flex items-center ml-5">
              <Clock1 size={18} className="text-green" />
              <p className="ml-2">{readingTime + " min"}</p>
            </div>
          </div>
        </div>

        <TagBadges tags={tags} className="mt-4" />
      </div>
    </section>
  );
}
