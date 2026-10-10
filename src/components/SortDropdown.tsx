"use client";

export type SortOption = "default" | "price-asc" | "price-desc";

const options: { value: SortOption; label: string }[] = [
    { value: "default", label: "ডিফল্ট" },
    { value: "price-asc", label: "দাম: কম থেকে বেশি" },
    { value: "price-desc", label: "দাম: বেশি থেকে কম" },
];

export default function SortDropdown({
    value,
    onChange,
}: {
    value: SortOption;
    onChange: (v: SortOption) => void;
}) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">সাজান:</span>
            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value as SortOption)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg pl-3 pr-8 py-2 text-sm font-medium text-gray-800 hover:border-green-500 focus:outline-none focus:border-green-600 cursor-pointer"
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                {/* Chevron icon */}
                <svg
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </div>
        </div>
    );
}