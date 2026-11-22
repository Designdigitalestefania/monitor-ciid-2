import { Pool } from "pg";

export class MonitorEditorialService {
  constructor(private db: Pool) {}

  async createDraft(tenantId: string, materialId: string, payload: any, actorId: string) {
    const r = await this.db.query(
      `INSERT INTO editorial_drafts (tenant_id, material_id, title, hook, body, context, closing, cta, hashtags, observations, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'draft') RETURNING *`,
      [tenantId, materialId, payload.title, payload.hook, payload.body, payload.context, payload.closing, payload.cta, payload.hashtags, payload.observations]
    );
    return r.rows[0];
  }

  async list(tenantId: string) {
    const r = await this.db.query("SELECT * FROM editorial_drafts WHERE tenant_id=$1 ORDER BY created_at DESC", [tenantId]);
    return r.rows;
  }
}
