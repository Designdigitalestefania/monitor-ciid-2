import { FastifyInstance } from "fastify";
import { AuthService } from "../modules/auth/service.js";
import { AuditService } from "../modules/audit/service.js";

export async function authRoutes(app: FastifyInstance) {
  const auth = new AuthService(app.db);
  const audit = new AuditService(app.db);

  // Login
  app.post("/api/v1/auth/login", async (req, reply) => {
    const { email, password } = req.body as any;
    try {
      const user = await auth.login(email, password);
      const token = app.jwt.sign(
        { userId: user.userId, tenantId: user.tenantId, role: user.role },
        { expiresIn: "8h" }
      );

      // Auditoría
      await audit.registrar({
        tenantId: user.tenantId,
        actorType: "USER",
        actorId: user.userId,
        action: "LOGIN_SUCCESS",
        entityType: "USER",
        entityId: user.userId
      });

      reply.setCookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 28800
      });

      return { success: true, data: { user: user.name, role: user.role } };
    } catch (e: any) {
      return reply.code(401).send({ success: false, error: e.message });
    }
  });

  // Logout
  app.post("/api/v1/auth/logout", async (req, reply) => {
    reply.clearCookie("access_token", { path: "/" });
    return { success: true };
  });

  // Ruta protegida: /me (usando onRequest en lugar de preHandler)
  app.get("/api/v1/auth/me", {
    onRequest: [async (request, reply) => {
      try {
        await request.jwtVerify();
      } catch {
        reply.code(401).send({ success: false, error: "No autorizado." });
      }
    }]
  }, async (request) => {
    return { success: true, data: request.user };
  });
}
