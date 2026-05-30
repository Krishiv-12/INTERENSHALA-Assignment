function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-100 bg-white p-5">
      {/* Logo + title row */}
      <div className="mb-3 flex items-start gap-3">
        <div className="h-10 w-10 shrink-0 rounded-xl bg-gray-100" />
        <div className="flex-1 space-y-2 pt-1">
          <div className="h-3.5 w-3/4 rounded-md bg-gray-100" />
          <div className="h-3 w-1/2 rounded-md bg-gray-100" />
        </div>
      </div>

      {/* Badge row */}
      <div className="mb-3 flex gap-2">
        <div className="h-5 w-16 rounded-md bg-gray-100" />
        <div className="h-5 w-24 rounded-md bg-gray-100" />
      </div>

      {/* Meta grid */}
      <div className="grid grid-cols-2 gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-3 rounded-md bg-gray-100" />
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-3">
        <div className="h-3 w-24 rounded-md bg-gray-100" />
        <div className="h-8 w-24 rounded-xl bg-gray-100" />
      </div>
    </div>
  );
}

export default function LoadingSkeletons({ count = 6 }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}