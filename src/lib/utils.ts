export const bnDigits = (n: number | string): string =>
    String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

export const unitMap: Record<string, string> = {
    kg: "প্রতি কেজি",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
    gram: "প্রতি গ্রাম",
    maund: "প্রতি মণ",
    hali: "প্রতি হালি",
};

export const translateUnit = (unit: string): string =>
    unitMap[unit] || `প্রতি ${unit}`;

export const formatPrice = (n: number): string =>
    bnDigits(n.toLocaleString("en-IN"));

export type Market = {
    market: string;
    division: string;
    min: number;
    max: number;
};

export type Product = {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: {
        dir: "up" | "down" | "flat";
        pct: number;
    };
    markets: Market[];
};

export type Category = {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
};