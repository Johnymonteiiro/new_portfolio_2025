export default function BlogLoading() {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 mt-10">
      <div className="animate-pulse">
        <div className="h-4 w-20 bg-card-bg rounded mb-6" />
        <div className="py-10 px-6 bg-card-bg rounded-md space-y-4">
          <div className="h-7 w-2/3 bg-border-color rounded" />
          <div className="h-4 w-1/4 bg-border-color rounded" />
          <div className="flex gap-2 mt-4">
            <div className="h-5 w-16 bg-border-color rounded-full" />
            <div className="h-5 w-16 bg-border-color rounded-full" />
          </div>
        </div>
        <div className="mt-16 space-y-6">
          <div className="h-6 w-1/3 bg-card-bg rounded" />
          <div className="h-4 w-full bg-card-bg rounded" />
          <div className="h-4 w-5/6 bg-card-bg rounded" />
          <div className="h-4 w-4/5 bg-card-bg rounded" />
        </div>
      </div>
    </div>
  );
}
