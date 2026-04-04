 "use client";

import { useFormContext } from "react-hook-form";
import { userFormContact } from "../form";

interface InputProps {
  order: number;
  label: string;
  className?: string;
  propriety: "user_name" | "user_email" | "user_service" | "user_message";
  placeholder: string;
}

export const TextArea = ({
  order,
  label,
  className,
  propriety = "user_message",
  placeholder,
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<userFormContact>();

  return (
    <div className="flex flex-col pb-8">
      <div className="flex items-center text-lg font-thin pb-5">
        <span className="pr-2">0{order}</span>
        <label className="" htmlFor={label}>
          {label}
        </label>
      </div>
      <textarea
        className={
          className ??
          "w-full bg-transparent font-thin pr-4 py-4 border-b border-border-color focus:outline-none focus:border-green"
        }
        placeholder={placeholder}
        {...register(propriety)}
      />
      {/* Render error message if it exists */}
      <div>
        {errors[propriety] && (
          <p className="text-red-400 text-sm mt-2">
            {errors[propriety].message as string}
          </p>
        )}
      </div>
    </div>
  );
};
