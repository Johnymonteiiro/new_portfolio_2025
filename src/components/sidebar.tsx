"use client";

import { List } from "lucide-react";
import clsx from "clsx";

interface SidebarProps {
  className?: string;
  active?: string;
  sections?: {
    section_title: string;
  }[];
}

export default function Sidebar({ className, sections, active }: SidebarProps) {
  return (
    <aside className={clsx(className, "relative flex-1 flex justify-end pl-4")}>
      <div className="fixed w-52 border-l-2 border-border-color pl-3">
        <div className="flex items-center space-x-2 mb-4">
          <List size={24} className="text-gray" />
          <h2 className="text-lg">On this page</h2>
        </div>

        <ul className="space-y-2">
          {sections?.map((section, index) => {
            return (
              <a
                href={`#${section.section_title}`}
                key={index}
                className={` ${
                  active === section.section_title ? "text-green" : "text-gray"
                } hover:text-white cursor-pointer flex flex-col`}
              >
                {section.section_title}
              </a>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
