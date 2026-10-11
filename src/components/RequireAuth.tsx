"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function RequireAuth({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    useEffect(() => {
        if (!isPending && !session) {
            toast.error("এই পেজ দেখতে সাইন ইন করুন");
            router.push("/sign-in");
        }
    }, [isPending, session, router]);

    // While checking auth, show skeleton
    if (isPending) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="animate-pulse space-y-6">
                    <div className="h-4 bg-gray-100 rounded w-64" />
                    <div className="h-40 bg-gray-100 rounded-2xl" />
                    <div className="h-64 bg-gray-100 rounded-2xl" />
                </div>
            </div>
        );
    }

    // Not logged in — render nothing while redirect happens
    if (!session) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-16 text-center">
                <p className="text-gray-500">সাইন ইন পেজে পাঠানো হচ্ছে...</p>
            </div>
        );
    }

    // Logged in — render children
    return <>{children}</>;
}