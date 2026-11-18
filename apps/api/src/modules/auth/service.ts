import { Pool } from "pg";
import bcrypt from "bcryptjs";

export class AuthService {
  constructor(private db: Pool) {}

  async login(email: string, password: string) {
    const result = await this.db.query(
      "SELECT id, email, full_name, password_hash FROM users WHERE email = $1",
      [email]
    );
    const user = result.rows[0];
    if (!user) throw new Error("Credenciales inválidas.");

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) throw new Error("Credenciales inválidas.");

    const mem = await this.db.query(
      `SELECT tm.tenant_id, r.name as role_name 
       FROM tenant_memberships tm 
       JOIN roles r ON r.id = tm.role_id 
       WHERE tm.user_id = $1 LIMIT 1`,
      [user.id]
    );
    if (mem.rows.length === 0) throw new Error("Sin acceso a tenants.");

    return {
      userId: user.id,
      email: user.email,
      name: user.full_name,
      tenantId: mem.rows[0].tenant_id,
      role: mem.rows[0].role_name
    };
  }
}
