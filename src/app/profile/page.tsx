"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [name, setName] = useState("");
    const [user, setUser] = useState<{
        name: string;
        email: string;
        image?: string;
    } | null>(null);

    // TODO: Replace with real session fetch after BetterAuth is wired up
    useEffect(() => {
        // Temporary fake session for UI testing
        // Remove this after auth is set up!
        setTimeout(() => {
            setUser({
                name: "Rezwan Ahmed",
                email: "rezwanahmed@gmail.com",
            });
            setName("Rezwan Ahmed");
            setLoading(false);
        }, 500);
    }, []);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);
        // TODO: Wire to BetterAuth updateUser later
        setTimeout(() => {
            setUpdating(false);
            alert("Update will work after BetterAuth is wired!");
        }, 800);
    };

    const handleSignOut = async () => {
        // TODO: Wire to BetterAuth signOut later
        alert("Sign out will work after BetterAuth is wired!");
        router.push("/");
    };

    if (loading) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-12">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-48" />
                    <div className="h-4 bg-gray-100 rounded w-64" />
                    <div className="h-32 bg-gray-100 rounded-2xl mt-8" />
                    <div className="h-64 bg-gray-100 rounded-2xl mt-6" />
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-3">
                    লগইন করা নেই
                </h1>
                <p className="text-gray-500 mb-6">
                    প্রোফাইল দেখতে সাইন ইন করুন।
                </p>
                <Link
                    href="/sign-in"
                    className="inline-block bg-green-700 hover:bg-green-800 text-white font-medium px-6 py-3 rounded-lg transition"
                >
                    সাইন ইন করুন
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    আমার প্রোফাইল
                </h1>
                <p className="text-sm text-gray-500">
                    আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন
                </p>
            </div>

            {/* User Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-2xl font-bold text-green-700">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">
                                {user.name}
                            </h2>
                            <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 border border-red-300 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                        সাইন আউট
                    </button>
                </div>
            </div>

            {/* Update Info Form */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">তথ্য</h3>
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            নাম
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 text-gray-900"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={updating || name === user.name}
                        className="w-full bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white font-medium py-2.5 rounded-lg transition"
                    >
                        {updating ? "আপডেট হচ্ছে..." : "আপডেট"}
                    </button>
                </form>
            </div>
        </div>
    );
}