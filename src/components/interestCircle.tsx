"use client";

import clsx from "clsx";
import { ReactNode } from "react";

interface ServiceProps {
  className?: string;
  description: string;
  icon: ReactNode;
  title: string;
}

export default function InterestAreas({
  description,
  icon,
  title,
  className,
}: ServiceProps) {
  return (
    <div
      className={clsx(
        className,
        "w-64 h-auto p-4 rounded cursor-default flex items-center transition-all duration-300",
      )}
    >
      <div className="flex flex-col items-center justify-center">
        <p>{icon}</p>
        <h2 className="text-xl mt-1 mb-2 text-center">{title}</h2>
        <p className="font-normal text-gray text-center">{description}</p>
      </div>
    </div>
  );
}
