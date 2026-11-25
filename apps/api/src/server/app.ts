import Fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import jwt from "@fastify/jwt";
import { env } from "../config/env.js";
import { createDatabasePool, checkConnection } from "../lib/database.js";
import { authRoutes } from "../routes/auth.js";
import { monitorEditorialRoutes } from "../routes/monitor-editorial.js";
import { radarLegislativoRoutes } from "../routes/radar-legislativo.js";
import { AuditService } from "../modules/audit/service.js";
import { authPlugin } from "../plugins/auth.js";

export async function buildApp() {
  const app = Fastify({
    logger: {
      redact: {
        paths: ["req.headers.authorization", "req.headers.cookie", "res.headers.set-cookie"],
        censor: "[REDACTED]",
      },
    },
  });
  const db = createDatabasePool(env.DATABASE_URL);
  app.decorate("db", db);

  await app.register(cors, {
    origin: (origin, callback) => callback(null, !origin || env.CORS_ORIGINS.includes(origin)),
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Request-Id"],
  });

  await app.register(cookie);
  await app.register(jwt, { secret: env.JWT_SECRET });
  await app.register(authPlugin);
  await app.register(authRoutes);
  await app.register(monitorEditorialRoutes);
  await app.register(radarLegislativoRoutes);

  app.get("/health", async () => ({ status: "ok" }));
  app.get("/ready", async (_request, reply) => {
    const ready = await checkConnection(db);
    return ready ? { status: "ready" } : reply.code(503).send({ status: "not_ready" });
  });

  app.get("/api/v1/audit", { preHandler: app.authenticate }, async (request, reply) => {
    const identity = request.user as { tenantId?: string; role?: string };
    if (!identity.tenantId) {
      return reply.code(403).send({ success: false, error: "No hay un tenant activo autorizado." });
    }
    if (!["admin", "editor", "reviewer", "DIRECTOR"].includes(identity.role ?? "")) {
      return reply.code(403).send({ success: false, error: "Permiso insuficiente." });
    }
    const audit = new AuditService(db);
    const logs = await audit.consultar(identity.tenantId, 100);
    return { success: true, data: logs };
  });

  app.addHook("onClose", async () => {
    await db.end();
  });

  return app;
}

declare module "fastify" {
  interface FastifyInstance {
    db: import("pg").Pool;
  }
}
