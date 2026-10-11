import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const dbUrl = process.env.BETTER_AUTH_DB_URL;

if (!dbUrl) {
  throw new Error(
    "BETTER_AUTH_DB_URL is missing. Add it to .env.local for dev and to your Vercel project Environment Variables (all environments, Build + Runtime)."
  );
}

const client = new MongoClient(dbUrl);
const db = client.db();

export const auth = betterAuth({
  // ✅ Database — MUST be present
  database: mongodbAdapter(db, { client }),

  // ✅ Email/password
  emailAndPassword: {
    enabled: true,
  },

  // ✅ Social providers — only registered when their env vars exist
  socialProviders: {
    ...(process.env.BETTER_AUTH_GOOGLE_CLIENT_ID &&
    process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID,
            clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET,
          },
        }
      : {}),
    ...(process.env.BETTER_AUTH_GITHUB_CLIENT_ID &&
    process.env.BETTER_AUTH_GITHUB_CLIENT_SECRET
      ? {
          github: {
            clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID,
            clientSecret: process.env.BETTER_AUTH_GITHUB_CLIENT_SECRET,
          },
        }
      : {}),
  },

  // ✅ Session
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24,      // 1 day
  },
});