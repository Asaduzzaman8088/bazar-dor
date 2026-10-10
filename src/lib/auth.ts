import { betterAuth } from "better-auth";
import { Pool } from "@neondatabase/serverless";

const BASE = "https://openapi.programming-hero.com/api/bazardor";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL!,
});

export const auth = betterAuth({
    database: pool,
    emailAndPassword: {
        enabled: true,
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24,      // 1 day
    },
});