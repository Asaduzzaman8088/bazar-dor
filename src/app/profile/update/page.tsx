"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSession, authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();
    const [name, setName] = useState("");
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        if (session?.user?.name) {
            setName(session.user.name);
        }
    }, [session]);

    useEffect(() => {
        if (!isPending && !session?.user) {
            router.push("/sign-in");
        }
    }, [isPending, session, router]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("নাম লিখুন");
            return;
        }

        setUpdating(true);
        try {
            const { error } = await authClient.updateUser({ name });
            if (error) {
                toast.error(error.message || "আপডেট ব্যর্থ হয়েছে");
                return;
            }
            toast.success("নাম সফলভাবে আপডেট হয়েছে");
            router.push("/profile");
            router.refresh();
        } catch (err) {
            console.error("Update error:", err);
            toast.error("আপডেট ব্যর্থ হয়েছে");
        } finally {
            setUpdating(false);
        }
    };

    // Loading
    if (isPending) {
        return (
            <div className="max-w-xl mx-auto px-4 py-12">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-48" />
                    <div className="h-32 bg-gray-100 rounded-2xl" />
                </div>
            </div>
        );
    }

    // Not logged in
    if (!session?.user) {
        return null;
    }

    return (
        <div className="max-w-xl mx-auto px-4 py-8 md:py-12">
            <Link
                href="/profile"
                className="text-sm text-gray-500 hover:text-green-700 inline-flex items-center gap-1 mb-6"
            >
                ← প্রোফাইলে ফিরে যান
            </Link>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                তথ্য আপডেট করুন
            </h1>
            <p className="text-sm text-gray-500 mb-8">
                আপনার নাম পরিবর্তন করুন
            </p>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
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
                            placeholder="আপনার নাম লিখুন"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 text-gray-900"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={updating}
                        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-2.5 rounded-lg transition"
                    >
                        {updating ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
                    </button>
                </form>
            </div>
        </div>
    );
}