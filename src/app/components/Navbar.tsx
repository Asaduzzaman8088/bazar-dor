"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const bnDigits = (n) =>
  String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);

const bnMonths = [
  "জানুয়ারি","ফেব্রুয়ারি","মার্চ","এপ্রিল","মে","জুন",
  "জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর",
];
const bnDays = [
  "রবিবার","সোমবার","মঙ্গলবার","বুধবার","বৃহস্পতিবার","শুক্রবার","শনিবার",
];

function getBanglaDate() {
  const d = new Date();
  return `${bnDays[d.getDay()]}, ${bnDigits(d.getDate())} ${bnMonths[d.getMonth()]}, ${bnDigits(d.getFullYear())}`;
}

export default function Navbar({ categories = [] }) {
  const pathname = usePathname();
  const [date, setDate] = useState("");

  // Set date on client only to avoid hydration mismatch
  useEffect(() => {
    setDate(getBanglaDate());
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      {/* Row 1: Logo + Auth */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center text-white text-xl">
            🛒
          </div>
          <div className="leading-tight">
            <h1 className="text-lg font-bold text-green-700">বাজার দর</h1>
            <p className="text-[11px] text-gray-500">{date || "\u00A0"}</p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/sign-in"
            className="text-sm font-medium text-gray-700 hover:text-green-700"
          >
            সাইন ইন
          </Link>
          <Link
            href="/sign-up"
            className="text-sm font-medium text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
          >
            সাইন আপ
          </Link>
        </div>
      </div>

      {/* Row 2: Categories */}
      <nav className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-1 overflow-x-auto">
          {categories.map((cat) => {
            const isActive =
              pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition ${
                  isActive
                    ? "bg-green-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}