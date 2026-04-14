function SkeletonBlock({ className }: { className?: string }) {
  return <div className={`bg-card-bg rounded animate-pulse ${className ?? ""}`} />;
}

export default function Loading() {
  return (
    <div className="max-w-[1400px] flex mx-auto px-4 relative">
      <div className="max-w-[1100px] w-full">

        {/* Profile card */}
        <div className="bg-card-bg flex shadow-normal rounded-md relative mt-20 p-6 animate-pulse">
          <div className="w-[134px] h-[134px] rounded-md bg-border-color shrink-0" />
          <div className="ml-7 flex-1 space-y-4">
            <div className="flex justify-between items-center">
              <SkeletonBlock className="h-7 w-48 bg-border-color" />
              <div className="flex gap-3">
                <SkeletonBlock className="h-6 w-6 rounded-full bg-border-color" />
                <SkeletonBlock className="h-6 w-6 rounded-full bg-border-color" />
                <SkeletonBlock className="h-6 w-6 rounded-full bg-border-color" />
              </div>
            </div>
            <SkeletonBlock className="h-4 w-64 bg-border-color" />
            <SkeletonBlock className="h-4 w-full bg-border-color" />
            <SkeletonBlock className="h-4 w-5/6 bg-border-color" />
          </div>
        </div>

        {/* Service section */}
        <div className="mt-32">
          <SkeletonBlock className="h-7 w-28 mb-8 bg-border-color" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[0, 1].map((i) => (
              <div key={i} className="bg-card-bg rounded-md p-6 animate-pulse space-y-3">
                <SkeletonBlock className="h-6 w-32 bg-border-color" />
                <SkeletonBlock className="h-4 w-full bg-border-color" />
                <SkeletonBlock className="h-4 w-4/5 bg-border-color" />
              </div>
            ))}
          </div>
        </div>

        {/* Projects section */}
        <div className="mt-32">
          <SkeletonBlock className="h-7 w-24 mb-8 bg-border-color" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="bg-card-bg rounded-md p-6 animate-pulse space-y-3">
                <SkeletonBlock className="h-36 w-full bg-border-color rounded" />
                <SkeletonBlock className="h-5 w-40 bg-border-color" />
                <SkeletonBlock className="h-4 w-full bg-border-color" />
              </div>
            ))}
          </div>
        </div>

        {/* Journey section */}
        <div className="mt-32">
          <SkeletonBlock className="h-7 w-36 mb-12 bg-border-color" />
          <div className="space-y-8">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-card-bg rounded-md p-6 animate-pulse space-y-3">
                <div className="flex justify-between">
                  <SkeletonBlock className="h-5 w-40 bg-border-color" />
                  <SkeletonBlock className="h-4 w-24 bg-border-color" />
                </div>
                <SkeletonBlock className="h-4 w-32 bg-border-color" />
                <SkeletonBlock className="h-4 w-full bg-border-color" />
                <SkeletonBlock className="h-4 w-5/6 bg-border-color" />
              </div>
            ))}
          </div>
        </div>

        {/* Blog section */}
        <div className="mt-32">
          <SkeletonBlock className="h-7 w-32 mb-12 bg-border-color" />
          <div className="space-y-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="border border-border-color rounded-md p-5 animate-pulse space-y-3">
                <div className="flex justify-between pb-4">
                  <SkeletonBlock className="h-5 w-48 bg-border-color" />
                  <SkeletonBlock className="h-4 w-20 bg-border-color" />
                </div>
                <SkeletonBlock className="h-4 w-full bg-border-color" />
                <SkeletonBlock className="h-4 w-4/5 bg-border-color" />
                <div className="flex gap-2 pt-2">
                  <SkeletonBlock className="h-5 w-16 rounded-full bg-border-color" />
                  <SkeletonBlock className="h-5 w-16 rounded-full bg-border-color" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations section */}
        <div className="mt-32 mb-16">
          <SkeletonBlock className="h-7 w-44 mb-12 bg-border-color" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-card-bg rounded-md p-6 animate-pulse space-y-3">
                <div className="flex items-center gap-3">
                  <SkeletonBlock className="h-12 w-12 rounded-full bg-border-color" />
                  <div className="space-y-2">
                    <SkeletonBlock className="h-4 w-32 bg-border-color" />
                    <SkeletonBlock className="h-3 w-24 bg-border-color" />
                  </div>
                </div>
                <SkeletonBlock className="h-4 w-full bg-border-color" />
                <SkeletonBlock className="h-4 w-5/6 bg-border-color" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar placeholder */}
      <div className="flex-1 pl-4 mt-20 hidden lg:block">
        <div className="sticky top-4 w-52 space-y-3 animate-pulse">
          <SkeletonBlock className="h-4 w-28 bg-border-color" />
          {[0, 1, 2, 3, 4].map((i) => (
            <SkeletonBlock key={i} className="h-3 w-36 bg-border-color" />
          ))}
        </div>
      </div>
    </div>
  );
}
