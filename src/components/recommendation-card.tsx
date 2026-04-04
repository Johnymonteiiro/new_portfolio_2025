import clsx from "clsx";
import Image from "next/image";
import ImageProfile from "../app/assets/jhony.png";
import { LinkedinIcon } from "./ui/icon/linkedin";

export default function RecommendationCard({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={clsx(
        className,
        "bg-card-bg border rounded-md border-border-color p-5 w-full"
      )}
    >
      <div className="flex items-center justify-between pb-8">
        <div className="flex">
          <div className="w-12 h-12 border-2 border-border-color relative overflow-hidden rounded-full">
            <Image
              src={ImageProfile}
              alt="profile-name"
              fill
              className="object-cover"
              quality={100}
              priority={true}
            />
          </div>

          <div className="pl-3">
            <h2 className="text-lg">Jhon Doe</h2>
            <p className="text-sm text-gray">Fullstack developer </p>
          </div>
        </div>

        <div>
          <LinkedinIcon className="fill-gray hover:fill-white transition-all duration-200 cursor-pointer" />
        </div>
      </div>

      <p className="text-gray">
        I develop modern websites and software, high performance, clean code and
        AI integration. My focus is on creating intuitive experiences and
        solutions that truly make an impact. If you're looking for innovation
        and results, let’s work together! 🚀
      </p>
    </div>
  );
}
