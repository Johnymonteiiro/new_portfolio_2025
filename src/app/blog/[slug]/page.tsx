import Sidebar from "@/components/sidebar";
import { ArrowIcon } from "@/components/ui/icon/arrow";
import { CalendarIcon } from "@/components/ui/icon/calendar";
import { content_data } from "@/static_data/content";
import { MoveLeft } from "lucide-react";
import { Clock1 } from "lucide-react";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  return (
    <main className="w-full max-w-[1200px] mx-auto px-4 mt-10">
      <a
        href="/"
        className="flex items-center text-gray hover:text-white transition-all duration-200 cursor-pointer"
      >
        <MoveLeft className="mr-3" />
        Home
      </a>

      <div className="py-10 px-6 mt-5 bg-card-bg rounded-md flex items-center justify-between">
        <h1 className="text-2xl">Fetching data with next.js 15</h1>

        <div className="flex items-center">
          <li className="flex items-center">
            <CalendarIcon size={18} className="stroke-green" />
            <p className="ml-2">12/07/2024</p>
          </li>
          <li className="flex items-center ml-5">
            <Clock1 size={18} className="text-green" />
            <p className="ml-2">5 min</p>
          </li>
        </div>
      </div>

      <section className="mt-16 flex relative">
        <div className="max-w-[900px]">
          <h2 className="text-xl">Data Fetching in Modern Web Applications</h2>
          <p className="mt-5 font-light text-gray mb-16">
            Data fetching is a crucial aspect of building modern web
            applications. One common question many developers grapple with is
            where to fetch data: on the server or the client? This decision
            isn't always straightforward, and as we'll explore, it often depends
            on a variety of factors.
          </p>

          <h2 className="text-xl">The Flexibility of Data Fetching</h2>
          <p className="mt-5 font-light text-gray mb-16">
            When considering where to fetch data, there isn't a
            one-size-fits-all answer. Some scenarios demand server-side data
            fetching, while others may benefit from client-side fetching. For
            example, an e-commerce application might use server-side fetching
            for product listings to improve SEO, while using client-side
            fetching for real-time inventory updates. <br />
            <br /> Newcomers to web development might find it confusing to
            choose between the two. The reality is, modern frameworks like React
            and Next.js encourage leveraging both server and client components.
            This blended approach helps optimize performance and user
            experience.
          </p>
        </div>

        <Sidebar sections={content_data.sidebar.blog} />
      </section>
    </main>
  );
}
