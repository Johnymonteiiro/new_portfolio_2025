"use client";

import Image from "next/image";
import profile_image from "../app/assets/jhony.png";
import InterestCircle from "./interestCircle";
import { Tooltip } from "./tooltip";
import { CommentIcon } from "./ui/icon/comment";
import { FileIcon } from "./ui/icon/file";
import { GithubIcon } from "./ui/icon/github";
import { IAcon } from "./ui/icon/ia";
import { InnovationIcon } from "./ui/icon/innovation";
import { LinkedinIcon } from "./ui/icon/linkedin";
import { SaasIcon } from "./ui/icon/saas";
import { SECTIONS } from "@/config/sections";
import type { InterestArea, Profile } from "@/notion/types/types.notion";
import { type ReactNode } from "react";

const INTEREST_ICONS: Record<string, ReactNode> = {
  "SaaS": <SaasIcon size={40} className="fill-green" />,
  "Artificial Intelligence": <IAcon size={40} className="fill-purple" />,
  "Technological Innovation": <InnovationIcon size={40} className="fill-yellow" />,
};

const INTEREST_CLASS: Record<string, string> = {
  "SaaS": "border border-border-color hover:bg-card-bg hover:shadow-normal hover:z-20",
  "Artificial Intelligence": "bg-card-bg shadow-normal border md:absolute border-border-color",
  "Technological Innovation": "border border-border-color hover:bg-card-bg hover:shadow-normal hover:z-20",
};

export default function Profile({
  refCallback,
  profile,
  interests,
}: {
  refCallback: (element: HTMLElement | null) => void;
  profile: Profile;
  interests: InterestArea[];
}) {
  return (
    <div id={SECTIONS.ABOUT} ref={refCallback}>
      <div className="bg-card-bg flex shadow-normal rounded-md relative mt-20 p-6">
        <div>
          <Image
            src={profile.profileImageUrl ?? profile_image}
            width={134}
            height={134}
            quality={100}
            alt={profile.name || "Profile photo"}
            className="rounded-md border-4 border-border-color"
          />

          <div className="flex items-center space-x-2 pt-3">
            <div className="relative w-2 h-2 lg:w-7 lg:h-7">
              <div className="absolute inset-0 rounded-full bg-green-flat animate-multiPulse"></div>
              <div className="absolute inset-0 rounded-full bg-green animate-multiPulse delay-150"></div>
              <div className="absolute inset-2 rounded-full bg-green"></div>
            </div>
            <span className="text-white text-sm">{profile.status}</span>
          </div>
        </div>

        <div className="ml-7 flex-1">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-medium">{profile.name}</h1>
            <div className="flex items-center gap-3">
              <Tooltip label="LinkedIn">
                {profile.linkedinUrl ? (
                  <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
                    <LinkedinIcon className="fill-gray hover:fill-white transition-all duration-200 cursor-pointer" />
                  </a>
                ) : (
                  <LinkedinIcon className="fill-gray hover:fill-white transition-all duration-200 cursor-pointer" />
                )}
              </Tooltip>
              <Tooltip label="GitHub">
                {profile.githubUrl ? (
                  <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
                    <GithubIcon className="fill-gray hover:fill-white transition-all duration-200 cursor-pointer" />
                  </a>
                ) : (
                  <GithubIcon className="fill-gray hover:fill-white transition-all duration-200 cursor-pointer" />
                )}
              </Tooltip>
              <Tooltip label="Curriculum">
                {(profile.cvFileUrl ?? profile.cvUrl) ? (
                  <a href={(profile.cvFileUrl ?? profile.cvUrl)!} target="_blank" rel="noopener noreferrer" aria-label="Download curriculum">
                    <FileIcon className="stroke-gray hover:stroke-white transition-all duration-200 cursor-pointer" />
                  </a>
                ) : (
                  <FileIcon className="stroke-gray hover:stroke-white transition-all duration-200 cursor-pointer" />
                )}
              </Tooltip>
            </div>
          </div>

          <p className="text-gray pt-5 font-semibold">
            <span className="text-green font-semibold">{profile.title}</span>{" "}
            | {profile.specializations}
          </p>

          <p className="text-gray pt-5">
            {profile.communicationNote ? (
              <>
                {profile.bio.split(profile.communicationNote)[0]}
                <span className="text-white">{profile.communicationNote}</span>
                {profile.bio.split(profile.communicationNote)[1]}
              </>
            ) : (
              profile.bio
            )}
          </p>
        </div>
      </div>

      <div className="flex items-center py-20">
        <CommentIcon size={80} />
        <p className="pl-4 text-gray">{profile.quote}</p>
      </div>

      <div>
        <h2 className="text-2xl mb-12">Interest area</h2>
        <div className="flex items-center flex-col md:justify-evenly md:flex-row gap-8 relative">
          {interests.map((area) => (
            <InterestCircle
              key={area.id}
              icon={INTEREST_ICONS[area.name] ?? null}
              title={area.name}
              className={INTEREST_CLASS[area.name] ?? "border border-border-color"}
              description={area.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
