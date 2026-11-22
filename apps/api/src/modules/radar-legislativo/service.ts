import { Pool } from "pg";

export class RadarLegislativoService {
  constructor(private db: Pool) {}

  async createLegislator(tenantId: string, data: any) {
    const r = await this.db.query(
      `INSERT INTO legislators (tenant_id, name, profile_url, party, district, status, verified_identity)
       VALUES ($1,$2,$3,$4,$5,'active',false) RETURNING *`,
      [tenantId, data.name, data.profileUrl, data.party, data.district]
    );
    return r.rows[0];
  }

  async addActivity(tenantId: string, data: any) {
    const r = await this.db.query(
      `INSERT INTO legislative_activities (tenant_id, legislator_id, kind, title, description, date, source_url, verified)
       VALUES ($1,$2,$3,$4,$5,$6,$7,false) RETURNING *`,
      [tenantId, data.legislatorId, data.kind, data.title, data.description, data.date, data.sourceUrl]
    );
    return r.rows[0];
  }

  async listActivities(tenantId: string, legislatorId: string) {
    const r = await this.db.query(
      "SELECT * FROM legislative_activities WHERE tenant_id=$1 AND legislator_id=$2 ORDER BY date DESC",
      [tenantId, legislatorId]
    );
    return r.rows;
  }
}
