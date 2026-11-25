import { createDatabasePool } from "../apps/api/src/lib/database.js";
import * as dotenv from "dotenv";

dotenv.config({ path: "./apps/api/.env" });

async function seed() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required in apps/api/.env. See .env.example.");
  }

  const db = createDatabasePool(process.env.DATABASE_URL);
  try {
    const tenant = await db.query(
      `INSERT INTO tenants (name, slug)
       VALUES ($1, $2)
       ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
       RETURNING id, name, slug`,
      ["Monitor Noticias", "monitor-noticias"]
    );
    console.info("Initial tenant is ready:", tenant.rows[0]);
    console.info("No users, passwords, or credentials were created. Configure identity through the approved Supabase Auth workflow.");
  } finally {
    await db.end();
  }
}

seed().catch((error: unknown) => {
  // Do not print connection strings or other potentially sensitive error details.
  console.error("Seed failed. Verify the migration state and DATABASE_URL locally.");
  process.exitCode = 1;
});
