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
    details?: any;
  }) {
    try {
      await this.db.query(
        `INSERT INTO audit_logs (tenant_id, actor_type, actor_id, action, entity_type, entity_id, details)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [params.tenantId, params.actorType, params.actorId, params.action, params.entityType, params.entityId || null, JSON.stringify(params.details || {})]
      );
    } catch (error) { console.error("[AUDIT ERROR]", error); }
  }

  async consultar(tenantId: string, limite: number = 50) {
    const result = await this.db.query(
      `SELECT * FROM audit_logs WHERE tenant_id = $1 ORDER BY created_at DESC LIMIT $2`,
      [tenantId, limite]
    );
    return result.rows;
  }
}
