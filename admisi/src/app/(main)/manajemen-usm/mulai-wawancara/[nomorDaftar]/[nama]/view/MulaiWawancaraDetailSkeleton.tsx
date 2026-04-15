export default function MulaiWawancaraDetailSkeleton() {
  return (
    <div className="px-8 py-4 space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="h-10 bg-gray-200 dark:bg-zinc-800 rounded-lg w-64"></div>
            <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-48"></div>
          </div>
          <div className="h-8 bg-gray-200 dark:bg-zinc-800 rounded-lg w-32"></div>
        </div>
        <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-96"></div>
      </div>

      {/* Profile Header Skeleton */}
      <div className="h-48 bg-gray-200 dark:bg-zinc-800 rounded-2xl w-full"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Content Cards Skeleton */}
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm"
            >
              <div className="h-16 bg-slate-50 dark:bg-zinc-900 border-b border-slate-100 dark:border-zinc-800 px-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-zinc-800"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-32"></div>
                  <div className="h-3 bg-gray-200 dark:bg-zinc-800 rounded w-48"></div>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 dark:bg-zinc-800 rounded w-24"></div>
                    <div className="h-10 bg-gray-200 dark:bg-zinc-800 rounded-lg w-full"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 dark:bg-zinc-800 rounded w-24"></div>
                    <div className="h-10 bg-gray-200 dark:bg-zinc-800 rounded-lg w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-8">
          {/* Sidebar Recommendation Skeleton */}
          <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-xl shadow-sm">
            <div className="h-16 bg-slate-50 dark:bg-zinc-900 border-b border-slate-100 dark:border-zinc-800 px-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-zinc-800"></div>
              <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-32"></div>
            </div>
            <div className="p-6 space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 bg-gray-200 dark:bg-zinc-800 rounded w-24"></div>
                  <div className="h-10 bg-gray-200 dark:bg-zinc-800 rounded-lg w-full"></div>
                </div>
              ))}
              <div className="pt-6 space-y-3">
                <div className="h-12 bg-gray-200 dark:bg-zinc-800 rounded-xl w-full"></div>
                <div className="h-12 bg-gray-200 dark:bg-zinc-800 rounded-xl w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
