import React from "react";
import { BookIcon } from "./ui/icon/book";
import Link from "next/link";

export default function BlogCard() {
  return (
    <div className="border rounded-md border-border-color p-5 w-full mb-6 transition-all duration-200 cursor-pointer hover:border-green">
      <Link href="/blog/fecth">
        <div className="flex items-center justify-between pb-7">
          <div className="flex items-center">
            <div
              className={`flex items-center mr-2 justify-center w-8 h-8 rounded-sm bg-green-flat`}
            >
              <BookIcon size={24} className="stroke-green" />
            </div>
            <h3 className="text-xl">Fetching data with next.js 15</h3>
          </div>

          <p className="text-gray">12/07/2024</p>
        </div>

        <p className="font-normal text-gray">
          I develop modern websites and software, high performance, clean code
          and AI integration. My focus is on creating intuitive experiences and
          solutions that truly make an impact. If you're looking for innovation
          and results...
        </p>
      </Link>
    </div>
  );
}
