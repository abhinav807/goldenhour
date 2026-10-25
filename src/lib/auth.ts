import "server-only";
import { betterAuth } from "better-auth/minimal";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { getAuthEnvironment } from "./auth-env";
import { getDatabase } from "./mongodb";
import { APIError } from "better-auth/api";
import { isMasterAdminEmail } from "./admin-policy";

async function createAuth() {
  const env = getAuthEnvironment();
  const { client, db } = await getDatabase();
  return betterAuth({
    appName: "GoldenHour Delhi",
    secret: env.secret,
    baseURL: env.baseURL,
    trustedOrigins: [env.baseURL],
    database: mongodbAdapter(db, { client }),
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 12,
      maxPasswordLength: 128,
      // Email delivery is not configured. Do not claim ownership of an email address.
      requireEmailVerification: false,
    },
    socialProviders: {
      google: {
        clientId: env.googleClientId,
        clientSecret: env.googleClientSecret,
        prompt: "select_account",
      },
    },
    user: { modelName: "gh_auth_user" },
    databaseHooks: {
      user: {
        create: {
          before: async (user) => {
            if (isMasterAdminEmail(user.email) && !user.emailVerified) {
              throw new APIError("FORBIDDEN", { code: "MASTER_ADMIN_GOOGLE_REQUIRED", message: "Use Google to sign in with a master admin email." });
            }
          },
        },
      },
    },
    session: { modelName: "gh_auth_session", expiresIn: 60 * 60 * 24 * 7, updateAge: 60 * 60 * 24 },
    account: {
      modelName: "gh_auth_account",
      // Do not merge an unverified password account with a Google identity by email.
      accountLinking: { enabled: false },
      encryptOAuthTokens: true,
    },
    verification: { modelName: "gh_auth_verification" },
    rateLimit: {
      enabled: true,
      storage: "database",
      modelName: "gh_auth_rate_limit",
      window: 60,
      max: 100,
      customRules: {
        "/sign-in/email": { window: 60, max: 5 },
        "/sign-up/email": { window: 60, max: 5 },
      },
    },
    advanced: { ipAddress: { ipAddressHeaders: ["x-real-ip", "x-forwarded-for"] } },
    // Provider/database errors can contain credentials; return safe errors at the boundary.
    logger: { disabled: true },
  });
}

let instance: ReturnType<typeof createAuth> | undefined;
export function getAuth() {
  instance ??= createAuth().catch((error: unknown) => { instance = undefined; throw error; });
  return instance;
}

export async function getSession(requestHeaders: Headers) {
  // Public pages work without a database round trip when there is no session cookie.
  if (!requestHeaders.get("cookie")?.includes("better-auth.session_token=")) return null;
  // Server-rendered pages cannot forward refresh cookies. Let the browser's
  // /get-session request refresh both the database expiry and cookie together.
  return (await getAuth()).api.getSession({ headers: requestHeaders, query: { disableRefresh: true } });
}
