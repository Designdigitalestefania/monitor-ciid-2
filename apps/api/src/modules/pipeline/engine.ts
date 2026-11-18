import { Pool } from "pg";
import { PipelineState, canTransition } from "./states.js";
import { AuditService } from "../audit/service.js";

export class PipelineEngine {
  private audit: AuditService;
  constructor(private db: Pool) {
    this.audit = new AuditService(db);
  }

  async transition(tenantId: string, expedienteId: string, newState: PipelineState, actorId: string) {
    const current = await this.db.query(
      "SELECT status FROM expedientes WHERE id = $1 AND tenant_id = $2",
      [expedienteId, tenantId]
    );
    if (current.rows.length === 0) throw new Error("Expediente no encontrado.");

    const currentState = current.rows[0].status as PipelineState;
    if (!canTransition(currentState, newState)) {
      throw new Error(`Transición inválida: ${currentState} -> ${newState}`);
    }
    if (newState === PipelineState.APPROVED && actorId.startsWith("agent-")) {
      throw new Error("⛔ Un agente no puede aprobar.");
    }

    await this.db.query(
      "UPDATE expedientes SET status = $1 WHERE id = $2 AND tenant_id = $3",
      [newState, expedienteId, tenantId]
    );

    await this.audit.registrar({
      tenantId,
      actorType: actorId.startsWith("agent-") ? "AGENT" : "USER",
      actorId,
      action: "STATE_TRANSITION",
      entityType: "EXPEDIENTE",
      entityId: expedienteId,
      details: { from: currentState, to: newState }
    });

    return { success: true, from: currentState, to: newState };
  }
}
