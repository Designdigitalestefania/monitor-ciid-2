import { FastifyInstance } from "fastify";
import { AuthService } from "../modules/auth/service.js";
import { AuditService } from "../modules/audit/service.js";

export async function authRoutes(app: FastifyInstance) {
  const auth = new AuthService(app.db);
  const audit = new AuditService(app.db);

  app.post("/api/v1/auth/login", async (req, reply) => {
    const { email, password } = req.body as any;
    try {
      const user = await auth.login(email, password);
      const token = app.jwt.sign(
        { userId: user.userId, tenantId: user.tenantId, role: user.role },
        { expiresIn: "8h" }
      );

      await audit.registrar({
        tenantId: user.tenantId, actorType: "USER", actorId: user.userId,
        action: "LOGIN_SUCCESS", entityType: "USER", entityId: user.userId
      });

      return { success: true, data: { user: user.name, role: user.role }, token: token };
    } catch (e: any) {
      return reply.code(401).send({ success: false, error: e.message });
    }
  });

  app.get("/api/v1/auth/me", async (request: any, reply) => {
    try {
      const authHeader = request.headers.authorization;
      if (!authHeader) throw new Error("No hay token.");
      const token = authHeader.split(" ")[1];
      const decoded = app.jwt.verify(token);
      return { success: true, data: decoded };
    } catch (e: any) {
      return reply.code(401).send({ success: false, error: "No autorizado." });
    }
  });
}
