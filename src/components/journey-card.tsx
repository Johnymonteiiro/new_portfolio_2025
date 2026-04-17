import type { JourneyEntry } from "@/notion/types/types.notion";
import { SquareArrowOutUpRight, SquareCheckBig } from "lucide-react";
import { FlagIcon } from "./ui/icon/flag";

export default function JourneyCard({ entry }: { entry: JourneyEntry }) {
  return (
    <div className="pl-4">
      <div className="relative border-l-2 border-border-color pl-8 pb-12">
        <div className="w-9 h-9 absolute -left-5 -top-1 rounded-full p-1 flex items-center justify-center bg-purple-flat">
          <FlagIcon className="stroke-purple" />
        </div>
        <div className="flex items-center justify-between">
          <a
            className="flex items-center"
            href={entry.companyUrl ?? ""}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="text-xl pr-2">{entry.company}</h2>
            <p>
              <SquareArrowOutUpRight className="" size={18} />
            </p>
          </a>

          <p className="text-gray">
            {entry.dateStart}-{entry.dateEnd}
          </p>
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
