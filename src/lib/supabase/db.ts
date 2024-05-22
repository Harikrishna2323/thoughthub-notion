import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";
import * as schema from "../../../migrations/schema";
import { migrate } from "drizzle-orm/node-postgres/migrator";

dotenv.config({ path: ".env" });

if (!process.env.DATABASE_URL) {
  console.log("NO DATABASE URL !");
}

const client = postgres(process.env.DATABASE_URL as string, {
  max: 1,
});

const db = drizzle(client, { schema });

const migrateDB = async () => {
  console.log(" DATABASE URL : ", process.env.DATABASE_URL);

  try {
    console.log("--- MIGRATING CLIENT---");
    await migrate(db, { migrationsFolder: "migrations" });
    console.log("---MIGRATION SUCCESSFUL---");
  } catch (err) {
    console.log("!!! MIGRATION ERROR !!!");
    console.log("error", err);
  }
};

migrateDB();

export default db;
