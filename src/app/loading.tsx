import ProductGridSkeleton from "@/components/ProductGridSkeleton";

export default function HomeLoading() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Hero skeleton */}
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 mb-8 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-48 mb-4" />
                <div className="h-12 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-4 bg-gray-100 rounded w-2/3 mb-6" />
                <div className="h-10 bg-gray-200 rounded w-32" />
            </div>

            {/* Section A skeleton */}
            <div className="mb-8">
                <div className="h-6 bg-gray-200 rounded w-48 mb-6 animate-pulse" />
                <ProductGridSkeleton count={6} />
            </div>

            {/* Section B skeleton */}
            <div className="mb-8">
                <div className="h-6 bg-gray-200 rounded w-48 mb-6 animate-pulse" />
                <ProductGridSkeleton count={6} />
            </div>
        </div>
    );
}