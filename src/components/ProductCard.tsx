import Link from "next/link";
import { Product, bnDigits, translateUnit, formatPrice } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const isFlat = !isUp && !isDown;
  const pct = product.change?.pct ?? 0;

  return (
    <Link
      href={`/product/${product.id}`}
      className="block bg-white rounded-2xl border border-gray-200 hover:border-green-400 hover:shadow-md transition p-5"
    >
      {/* Top row: emoji circle + name + unit */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-3xl shrink-0">
          {product.image}
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-gray-900 leading-tight text-lg truncate">
            {product.nameBn}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">
            {translateUnit(product.unit)}
          </p>
        </div>
      </div>

      {/* Bottom row: price + change badge */}
      <div className="flex items-end justify-between mt-5">
        <div>
          <p className="text-[11px] text-gray-500 mb-0.5">আজকের দাম</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatPrice(product.today)}{" "}
            <span className="text-base font-medium text-gray-600">টাকা</span>
          </p>
        </div>

        {isUp && (
          <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-full whitespace-nowrap">
            ▲ {bnDigits(Math.abs(pct))}%
          </span>
        )}
        {isDown && (
          <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full whitespace-nowrap">
            ▼ {bnDigits(Math.abs(pct))}%
          </span>
        )}
        {isFlat && (
          <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full whitespace-nowrap">
            — {bnDigits(Math.abs(pct))}%
          </span>
        )}
      </div>
    </Link>
  );
}