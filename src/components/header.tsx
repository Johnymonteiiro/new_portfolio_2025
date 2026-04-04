"use client";

import { useClickOutside } from "@/hooks/clickOutSide";
import { MessageCircleMore } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import logo_image from "../app/icon.png";
import { Form } from "./form";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useClickOutside(formRef, () => setIsOpen(false), [buttonRef]);

  return (
    <header className="py-4 border-b border-border-color">
      <div className="max-w-[1400px] relative mx-auto px-4 flex justify-between items-center">
        <a href="/" className="flex items-end">
          <Image src={logo_image} width={30} height={30} alt="logo-image" />
          <p className="pl-1">Johny Monteiro</p>
        </a>
        <div>
          <button
            ref={buttonRef}
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center"
          >
            <p className="pr-2">Let's get in touch</p>{" "}
            <MessageCircleMore className="text-gray" />
          </button>

          <Form isOpen={isOpen} formRef={formRef} className="top-[48px]" />
        </div>
      </div>
    </header>
  );
}
