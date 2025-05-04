import React from "react";
import Image from "next/image";
import { MessageCircleMore } from "lucide-react";
import logo_image from "../app/icon.png";

export default function Header() {
  return (
    <header className="py-4 border-b border-border-color">
      <div className="max-w-[1200px] mx-auto px-4 flex justify-between items-center">
        <div className="flex items-end">
          <Image src={logo_image} width={30} height={30} alt="logo-image" />
          <p className="pl-1">Johny Monteiro</p>
        </div>
        <div>
          <button className="flex items-center">
            <p className="pr-2">Let's get in touch</p>{" "}
            <MessageCircleMore className="text-gray" />
          </button>
        </div>
      </div>
    </header>
  );
}
