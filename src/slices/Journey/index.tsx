import { isFilled, type KeyTextField, type LinkField, type RichTextField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { SquareArrowOutUpRight, SquareCheckBig } from "lucide-react";
import { FlagIcon } from "@/components/ui/icon/flag";

type JourneySlicePrimary = {
  section_title: KeyTextField;
};

type JourneySliceItem = {
  company_name: KeyTextField;
  company_url: LinkField;
  period: KeyTextField;
  position: KeyTextField;
  responsibilities: RichTextField;
};

type JourneySlice = {
  slice_type: "journey";
  primary: JourneySlicePrimary;
  items: JourneySliceItem[];
};

export default function Journey({ slice }: { slice: JourneySlice }) {
  const { primary, items } = slice;

  return (
    <div className="mt-32" id="My journey">
      <h2 className="text-2xl mb-12">
        {primary.section_title || "My journey"}
      </h2>

      {items.map((item, index) => (
        <div key={index} className="pl-4">
          <div className="relative border-l-2 border-border-color pl-8 pb-12">
            <div className="w-9 h-9 absolute -left-5 -top-1 rounded-full p-1 flex items-center justify-center bg-purple-flat">
              <FlagIcon className="stroke-purple" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <h2 className="text-xl pr-2">{item.company_name}</h2>
                {isFilled.link(item.company_url) && (
                  <PrismicNextLink field={item.company_url}>
                    <SquareArrowOutUpRight
                      className="hover:stroke-gray transition-all duration-200 cursor-pointer"
                      size={18}
                    />
                  </PrismicNextLink>
                )}
              </div>
              <p className="text-gray">{item.period}</p>
            </div>

            <div className="my-5">
              <h2 className="font-semibold text-gray">
                Position:{" "}
                <span className="font-normal text-green">{item.position}</span>
              </h2>
            </div>

            {isFilled.richText(item.responsibilities) && (
              <div>
                <h2 className="font-semibold text-gray">Responsibilities:</h2>
                <div className="pt-3">
                  {item.responsibilities
                    .filter((block) => block.type === "list-item")
                    .map((block, i) => (
                      <li key={i} className="flex items-center pt-1 list-none">
                        <SquareCheckBig size={30} className="text-green pr-3" />
                        <p className="text-gray">
                          {"text" in block ? block.text : ""}
                        </p>
                      </li>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
