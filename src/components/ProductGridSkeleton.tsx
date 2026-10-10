export default function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-gray-200 p-4 animate-pulse"
        >
          <div className="w-12 h-12 rounded-full bg-gray-200 mb-3" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-3 bg-gray-100 rounded w-1/2 mb-4" />
          <div className="flex items-end justify-between">
            <div>
              <div className="h-3 bg-gray-100 rounded w-16 mb-1" />
              <div className="h-6 bg-gray-200 rounded w-20" />
            </div>
            <div className="h-6 bg-gray-100 rounded w-14" />
          </div>
        </div>
      ))}
    </div>
  );
}