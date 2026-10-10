"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import SortDropdown, { SortOption } from "@/components/SortDropdown";
import { Product, bnDigits } from "@/lib/utils";

export default function CategoryClient({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortOption>("default");

  const sorted = useMemo(() => {
    const copy = [...products];
    if (sort === "price-asc") {
      copy.sort((a, b) => a.today - b.today);
    } else if (sort === "price-desc") {
      copy.sort((a, b) => b.today - a.today);
    }
    return copy;
  }, [products, sort]);

  return (
    <>
      {/* Toolbar Card */}
      <div className="bg-white rounded-2xl border border-gray-200 px-6 py-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-sm text-gray-500">
          মোট {bnDigits(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>
        <SortDropdown value={sort} onChange={setSort} />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}