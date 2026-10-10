import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center">
            <div className="text-7xl mb-4">🔍</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">৪০৪</h1>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
                পেজটি খুঁজে পাওয়া যায়নি
            </h2>
            <p className="text-sm text-gray-500 max-w-md mb-8">
                আপনি যে পেজটি খুঁজছেন সেটি বিদ্যমান নেই বা সরিয়ে ফেলা হয়েছে। নিচের
                বাটনে ক্লিক করে হোম পেজে ফিরে যান।
            </p>
            <Link
                href="/"
                className="inline-block bg-green-700 hover:bg-green-800 text-white font-medium px-6 py-3 rounded-lg transition"
            >
                হোম পেজে ফিরে যান
            </Link>
        </div>
    );
}