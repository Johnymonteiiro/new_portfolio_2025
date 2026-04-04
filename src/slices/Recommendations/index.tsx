import { isFilled, type ImageField, type KeyTextField, type LinkField, type RichTextField } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { LinkedinIcon } from "@/components/ui/icon/linkedin";

type RecommendationsSlicePrimary = {
  section_title: KeyTextField;
};

type RecommendationsSliceItem = {
  recommender_name: KeyTextField;
  recommender_role: KeyTextField;
  recommender_photo: ImageField;
  recommender_linkedin: LinkField;
  recommendation_text: RichTextField;
};

type RecommendationsSlice = {
  slice_type: "recommendations";
  primary: RecommendationsSlicePrimary;
  items: RecommendationsSliceItem[];
};

export default function Recommendations({
  slice,
}: {
  slice: RecommendationsSlice;
}) {
  const { primary, items } = slice;

  return (
    <div className="mt-32" id="Recommendations">
      <h2 className="text-2xl mb-12">
        {primary.section_title || "Recommendations"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center">
        {items.map((item, index) => {
          const isLast =
            index === items.length - 1 && items.length % 2 !== 0;

          return (
            <div
              key={index}
              className={`bg-card-bg border rounded-md border-border-color p-5 w-full${isLast ? " md:col-span-2 place-self-center" : ""}`}
            >
              <div className="flex items-center justify-between pb-8">
                <div className="flex">
                  <div className="w-12 h-12 border-2 border-border-color relative overflow-hidden rounded-full">
                    {isFilled.image(item.recommender_photo) ? (
                      <PrismicNextImage
                        field={item.recommender_photo}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-card-bg" />
                    )}
                  </div>

                  <div className="pl-3">
                    <h2 className="text-lg">{item.recommender_name}</h2>
                    <p className="text-sm text-gray">{item.recommender_role}</p>
                  </div>
                </div>

                {isFilled.link(item.recommender_linkedin) && (
                  <PrismicNextLink field={item.recommender_linkedin}>
                    <LinkedinIcon className="fill-gray hover:fill-white transition-all duration-200 cursor-pointer" />
                  </PrismicNextLink>
                )}
              </div>

              <div className="text-gray">
                <PrismicRichText field={item.recommendation_text} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
