import { SquareArrowOutUpRight, SquareCheckBig } from "lucide-react";
import React from "react";
import { FlagIcon } from "./ui/icon/flag";
import type { JourneyEntry } from "@/notion/types/types.notion";

export default function JourneyCard({ entry }: { entry: JourneyEntry }) {
  return (
    <div className="pl-4">
      <div className="relative border-l-2 border-border-color pl-8 pb-12">
        <div className="w-9 h-9 absolute -left-5 -top-1 rounded-full p-1 flex items-center justify-center bg-purple-flat">
          <FlagIcon className="stroke-purple" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h2 className="text-xl pr-2">{entry.company}</h2>
            <a href={entry.companyUrl ?? ""} target="_blank" rel="noopener noreferrer">
              <SquareArrowOutUpRight
                className="hover:stroke-gray transition-all duration-200 cursor-pointer"
                size={18}
              />
            </a>
          </div>

          <p className="text-gray">{entry.dateStart}-{entry.dateEnd}</p>
        </div>

        <div className="my-5">
          <h2 className="font-semibold text-gray">
            Position:{" "}
            <span className="font-normal text-green">{entry.position}</span>
          </h2>
        </div>

        <div>
          <h2 className="font-semibold text-gray">Responsibilities:</h2>
          <div className="pt-3">
            {entry.responsibilities.map((resp, i) => (
              <li key={i} className="flex items-center pt-1 list-none">
                <SquareCheckBig size={30} className="text-green pr-3" />
                <p className="text-gray">{resp}</p>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
