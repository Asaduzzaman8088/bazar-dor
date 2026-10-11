"use client";

import { useEffect, useState } from "react";

const bnDigits = (n: number | string): string =>
  String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

const bnMonths = [
  "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
];

const bnDays = [
  "রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার",
];

export default function Hero() {
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const d = new Date();
    setDate(
      `${bnDays[d.getDay()]}, ${bnDigits(d.getDate())} ${bnMonths[d.getMonth()]}, ${bnDigits(d.getFullYear())}`
    );
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 pt-2 pb-1">
      {/* ✅ The card wrapper */}
      <div className="bg-gradient-to-br from-green-50 via-white to-emerald-50 rounded-2xl border border-gray-200 shadow-sm p-4 md:p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
          {/* LEFT — Text content */}
          <div>
            <span className="inline-block text-sm font-semibold text-green-800 bg-green-100 px-4 py-1.5 rounded-full mb-6">
              {date || "\u00A0"}
            </span>

            <h1 className="text-4xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mt-5 text-base md:text-lg text-gray-600 leading-relaxed">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <a
              href="#সব-পণ্য"
              className="inline-block mt-8 bg-green-700 hover:bg-green-800 text-white font-semibold px-8 py-3.5 rounded-lg transition"
            >
              সব পণ্য দেখুন
            </a>
          </div>

          {/* RIGHT — Basket illustration */}
          <div className="flex justify-center md:justify-end">
            <img
              src="/basket.svg"
              alt="বাজারের ঝুড়ি"
              className="w-full max-w-[280px] md:max-w-[380px] h-auto"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = "none";
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = "block";
              }}
            />
            <div
              className="hidden text-[180px] md:text-[260px] leading-none select-none"
              aria-hidden="true"
            >
              🧺
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}