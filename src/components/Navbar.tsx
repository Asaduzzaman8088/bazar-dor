"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";


/* ============ Bangla helpers ============ */

const bnDigits = (n: number | string): string =>
  String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

const bnMonths: string[] = [
  "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
];

const bnDays: string[] = [
  "রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার",
];

/* ============ Types ============ */

type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

/* ============ Component ============ */

export default function Navbar({ categories = [] }: { categories?: Category[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [date, setDate] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Set Bangla date on client (avoid hydration mismatch)
  useEffect(() => {
    const d = new Date();
    setDate(
      `${bnDays[d.getDay()]}, ${bnDigits(d.getDate())} ${bnMonths[d.getMonth()]}, ${bnDigits(d.getFullYear())}`
    );
  }, []);

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [menuOpen]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("সফলভাবে সাইন আউট হয়েছেন");   // ← success toast
      setMenuOpen(false);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign-out error:", error);
      toast.error("সাইন আউট ব্যর্থ হয়েছে");         // ← error toast
    }
  };

  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      {/* Row 1: Logo + Auth */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/Stack.svg"
            alt="বাজার দর"
            className="w-11 h-11 shrink-0"
          />
          <div className="leading-tight">
            <h1 className="text-lg font-bold text-gray-900">বাজার দর</h1>
            <p className="text-[11px] text-gray-500">{date || "\u00A0"}</p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {isPending ? (
            <div className="w-24 h-9 bg-gray-100 rounded-lg animate-pulse" />
          ) : user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center overflow-hidden">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name ?? ""}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-green-700 font-bold text-sm">
                      {user.name?.charAt(0).toUpperCase() ?? "U"}
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium text-gray-800 hidden sm:inline">
                  {user.name?.split(" ")[0]}
                </span>
                <svg
                  className="w-3 h-3 text-gray-500"
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
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition"
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    আমার প্রোফাইল
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition border-t border-gray-100"
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
              )}
            </div>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="text-sm font-medium text-gray-700 hover:text-green-700"
              >
                সাইন ইন
              </Link>
              <Link
                href="/sign-up"
                className="text-sm font-medium text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Row 2: Categories */}
      <nav className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto">
          {categories.map((cat: Category) => {
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[15px] whitespace-nowrap transition ${isActive
                  ? "bg-green-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}