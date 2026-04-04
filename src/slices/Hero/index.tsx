import { isFilled, type ImageField, type KeyTextField, type LinkField, type RichTextField } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { CommentIcon } from "@/components/ui/icon/comment";
import { GithubIcon } from "@/components/ui/icon/github";
import { IAcon } from "@/components/ui/icon/ia";
import { InnovationIcon } from "@/components/ui/icon/innovation";
import { InstagramIcon } from "@/components/ui/icon/insta";
import { LinkedinIcon } from "@/components/ui/icon/linkedin";
import { MessageIcon } from "@/components/ui/icon/message";
import { FileIcon } from "@/components/ui/icon/file";
import { SaasIcon } from "@/components/ui/icon/saas";
import InterestCircle from "@/components/interestCircle";

type HeroSlicePrimary = {
  name: KeyTextField;
  role: KeyTextField;
  tech_stack: KeyTextField;
  bio: RichTextField;
  quote: KeyTextField;
  profile_image: ImageField;
  available: boolean | null;
  email_url: LinkField;
  instagram_url: LinkField;
  linkedin_url: LinkField;
  github_url: LinkField;
  resume_url: LinkField;
};

type HeroSliceItem = {
  interest_title: KeyTextField;
  interest_description: KeyTextField;
  interest_icon: "saas" | "ai" | "innovation" | null;
};

type HeroSlice = {
  slice_type: "hero";
  primary: HeroSlicePrimary;
  items: HeroSliceItem[];
};

const iconMap: Record<string, React.ReactNode> = {
  saas: <SaasIcon size={40} className="fill-green" />,
  ai: <IAcon size={40} className="fill-purple" />,
  innovation: <InnovationIcon size={40} className="fill-yellow" />,
};

const circleClassMap = [
  "border border-border-color hover:bg-card-bg hover:shadow-normal hover:z-20",
  "bg-card-bg shadow-normal border md:absolute border-border-color",
  "border border-border-color hover:bg-card-bg hover:shadow-normal hover:z-20",
];

export default function Hero({ slice }: { slice: HeroSlice }) {
  const { primary, items } = slice;

  return (
    <div id="About">
      <div className="bg-card-bg flex shadow-normal rounded-md relative mt-20 p-6">
        <div>
          {isFilled.image(primary.profile_image) && (
            <PrismicNextImage
              field={primary.profile_image}
              width={134}
              height={134}
              className="rounded-md border-4 border-border-color"
            />
          )}

          {primary.available && (
            <div className="flex items-center space-x-2 pt-3">
              <div className="relative w-2 h-2 lg:w-7 lg:h-7">
                <div className="absolute inset-0 rounded-full bg-green-flat animate-multiPulse"></div>
                <div className="absolute inset-0 rounded-full bg-green animate-multiPulse delay-150"></div>
                <div className="absolute inset-2 rounded-full bg-green"></div>
              </div>
              <span className="text-white text-sm">Available now!</span>
            </div>
          )}
        </div>

        <div className="ml-7 flex-1">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-medium">{primary.name}</h1>
            <div className="flex items-center">
              {isFilled.link(primary.email_url) && (
                <PrismicNextLink field={primary.email_url}>
                  <MessageIcon className="stroke-gray hover:stroke-white transition-all duration-200 cursor-pointer" />
                </PrismicNextLink>
              )}
              {isFilled.link(primary.instagram_url) && (
                <PrismicNextLink field={primary.instagram_url}>
                  <InstagramIcon className="fill-gray mx-3 hover:fill-white transition-all duration-200 cursor-pointer" />
                </PrismicNextLink>
              )}
              {isFilled.link(primary.linkedin_url) && (
                <PrismicNextLink field={primary.linkedin_url}>
                  <LinkedinIcon className="fill-gray hover:fill-white transition-all duration-200 cursor-pointer" />
                </PrismicNextLink>
              )}
              {isFilled.link(primary.github_url) && (
                <PrismicNextLink field={primary.github_url}>
                  <GithubIcon className="fill-gray mx-3 hover:fill-white transition-all duration-200 cursor-pointer" />
                </PrismicNextLink>
              )}
              {isFilled.link(primary.resume_url) && (
                <PrismicNextLink field={primary.resume_url}>
                  <FileIcon className="stroke-gray hover:stroke-white transition-all duration-200 cursor-pointer" />
                </PrismicNextLink>
              )}
            </div>
          </div>

          <p className="text-gray pt-5 font-semibold">
            <span className="text-green font-semibold">{primary.role}</span>
            {primary.tech_stack && ` | ${primary.tech_stack}`}
          </p>

          <div className="text-gray pt-5">
            <PrismicRichText field={primary.bio} />
          </div>
        </div>
      </div>

      {isFilled.keyText(primary.quote) && (
        <div className="flex items-center py-20">
          <CommentIcon size={80} />
          <p className="pl-4 text-gray">{primary.quote}</p>
        </div>
      )}

      {items.length > 0 && (
        <div>
          <h2 className="text-2xl mb-12">Interest area</h2>
          <div className="flex items-center flex-col md:justify-evenly md:flex-row gap-8 relative">
            {items.map((item, index) => (
              <InterestCircle
                key={index}
                icon={iconMap[item.interest_icon ?? "saas"]}
                title={item.interest_title ?? ""}
                description={item.interest_description ?? ""}
                className={circleClassMap[index % circleClassMap.length]}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
