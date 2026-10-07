export default function Footer() {
    return (
        <footer className="mt-16 border-t border-gray-200 bg-white">
            <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <p className="text-sm text-gray-600">
                    <span className="font-semibold text-green-700">বাজার দর</span>
                    {" — "}
                    প্রয়োজনীয় পণ্যের দাম এক নজরে।
                </p>
                <p className="text-xs text-gray-500 md:text-right">
                    সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                </p>
            </div>
        </footer>
    );
}