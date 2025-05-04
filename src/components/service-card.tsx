import React, { ReactNode } from "react";

interface ServiceProps {
  title: string;
  description: string;
  icon: ReactNode;
  iconBg?:string;
}

export default function ServiceCard({
  description,
  icon,
  title,
  iconBg="gray"
}: ServiceProps) {
  return (
    <div className="border rounded-md border-border-color p-5 w-full max-w-[450px]">
      <div className="flex items-center pb-7">
        <div
          className={`flex items-center mr-2 justify-center w-8 h-8 rounded-sm bg-${iconBg}`}
        >
          {icon}
        </div>
        <h3 className="text-xl">{title}</h3>
      </div>

      <p className="font-normal text-gray">{description}</p>
    </div>
  );
}
