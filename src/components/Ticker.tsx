"use client";

import Link from "next/link";
import { Product, bnDigits, translateUnit, formatPrice } from "@/lib/utils";

export default function Ticker({ products = [] }: { products?: Product[] }) {
    if (products.length === 0) return null;

    const doubled = [...products, ...products];

    return (
        <div className="bg-white border-b border-gray-200 overflow-hidden">
            <div className="ticker-track flex items-center gap-8 py-2 whitespace-nowrap">
                {doubled.map((p, i) => {
                    const isUp = p.change?.dir === "up";
                    const isDown = p.change?.dir === "down";
                    return (
                        <Link
                            key={`${p.id}-${i}`}
                            href={`/product/${p.id}`}
                            className="flex items-center gap-1.5 text-sm hover:opacity-75"
                        >
                            <span className="text-base">{p.image}</span>
                            <span className="font-medium">{p.nameBn}</span>
                            <span className="text-gray-500 text-xs">{translateUnit(p.unit)}</span>
                            <span className="font-semibold">{formatPrice(p.today)} টাকা</span>
                            {isUp && (
                                <span className="text-red-600 text-xs font-medium">
                                    ▲ {bnDigits(Math.abs(p.change?.pct ?? 0))}%
                                </span>
                            )}
                            {isDown && (
                                <span className="text-green-600 text-xs font-medium">
                                    ▼ {bnDigits(Math.abs(p.change?.pct ?? 0))}%
                                </span>
                            )}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}