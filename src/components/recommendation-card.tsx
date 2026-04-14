import clsx from "clsx";
import Image from "next/image";
import { User } from "lucide-react";
import { LinkedinIcon } from "./ui/icon/linkedin";
import type { Recommendation } from "@/notion/types/types.notion";

export default function RecommendationCard({
  rec,
  className,
}: {
  rec: Recommendation;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        className,
        "bg-card-bg border rounded-md border-border-color p-5 w-full"
      )}
    >
      <div className="flex items-center justify-between pb-8">
        <div className="flex">
          <div className="w-12 h-12 border-2 border-border-color relative overflow-hidden rounded-full bg-card-bg flex items-center justify-center">
            {rec.profileImageUrl ? (
              <Image
                src={rec.profileImageUrl}
                alt={rec.name}
                fill
                className="object-cover"
                quality={100}
              />
            ) : (
              <User size={28} className="text-gray" />
            )}
          </div>

          <div className="pl-3">
            <h2 className="text-lg">{rec.name}</h2>
            <p className="text-sm text-gray">{rec.jobTitle}</p>
          </div>
        </div>

        <div>
          {rec.linkedinUrl ? (
            <a href={rec.linkedinUrl} target="_blank" rel="noopener noreferrer">
              <LinkedinIcon className="fill-gray hover:fill-white transition-all duration-200 cursor-pointer" />
            </a>
          ) : (
            <LinkedinIcon className="fill-gray hover:fill-white transition-all duration-200 cursor-pointer" />
          )}
        </div>
      </div>

      <p className="text-gray">{rec.recommendationText}</p>
    </div>
  );
}
