import Link from "next/link";

export default function BlogNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <p className="text-green text-lg mb-2">404</p>
      <h1 className="text-4xl font-medium mb-4">Post not found</h1>
      <p className="text-gray mb-8 max-w-md">
        This blog post doesn&apos;t exist or may have been removed.
      </p>
      <Link
        href="/"
        className="border border-border-color px-5 py-2 rounded-md text-gray hover:text-white hover:border-green transition-colors duration-200"
      >
        Go home
      </Link>
    </div>
  );
}
