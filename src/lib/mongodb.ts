import "server-only";
import { MongoClient } from "mongodb";

const globalMongo = globalThis as typeof globalThis & {
  goldenhourMongo?: { client: MongoClient; ready: Promise<void> };
};

export async function getDatabase() {
  const uri = process.env.MONGODB_URI;
  const name = process.env.MONGODB_DB;
  if (!uri || !name) throw new Error("MONGODB_URI and MONGODB_DB must be configured.");
  if (!globalMongo.goldenhourMongo) {
    const client = new MongoClient(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10_000,
      connectTimeoutMS: 10_000,
      timeoutMS: 15_000,
    });
    const db = client.db(name);
    const ready = client.connect().then(async () => {
      await Promise.all([
        // The Mongo adapter handles explicit table indexes, but the core auth
        // schema's field-level uniqueness still needs physical database indexes.
        db.collection("gh_auth_user").createIndex({ email: 1 }, { unique: true }),
        db.collection("gh_auth_session").createIndex({ token: 1 }, { unique: true }),
        db.collection("gh_auth_session").createIndex({ userId: 1 }),
        db.collection("gh_auth_session").createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
        db.collection("gh_auth_account").createIndex({ providerId: 1, accountId: 1 }, { unique: true }),
        db.collection("gh_auth_account").createIndex({ userId: 1 }),
        db.collection("gh_auth_verification").createIndex({ identifier: 1 }),
        db.collection("gh_auth_verification").createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
        db.collection("gh_auth_rate_limit").createIndex({ key: 1 }, { unique: true }),
      ]);
    }).catch(async (error: unknown) => {
      globalMongo.goldenhourMongo = undefined;
      await client.close().catch(() => undefined);
      throw error;
    });
    globalMongo.goldenhourMongo = { client, ready };
  }
  const connection = globalMongo.goldenhourMongo;
  await connection.ready;
  return { client: connection.client, db: connection.client.db(name) };
}
