import { FastifyInstance } from "fastify";
import { RadarLegislativoService } from "../modules/radar-legislativo/service.js";

export async function radarLegislativoRoutes(app: FastifyInstance) {
  const svc = new RadarLegislativoService(app.db);
  app.post("/api/v1/radar/legislators", async (req: any, reply) => {
    try {
      const decoded: any = app.jwt.verify(req.headers.authorization?.split(" ")[1]);
      const leg = await svc.createLegislator(decoded.tenantId, req.body);
      return { success: true, data: leg };
    } catch (e: any) { return reply.code(400).send({ success: false, error: e.message }); }
  });
  app.post("/api/v1/radar/activities", async (req: any, reply) => {
    try {
      const decoded: any = app.jwt.verify(req.headers.authorization?.split(" ")[1]);
      const act = await svc.addActivity(decoded.tenantId, req.body);
      return { success: true, data: act };
    } catch (e: any) { return reply.code(400).send({ success: false, error: e.message }); }
  });
  app.get("/api/v1/radar/activities/:legislatorId", async (req: any, reply) => {
    try {
      const decoded: any = app.jwt.verify(req.headers.authorization?.split(" ")[1]);
      const acts = await svc.listActivities(decoded.tenantId, req.params.legislatorId);
      return { success: true, data: acts };
    } catch (e: any) { return reply.code(401).send({ success: false, error: e.message }); }
  });
}
