import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { Product, bnDigits } from "@/lib/utils";

const BASE = "https://api.api-store.workers.dev/api/bazardor";

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${BASE}/products`, { cache: "no-store" });
    if (!res.ok) return [];
    return (await res.json()) as Product[];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();

  const risers = [...products]
    .filter((p) => p.change === "up")
    .sort((a, b) => b.changePct - a.changePct)
    .slice(0, 6);

  const fallers = [...products]
    .filter((p) => p.change === "down")
    .sort((a, b) => a.changePct - b.changePct)
    .slice(0, 6);

  return (
    <div>
      <Hero />

      {/* Section A — Risers */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold text-red-600 flex items-center gap-2 mb-6">
          <span>▲</span> আজ দাম বেড়েছে
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {risers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Section B — Fallers */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold text-green-700 flex items-center gap-2 mb-6">
          <span>▼</span> আজ দাম কমেছে
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {fallers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Section C — All Products */}
      <section id="সব-পণ্য" className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold text-gray-900 mb-2">সব পণ্য</h2>
        <p className="text-sm text-gray-500 mb-6">
          মোট {bnDigits(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}