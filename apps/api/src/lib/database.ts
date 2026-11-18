import pg from "pg";
const { Pool } = pg;

export function createDatabasePool(connectionString: string) {
  return new Pool({
    connectionString,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000
  });
}

export async function checkConnection(pool: pg.Pool): Promise<boolean> {
  try {
    const res = await pool.query("SELECT 1 AS connected");
    return res.rows[0]?.connected === 1;
  } catch {
    return false;
  }
}
