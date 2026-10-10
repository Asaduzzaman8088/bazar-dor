import ProductGridSkeleton from "@/components/ProductGridSkeleton";

export default function CategoryLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header skeleton */}
      <div className="mb-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-48 mb-2" />
        <div className="h-4 bg-gray-100 rounded w-64" />
      </div>

      {/* Toolbar skeleton */}
      <div className="flex justify-end mb-6">
        <div className="h-10 bg-gray-100 rounded w-48" />
      </div>

      <ProductGridSkeleton count={9} />
    </div>
  );
}