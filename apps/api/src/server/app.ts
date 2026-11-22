import Fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import jwt from "@fastify/jwt";
import { env } from "../config/env.js";
import { createDatabasePool, checkConnection } from "../lib/database.js";
import { authRoutes } from "../routes/auth.js";
import { AuditService } from "../modules/audit/service.js";

export async function buildApp() {
  const app = Fastify({ logger: true });
  const db = createDatabasePool(env.DATABASE_URL);
  app.decorate("db", db);

  // 🔥 CORS ABIERTO EN DESARROLLO: Acepta cualquier origen y credenciales
  await app.register(cors, { 
    origin: true, 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  });
  
  await app.register(cookie);
  await app.register(jwt, { secret: env.JWT_SECRET || "ciid-secreto-desarrollo-2026" });
  await app.register(authRoutes);

  app.get("/health", async () => ({ status: "ok" }));
  app.get("/ready", async (req, reply) => {
    const ok = await checkConnection(db);
    return ok ? { status: "ready" } : reply.code(503).send({ status: "not_ready" });
  });

  app.get("/api/v1/audit", async (request: any, reply) => {
    try {
      const token = request.cookies.access_token;
      if (!token) {
        return reply.code(401).send({ success: false, error: "No hay cookie de sesión." });
      }
      const decoded: any = app.jwt.verify(token);
      const audit = new AuditService(db);
      const logs = await audit.consultar(decoded.tenantId, 100);
      return { success: true, data: logs };
    } catch (e: any) {
      return reply.code(401).send({ success: false, error: "Token inválido: " + e.message });
    }
  });

  return app;
}

declare module "fastify" {
  interface FastifyInstance {
    db: any;
  }
}
