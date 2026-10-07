import Link from "next/link";
import { Product, bnDigits, translateUnit, formatPrice } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
    const isUp = product.change === "up";
    const isDown = product.change === "down";
    const isFlat = product.change === "flat";

    return (
        <Link
            href={`/product/${product.slug}`}
            className="block bg-white rounded-2xl border border-gray-200 hover:border-green-400 hover:shadow-md transition p-4"
        >
            {/* Emoji */}
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl mb-3">
                {product.image}
            </div>

            {/* Name */}
            <h3 className="font-semibold text-gray-900 leading-tight">
                {product.name}
            </h3>

            {/* Unit */}
            <p className="text-xs text-gray-500 mt-0.5">
                {translateUnit(product.unit)}
            </p>

            {/* Price row */}
            <div className="flex items-end justify-between mt-4">
                <div>
                    <p className="text-[11px] text-gray-500">আজকের দাম</p>
                    <p className="text-xl font-bold text-gray-900">
                        {formatPrice(product.today)}{" "}
                        <span className="text-sm font-medium text-gray-600">টাকা</span>
                    </p>
                </div>

                {isUp && (
                    <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-md">
                        ▲ {bnDigits(product.changePct)}%
                    </span>
                )}
                {isDown && (
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                        ▼ {bnDigits(product.changePct)}%
                    </span>
                )}
                {isFlat && (
                    <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                        — {bnDigits(product.changePct)}%
                    </span>
                )}
            </div>
        </Link>
    );
}