export default function Hero() {
    return (
        <section className="bg-gradient-to-br from-green-50 via-white to-emerald-50">
            <div className="max-w-6xl mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-8 items-center">
                {/* Left */}
                <div>
                    <span className="inline-block text-xs font-medium text-green-800 bg-green-100 px-3 py-1 rounded-full mb-4">
                        সোমবার, ৯ নভেম্বর, ২০২৬
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

                {/* Right — Illustration */}
                <div className="flex justify-center">
                    <div className="text-[140px] md:text-[200px] leading-none select-none">
                        🧺
                    </div>
                </div>
            </div>
        </section>
    );
}