export const bnDigits = (n: number | string): string =>
  String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

export const unitMap: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
  gram: "প্রতি গ্রাম",
  maund: "প্রতি মণ",
};

export const translateUnit = (unit: string): string =>
  unitMap[unit] || `প্রতি ${unit}`;

export const formatPrice = (n: number): string => {
  // 1850 → ১,৮৫০
  return bnDigits(n.toLocaleString("en-IN"));
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  categoryName: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: "up" | "down" | "flat";
  changePct: number;
  markets: Market[];
};

export type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
  avg: number;
};

export type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};