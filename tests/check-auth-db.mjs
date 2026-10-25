import nextEnv from "@next/env";
import { MongoClient } from "mongodb";

nextEnv.loadEnvConfig(process.cwd(), true, { info() {}, error() {} });
const client = new MongoClient(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000, connectTimeoutMS: 10000 });
try {
  await client.db(process.env.MONGODB_DB).command({ ping: 1 });
  console.log("MongoDB connection: PASS");
} catch (error) {
  // Never print driver messages: they may contain hostnames or credentials.
  console.error(`MongoDB connection: FAIL (${error.name}, code ${error.code ?? "unavailable"})`);
  process.exitCode = 1;
} finally { await client.close(); }
