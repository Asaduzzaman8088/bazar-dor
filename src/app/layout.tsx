import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import { Category, Product } from "@/lib/utils";
import "./globals.css";

// ... rest same as before, but import types from utils

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত।",
};

type Category = { id: string; slug: string; nameBn: string; icon: string };
type Product = {
  id: number;
  slug: string;
  name: string;
  unit: string;
  today: number;
  change: "up" | "down" | "flat";
  changePct: number;
};

const BASE = "https://api.api-store.workers.dev/api/bazardor";

async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${BASE}/categories`, { cache: "no-store" });
    return res.ok ? ((await res.json()) as Category[]) : [];
  } catch {
    return [];
  }
}

async function getTickerProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${BASE}/products`, { cache: "no-store" });
    if (!res.ok) return [];
    const all = (await res.json()) as Product[];
    // take first 15 for the ticker
    return all.slice(0, 15);
  } catch {
    return [];
  }
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [categories, tickerProducts] = await Promise.all([
    getCategories(),
    getTickerProducts(),
  ]);

  return (
    <html lang="bn" className={hindSiliguri.variable}>
      <body className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-900 antialiased">
        <Navbar categories={categories} />
        <Ticker products={tickerProducts} />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}