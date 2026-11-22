import { FastifyInstance } from "fastify";
import { MonitorEditorialService } from "../modules/monitor-editorial/service.js";

export async function monitorEditorialRoutes(app: FastifyInstance) {
  const svc = new MonitorEditorialService(app.db);
  app.post("/api/v1/monitor-editorial/drafts", async (req: any, reply) => {
    try {
      const decoded: any = app.jwt.verify(req.headers.authorization?.split(" ")[1]);
      const body: any = req.body;
      const draft = await svc.createDraft(decoded.tenantId, body.materialId, body, decoded.userId);
      return { success: true, data: draft };
    } catch (e: any) {
      return reply.code(400).send({ success: false, error: e.message });
    }
  });
  app.get("/api/v1/monitor-editorial/drafts", async (req: any, reply) => {
    try {
      const decoded: any = app.jwt.verify(req.headers.authorization?.split(" ")[1]);
      const drafts = await svc.list(decoded.tenantId);
      return { success: true, data: drafts };
    } catch (e: any) {
      return reply.code(401).send({ success: false, error: e.message });
    }
  });
}
