"use client";

import { useEffect, useState } from "react";

const bnDigits = (n: number | string): string =>
  String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

const bnMonths = [
  "জানুয়ারি","ফেব্রুয়ারি","মার্চ","এপ্রিল","মে","জুন",
  "জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর",
];

const bnDays = [
  "রবিবার","সোমবার","মঙ্গলবার","বুধবার","বৃহস্পতিবার","শুক্রবার","শনিবার",
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
    <section className="bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <span className="inline-block text-xs font-medium text-green-800 bg-green-100 px-3 py-1 rounded-full mb-4">
            {date || "\u00A0"}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-4 text-gray-600 leading-relaxed">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a
            href="#সব-পণ্য"
            className="inline-block mt-6 bg-green-700 hover:bg-green-800 text-white font-medium px-6 py-3 rounded-lg transition"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        <div className="flex justify-center">
          <div className="text-[140px] md:text-[200px] leading-none select-none">
            🧺
          </div>
        </div>
      </div>
    </section>
  );
}