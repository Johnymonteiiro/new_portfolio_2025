"use client";

import Image from "next/image";
import profile_image from "../app/assets/jhony.png";
import InterestCircle from "./interestCircle";
import { CommentIcon } from "./ui/icon/comment";
import { FileIcon } from "./ui/icon/file";
import { GithubIcon } from "./ui/icon/github";
import { IAcon } from "./ui/icon/ia";
import { InnovationIcon } from "./ui/icon/innovation";
import { InstagramIcon } from "./ui/icon/insta";
import { LinkedinIcon } from "./ui/icon/linkedin";
import { MessageIcon } from "./ui/icon/message";
import { SaasIcon } from "./ui/icon/saas";

export default function Profile({
  refCallback,
}: {
  refCallback: (element: HTMLElement | null) => void;
}) {
  return (
    <div id="About" ref={refCallback}>
      <div className="bg-card-bg flex shadow-normal rounded-md relative mt-20 p-6">
        <div>
          <Image
            src={profile_image}
            width={134}
            height={134}
            quality={100}
            alt="logo-image"
            className="rounded-md border-4 border-border-color"
          />

          <div className="flex items-center space-x-2 pt-3">
            <div className="relative w-2 h-2 lg:w-7 lg:h-7">
              <div className="absolute inset-0 rounded-full bg-green-flat animate-multiPulse"></div>
              <div className="absolute inset-0 rounded-full bg-green animate-multiPulse delay-150"></div>
              <div className="absolute inset-2 rounded-full bg-green"></div>
            </div>
            <span className="text-white text-sm">Available now!</span>
          </div>
        </div>

        <div className="ml-7 flex-1">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-medium">João José Sebastião</h1>
            <div className="flex items-center">
              <MessageIcon className="stroke-gray hover:stroke-white transition-all duration-200 cursor-pointer" />
              <InstagramIcon className="fill-gray mx-3 hover:fill-white transition-all duration-200 cursor-pointer" />
              <LinkedinIcon className="fill-gray hover:fill-white transition-all duration-200 cursor-pointer" />
              <GithubIcon className="fill-gray  mx-3 hover:fill-white transition-all duration-200 cursor-pointer" />
              <FileIcon className="stroke-gray hover:stroke-white transition-all duration-200 cursor-pointer" />
            </div>
          </div>

          <p className="text-gray pt-5 font-semibold">
            <span className="text-green font-semibold">Software engineer</span>{" "}
            | Node.js | Python | PostgreSQL | Typescript | React.js | Next.js |
            IA | UI Design
          </p>

          <p className="text-gray pt-5">
            Software Engineer specializing in fullstack development and UI
            design. With over three years of experience, I’m always focused on
            creating innovative and scalable software solutions aligned with
            business goals. In addition to my technical skills,{" "}
            <span className="text-white">
              I highly value clear communication and collaboration
            </span>
            , as I believe these are essential elements for impactful project
            success.
          </p>
        </div>
      </div>

      <div className="flex items-center py-20">
        <CommentIcon size={80} />
        <p className="pl-4 text-gray">
          You don't need to trust me, but rather in the experience I bring to
          solve your challenges and the quality of the solutions I deliver.
        </p>
      </div>

      <div>
        <h2 className="text-2xl mb-12">Interest area</h2>
        <div className="flex items-center flex-col md:justify-evenly md:flex-row gap-8 relative">
          <InterestCircle
            icon={<SaasIcon size={40} className="fill-green" />}
            title="SaaS"
            className="border border-border-color hover:bg-card-bg hover:shadow-normal hover:z-20"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, maiores
               perspiciatis iusto voluptates"
          />
          <InterestCircle
            icon={<IAcon size={40} className="fill-purple" />}
            title="Artificial Intelligence"
            className="bg-card-bg shadow-normal border md:absolute border-border-color"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, maiores
               perspiciatis iusto voluptates"
          />
          <InterestCircle
            icon={<InnovationIcon size={40} className="fill-yellow" />}
            title="Technological Innovation"
            className="border border-border-color hover:bg-card-bg hover:shadow-normal hover:z-20"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, maiores
               perspiciatis iusto voluptates"
          />
        </div>
      </div>
    </div>
  );
}
