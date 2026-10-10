"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignUpPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("পাসওয়ার্ড দুটি মিলছে না");
            return;
        }
        if (formData.password.length < 8) {
            setError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
            return;
        }
        if (!/[A-Z]/.test(formData.password)) {
            setError("পাসওয়ার্ডে কমপক্ষে ১টি বড় হাতের অক্ষর থাকতে হবে");
            return;
        }
        if (!/[0-9]/.test(formData.password)) {
            setError("পাসওয়ার্ডে কমপক্ষে ১টি সংখ্যা থাকতে হবে");
            return;
        }

        setLoading(true);
        // TODO: Wire up to BetterAuth later
        console.log("Sign up attempt:", formData);
        setTimeout(() => {
            setLoading(false);
            alert("Sign up will work after we wire up BetterAuth!");
        }, 800);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    অ্যাকাউন্ট তৈরি করুন
                </h1>
                <p className="text-sm text-gray-500 max-w-md">
                    বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                </p>
            </div>

            <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            নাম
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="যেমন: রফিক উদ্দিন"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 text-gray-900"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            ইমেইল
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="you@example.com"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 text-gray-900"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            পাসওয়ার্ড
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 text-gray-900"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            পাসওয়ার্ড নিশ্চিত করুন
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            placeholder="আবার লিখুন"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 text-gray-900"
                        />
                    </div>

                    {error && (
                        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white font-medium py-2.5 rounded-lg transition"
                    >
                        {loading ? "লোড হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
                    </button>
                </form>

                <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs text-gray-500">অথবা</span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Google
                    </button>
                    <button
                        type="button"
                        className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55v-2.16c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 012.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.35.77 1.05.77 2.12v3.14c0 .31.21.66.8.55C20.71 21.39 24 17.08 24 12c0-6.35-5.15-11.5-12-11.5z" />
                        </svg>
                        GitHub
                    </button>
                </div>

                <p className="text-center text-sm text-gray-600 mt-6">
                    অ্যাকাউন্ট আছে?{" "}
                    <Link
                        href="/sign-in"
                        className="text-green-700 font-semibold hover:underline"
                    >
                        সাইন ইন করুন
                    </Link>
                </p>
            </div>

            <Link
                href="/"
                className="mt-6 text-sm text-gray-500 hover:text-green-700 flex items-center gap-1"
            >
                ← হোম পেজে ফিরে যান
            </Link>
        </div>
    );
}