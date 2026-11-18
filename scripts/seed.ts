import { createDatabasePool } from "../apps/api/src/lib/database.js";
import * as dotenv from "dotenv";
import bcrypt from "bcryptjs";

// Cargar el .env desde apps/api
dotenv.config({ path: "./apps/api/.env" });

async function seed() {
  if (!process.env.DATABASE_URL) {
    console.error("❌ Falta DATABASE_URL en apps/api/.env");
    process.exit(1);
  }
  
  const db = createDatabasePool(process.env.DATABASE_URL);
  
  try {
    // 1. Crear Tenant
    const tenant = await db.query(`
      INSERT INTO tenants (name, slug) VALUES ('Monitor Noticias', 'monitor-noticias') 
      ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name RETURNING id
    `);
    const tenantId = tenant.rows[0].id;
    console.log("✅ Tenant creado:", tenantId);

    // 2. Crear Rol
    await db.query(`
      INSERT INTO roles (name, description) VALUES ('DIRECTOR', 'Dirección editorial') ON CONFLICT DO NOTHING
    `);
    console.log("✅ Rol creado");

    // 3. Crear Usuario
    const hash = await bcrypt.hash("ciid2026", 10);
    const user = await db.query(`
      INSERT INTO users (email, password_hash, full_name) 
      VALUES ('fanny@monitornoticias.mx', $1, 'Fanny') 
      ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash RETURNING id
    `, [hash]);
    const userId = user.rows[0].id;
    console.log("✅ Usuario creado:", userId);

    // 4. Asignar Membresía
    await db.query(`
      INSERT INTO tenant_memberships (tenant_id, user_id, role_id, status)
      VALUES ($1, $2, (SELECT id FROM roles WHERE name = 'DIRECTOR' LIMIT 1), 'ACTIVE')
      ON CONFLICT DO NOTHING
    `, [tenantId, userId]);
    console.log("✅ Membresía asignada");

    console.log("");
    console.log("🎉 USUARIO CREADO EXITOSAMENTE");
    console.log("   Email: fanny@monitornoticias.mx");
    console.log("   Password: ciid2026");
    
  } catch (error: any) {
    console.error("❌ Error:", error.message);
  } finally {
    await db.end();
  }
}

seed();
