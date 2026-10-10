import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryClient from "@/components/CategoryClient";
import { Category, Product } from "@/lib/utils";

const BASE = "https://api.api-store.workers.dev/api/bazardor";

async function getCategory(slug: string): Promise<Category | null> {
    try {
        const res = await fetch(`${BASE}/categories/${slug}`, { cache: "no-store" });
        if (!res.ok) return null;
        return (await res.json()) as Category;
    } catch {
        return null;
    }
}

async function getProducts(slug: string): Promise<Product[]> {
    try {
        const res = await fetch(`${BASE}/products?category=${slug}`, {
            cache: "no-store",
        });
        if (!res.ok) return [];
        return (await res.json()) as Product[];
    } catch {
        return [];
    }
}

type PageProps = {
    params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: PageProps) {
    const { slug } = await params;

    const [category, products] = await Promise.all([
        getCategory(slug),
        getProducts(slug),
    ]);

    // Invalid category → 404
    if (!category) {
        notFound();
    }

    // Empty category → friendly message
    if (products.length === 0) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-16 text-center">
                <div className="text-6xl mb-4">{category.icon}</div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {category.nameBn}
                </h1>
                <p className="text-gray-500 mb-8">
                    এই ক্যাটেগরিতে এখন কোনো পণ্য নেই।
                </p>
                <Link
                    href="/"
                    className="inline-block bg-green-700 hover:bg-green-800 text-white font-medium px-6 py-3 rounded-lg transition"
                >
                    হোম পেজে ফিরে যান
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl">{category.icon}</span>
                    <h1 className="text-3xl font-bold text-gray-900">
                        {category.nameBn}
                    </h1>
                </div>
                <p className="text-sm text-gray-500">
                    {products.length}টি পণ্যের আজকের দাম ও পরিবর্তন
                </p>
            </div>

            {/* Client wrapper handles sort */}
            <CategoryClient products={products} />
        </div>
    );
}