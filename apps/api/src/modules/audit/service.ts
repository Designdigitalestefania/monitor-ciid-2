import { Pool } from "pg";

export class AuditService {
  constructor(private db: Pool) {}

  async registrar(params: {
    tenantId: string;
    actorType: "USER" | "AGENT" | "SYSTEM";
    actorId: string;
    action: string;
    entityType: string;
    entityId?: string;
    details?: Record<string, unknown>;
  }): Promise<void> {
    try {
      await this.db.query(
        `INSERT INTO audit_logs (tenant_id, actor_type, actor_id, action, entity_type, entity_id, details)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [params.tenantId, params.actorType, params.actorId, params.action, params.entityType, params.entityId ?? null, JSON.stringify(params.details ?? {})]
      );
    } catch {
      // Audit failures must not be silently swallowed: callers can fail closed and
      // the HTTP logger is configured to redact credentials and cookies.
      throw new Error("Could not write audit event.");
    }
  }

  async consultar(tenantId: string, limite = 50) {
    if (!Number.isInteger(limite) || limite < 1 || limite > 200) {
      throw new RangeError("Audit page size must be an integer between 1 and 200.");
    }
    const result = await this.db.query(
      `SELECT * FROM audit_logs WHERE tenant_id = $1 ORDER BY created_at DESC LIMIT $2`,
      [tenantId, limite]
    );
    return result.rows;
  }
}
