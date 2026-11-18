#!/bin/bash

echo "============================================================"
echo "🔧 REINICIANDO MONITOR CIID 2.0 - LIMPIEZA TOTAL"
echo "============================================================"

# 1. Matar procesos en puertos 3000 y 3001
echo -e "\n🧹 PASO 1: Liberando puertos 3000 y 3001..."
if command -v lsof &> /dev/null; then
  lsof -ti:3000 | xargs -r kill -9 2>/dev/null
  lsof -ti:3001 | xargs -r kill -9 2>/dev/null
  echo "✅ Puertos liberados con lsof"
else
  # Alternativa si no hay lsof
  fuser -k 3000/tcp 2>/dev/null
  fuser -k 3001/tcp 2>/dev/null
  echo "✅ Puertos liberados con fuser"
fi

# 2. Corregir app.ts con lectura explícita de cookie
echo -e "\n📝 PASO 2: Corrigiendo app.ts..."
cd ~/monitor-ciid-2
cat > apps/api/src/server/app.ts << 'APP_EOF'
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

  await app.register(cors, { origin: env.CORS_ORIGIN, credentials: true });
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
APP_EOF
echo "✅ app.ts corregido"

# 3. Arrancar la API
echo -e "\n🚀 PASO 3: Arrancando la API en el puerto 3001..."
echo "   (Presiona Ctrl+C para detener)"
echo ""
cd apps/api
npx tsx src/index.ts
