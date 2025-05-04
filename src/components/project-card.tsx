import Image from "next/image";
import React from "react";
import { Star } from "lucide-react";

interface ProjectProps {
  title: string;
  description: string;
  category: string;
  thumbnail_image: string;
  recent?: boolean;
  link?: string;
}

export default function ProjectCard({
  description,
  category,
  title,
  thumbnail_image,
  recent,
  link,
}: ProjectProps) {
  return (
    <a
      href={link}
      target="_blank"
      className={`${
        recent ? "col-span-2 w-full" : "max-w-[450px]"
      } border rounded-md border-border-color p-5 w-full`}
    >
      <div
        className={`${
          recent ? "h-[400px]" : "h-[250px]"
        } relative w-full mb-7 overflow-hidden rounded-md`}
      >
        <Image
          src={thumbnail_image}
          alt={title}
          fill
          className="object-cover"
          quality={100}
          priority={recent}
        />
      </div>

      <div className="flex items-center justify-between pt-3 pb-8">
        <h2 className="text-xl">{title}</h2>

        <div className="flex">
          {recent && (
            <div
              className={`flex bg-yellow-flat items-center mr-2 w-auto text-sm rounded-md p-1`}
            >
              <Star size={18} className="text-yellow" />
              <p className="text-yellow ml-1">RECENT</p>
            </div>
          )}
          <div
            className={`${
              category === "UI DESIGN"
                ? "bg-purple-flat text-purple"
                : "bg-green-flat text-green"
            } w-auto flex items-center text-sm rounded-md p-1`}
          >
            {category}
          </div>
        </div>
      </div>

      <p className="font-normal text-gray">{description}</p>
    </a>
  );
}
