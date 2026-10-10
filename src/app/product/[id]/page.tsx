import Link from "next/link";
import { notFound } from "next/navigation";
import { Product, bnDigits, translateUnit } from "@/lib/utils";

const BASE = "https://api.api-store.workers.dev/api/bazardor";

async function getProduct(id: string): Promise<Product | null> {
    try {
        const res = await fetch(`${BASE}/products/${id}`, { cache: "no-store" });
        if (!res.ok) return null;
        return (await res.json()) as Product;
    } catch {
        return null;
    }
}

type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({ params }: PageProps) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        notFound();
    }

    const mins = product.markets.map((m) => m.min);
    const maxes = product.markets.map((m) => m.max);
    const overallMin = Math.min(...mins);
    const overallMax = Math.max(...maxes);
    const overallAvg = Math.round((overallMin + overallMax) / 2);

    const isUp = product.change?.dir === "up";
    const isDown = product.change?.dir === "down";
    const pct = Math.abs(product.change?.pct ?? 0);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <Link href="/" className="hover:text-green-700">হোম</Link>
                <span>›</span>
                <Link href={`/category/${product.category}`} className="hover:text-green-700">
                    {product.categoryNameBn}
                </Link>
                <span>›</span>
                <span className="text-gray-800">{product.nameBn}</span>
            </nav>

            {/* Summary Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 mb-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-4xl shrink-0">
                            {product.image}
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                {product.nameBn}
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                {translateUnit(product.unit)} · {product.categoryNameBn}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                গতকালের তুলনায় আজ দাম{" "}
                                {isUp ? "বেড়েছে" : isDown ? "কমেছে" : "একই আছে"}
                            </p>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 md:min-w-[180px] text-center">
                        <p className="text-xs text-gray-500 mb-1">আজকের দাম</p>
                        <p className="text-3xl font-bold text-gray-900">
                            {bnDigits(product.today)}
                        </p>
                        <p className="text-xs text-gray-500">টাকা / {product.unit}</p>
                        {isUp && (
                            <span className="inline-block mt-2 text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-md">
                                ▲ {bnDigits(pct)}%
                            </span>
                        )}
                        {isDown && (
                            <span className="inline-block mt-2 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                                ▼ {bnDigits(pct)}%
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Price Summary */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">দামের সারসংক্ষেপ</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-50 rounded-xl p-4">
                        <p className="text-xs text-gray-600 mb-1">সর্বনিম্ন দাম</p>
                        <p className="text-2xl font-bold text-green-700">
                            {bnDigits(overallMin)} টাকা
                        </p>
                        <p className="text-xs text-gray-500 mt-1">সবচেয়ে কম দামের বাজার</p>
                    </div>
                    <div className="bg-red-50 rounded-xl p-4">
                        <p className="text-xs text-gray-600 mb-1">সর্বাধিক দাম</p>
                        <p className="text-2xl font-bold text-red-700">
                            {bnDigits(overallMax)} টাকা
                        </p>
                        <p className="text-xs text-gray-500 mt-1">সবচেয়ে বেশি দামের বাজার</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-xs text-gray-600 mb-1">গড় দাম</p>
                        <p className="text-2xl font-bold text-gray-800">
                            {bnDigits(overallAvg)} টাকা
                        </p>
                        <p className="text-xs text-gray-500 mt-1">প্রতি {product.unit}-এর হিসাবে</p>
                    </div>
                </div>
            </div>

            {/* Bazar Table */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                    বাজারভিত্তিক আজকের দাম
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-gray-500 border-b border-gray-200">
                                <th className="py-3 pr-4 font-medium">বাজার</th>
                                <th className="py-3 pr-4 font-medium">জেলা</th>
                                <th className="py-3 pr-4 font-medium text-right">সর্বনিম্ন</th>
                                <th className="py-3 pr-4 font-medium text-right">সর্বাধিক</th>
                                <th className="py-3 font-medium text-right">গড়</th>
                            </tr>
                        </thead>
                        <tbody>
                            {product.markets.map((m, i) => {
                                const avg = Math.round((m.min + m.max) / 2);
                                return (
                                    <tr key={`${m.market}-${i}`} className="border-b border-gray-100 last:border-0">
                                        <td className="py-3 pr-4 font-medium text-gray-800">{m.market}</td>
                                        <td className="py-3 pr-4 text-gray-600">{m.division}</td>
                                        <td className="py-3 pr-4 text-right text-green-700 font-semibold">
                                            {bnDigits(m.min)} টাকা
                                        </td>
                                        <td className="py-3 pr-4 text-right text-red-700 font-semibold">
                                            {bnDigits(m.max)} টাকা
                                        </td>
                                        <td className="py-3 text-right text-gray-800 font-semibold">
                                            {bnDigits(avg)} টাকা
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}