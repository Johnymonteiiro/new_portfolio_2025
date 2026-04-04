"use client";

import { CalendarIcon } from "@/components/ui/icon/calendar";
import { Clock1, MoveLeft } from "lucide-react";
import { useMemo } from "react";

interface BlogContentProps {
  date?: Date;
  section_title?: string;
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
}: BlogContentProps) {
  const formated_date = date?.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const readingTime = useMemo(() => {
    const wordsPerMinute = 225;
    const fullContent = content?.reduce((acc, curr) => {
      return acc + " " + curr.text + " " + (curr.code || "");
    }, "");

    const wordCount = Number(fullContent?.trim().split(/\s+/).length);
    return Math.ceil(wordCount / wordsPerMinute);
  }, [content]);

  return (
    <section>
      <a
        href="/"
        className="flex items-center w-20 text-gray hover:text-white transition-all duration-200 cursor-pointer"
      >
        <MoveLeft className="mr-3" />
        Home
      </a>

      <div className="py-10 px-6 mt-5 bg-card-bg rounded-md flex items-center justify-between">
        <h1 className="text-2xl">{section_title}</h1>

        <div className="flex items-center">
          <li className="flex items-center">
            <CalendarIcon size={18} className="stroke-green" />
            <p className="ml-2">{formated_date}</p>
          </li>
          <li className="flex items-center ml-5">
            <Clock1 size={18} className="text-green" />
            <p className="ml-2">{readingTime + " min"}</p>
          </li>
        </div>
      </div>
    </section>
  );
}
