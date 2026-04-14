import { type ReactNode } from "react";

export function Tooltip({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div className="relative group">
      {children}
      <div className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-1.5 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
        <div className="w-2.5 h-2.5 rotate-45 border-l border-t border-border-color bg-card-bg -mb-[5px] z-10" />
        <span className="px-2.5 py-1 text-xs rounded-sm bg-card-bg border border-border-color text-white whitespace-nowrap">
          {label}
        </span>
      </div>
    </div>
  );
}
