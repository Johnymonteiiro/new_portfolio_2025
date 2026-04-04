import clsx from "clsx";
import { MoveLeft, MoveRight } from "lucide-react";
import { ReactNode } from "react";

interface ButtonProps {
  className?: string;
  children: ReactNode;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
  arrowPosition?: "left" | "right";
  withArrow?: boolean;
  variant?: "solid" | "outline";
}

export const Button = ({
  className,
  children,
  type = "button",
  onClick,
  arrowPosition = "right",
  withArrow = false,
  variant = "solid",
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={clsx(
        className,
        variant === "solid"
          ? "px-4 w-full py-2 bg-white text-black flex items-center justify-center rounded-md hover:bg-white/90 transition-all duration-200 cursor-pointer"
          : "px-4 w-full py-2 border border-primary flex items-center justify-center rounded-md text-gray hover:text-white transition-all duration-200 cursor-pointer"
      )}
    >
      {withArrow && arrowPosition === "left" && <MoveLeft className="mr-3" />}
      {children}
      {withArrow && arrowPosition === "right" && <MoveRight className="ml-3" />}
    </button>
  );
};
