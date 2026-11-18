import { createDatabasePool } from "./apps/api/src/lib/database.js";
import * as dotenv from "dotenv";
dotenv.config({ path: "./apps/api/.env" });
async function test() {
  const db = createDatabasePool(process.env.DATABASE_URL!);
  try {
    const res = await db.query("SELECT NOW() as ahora");
    console.log("✅ Conexión exitosa:", res.rows[0].ahora);
  } catch (err: any) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  } finally { await db.end(); }
}
test();
