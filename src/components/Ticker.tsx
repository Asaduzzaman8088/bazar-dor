"use client";

import Link from "next/link";

type Product = {
  id: number;
  slug: string;
  name: string;
  unit: string;
  today: number;
  change: "up" | "down" | "flat";
  changePct: number;
};

const bnDigits = (n: number | string): string =>
  String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

export default function Ticker({ products = [] }: { products?: Product[] }) {
  if (products.length === 0) return null;

  // Duplicate the list so the marquee loops seamlessly
  const doubled = [...products, ...products];

  return (
    <div className="bg-white border-b border-gray-200 overflow-hidden">
      <div className="ticker-track flex items-center gap-6 py-2 whitespace-nowrap">
        {doubled.map((p, i) => {
          const isUp = p.change === "up";
          const isDown = p.change === "down";
          const isFlat = p.change === "flat";

          return (
            <Link
              key={`${p.id}-${i}`}
              href={`/product/${p.slug}`}
              className="flex items-center gap-1.5 text-sm hover:opacity-75"
            >
              <span>{p.name}</span>
              <span className="text-gray-500 text-xs">{p.unit}</span>
              <span className="font-semibold">{bnDigits(p.today)} টাকা</span>
              {isUp && (
                <span className="text-red-600 text-xs font-medium">
                  ▲ {bnDigits(p.changePct)}%
                </span>
              )}
              {isDown && (
                <span className="text-green-600 text-xs font-medium">
                  ▼ {bnDigits(p.changePct)}%
                </span>
              )}
              {isFlat && (
                <span className="text-gray-500 text-xs font-medium">
                  — {bnDigits(p.changePct)}%
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}