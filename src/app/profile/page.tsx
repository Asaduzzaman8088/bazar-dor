"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession, signOut } from "@/lib/auth-client";

export default function ProfilePage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();
    const [updating, setUpdating] = useState(false);
    const [name, setName] = useState("");

    // Sync name input when session loads
    useEffect(() => {
        if (session?.user?.name) {
            setName(session.user.name);
        }
    }, [session]);

    const user = session?.user;

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);
        // TODO: Wire to BetterAuth updateUser later
        setTimeout(() => {
            setUpdating(false);
            toast.success("আপডেট শীঘ্রই কাজ করবে!");
        }, 800);
    };

    const handleSignOut = async () => {
        await signOut();
        router.push("/");
        router.refresh();
    };

    // Loading state
    if (isPending) {
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

    // Not logged in
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
                        {/* ✅ Real avatar from Google/GitHub OR fallback initial */}
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center overflow-hidden shrink-0">
                            {user.image ? (
                                <img
                                    src={user.image}
                                    alt={user.name ?? "User"}
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                />
                            ) : (
                                <span className="text-green-700 font-bold text-2xl">
                                    {user.name?.charAt(0).toUpperCase() ?? "U"}
                                </span>
                            )}
                        </div>
                        <div>
                            {/* ✅ Real name */}
                            <h2 className="text-lg font-bold text-gray-900">
                                {user.name || "ব্যবহারকারী"}
                            </h2>
                            {/* ✅ Real email */}
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
                        disabled={updating}
                        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-2.5 rounded-lg transition"
                    >
                        {updating ? "আপডেট হচ্ছে..." : "আপডেট"}
                    </button>
                </form>
            </div>
        </div>
    );
}