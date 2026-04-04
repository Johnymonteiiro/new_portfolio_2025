"use client";

import { useClickOutside } from "@/hooks/clickOutSide";
import { useEffect, useRef, useState } from "react";
import { Form } from "./form";
import { MessageIcon } from "./ui/icon/message";

export function FloatButton() {
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useClickOutside(formRef, () => setIsOpen(false), [buttonRef]);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 72);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-[calc((100vw-1400px)/2+16px+104px)] z-50 flex flex-col items-center">
      <div className="relative">
        <Form isOpen={isOpen} formRef={formRef} className="bottom-full mb-3 right-0" />
        <button
          ref={buttonRef}
          onClick={() => setIsOpen((prev) => !prev)}
          className="bg-green-flat flex items-center justify-center rounded-[50px] shadow-[0px_5px_30px_0px_rgba(0,0,0,0.25)] size-10 hover:bg-green/20 transition-colors duration-200"
        >
          <MessageIcon size={24} className="stroke-green" />
        </button>
      </div>
    </div>
  );
}
