import { createAuthClient } from "better-auth/react";

// No baseURL: better-auth falls back to window.location.origin, so the same
// client works on localhost and on the deployed domain. Setting it explicitly
// bakes the value into the bundle at build time and breaks one environment.
export const authClient = createAuthClient();

export const { signUp, signIn, signOut, useSession } = authClient;