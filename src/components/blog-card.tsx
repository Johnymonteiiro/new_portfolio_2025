import type { BlogTag } from "@/notion/types/types.notion";
import Link from "next/link";
import { TagBadges } from "./tag-badges";
import { BookIcon } from "./ui/icon/book";

interface BlogCardProps {
  date: Date;
  description: string;
  slug: string;
  section_title: string;
  tags?: BlogTag[];
}

export default function BlogCard({
  date,
  description,
  slug,
  section_title,
  tags = [],
}: BlogCardProps) {
  const formated_date = date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="border rounded-md border-border-color p-5 w-full mb-6 transition-all duration-200 cursor-pointer hover:border-green">
      <Link href={`/blog/${slug}`}>
        <div className="flex items-center justify-between pb-7">
          <div className="flex items-center">
            <div className="flex items-center mr-2 justify-center w-8 h-8 rounded-sm bg-green-flat">
              <BookIcon size={24} className="stroke-green" />
            </div>
            <h3 className="text-xl">{section_title}</h3>
          </div>

          <p className="text-gray">{formated_date}</p>
        </div>

        <p className="font-normal text-gray line-clamp-2">{description}</p>
        <TagBadges tags={tags} className="mt-4" />
      </Link>
    </div>
  );
}
