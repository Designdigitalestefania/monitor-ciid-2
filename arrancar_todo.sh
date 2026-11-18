#!/bin/bash
set -e

echo "============================================================"
echo "🔧 CORRIGIENDO Y ARRANCANDO MONITOR CIID 2.0"
echo "============================================================"

cd ~/monitor-ciid-2

# ==========================================
# PASO 1: Corregir plugins/auth.ts
# ==========================================
echo -e "\n🔐 PASO 1: Corrigiendo plugin de autenticación..."
cat > apps/api/src/plugins/auth.ts << 'AUTH_EOF'
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import jwt from "@fastify/jwt";

export async function authPlugin(app: FastifyInstance) {
  app.register(jwt, { secret: process.env.JWT_SECRET || "ciid-secreto-desarrollo-2026" });

  app.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch {
      reply.code(401).send({ success: false, error: "No autorizado." });
    }
  });
}

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}
AUTH_EOF
echo "✅ auth.ts corregido"

# ==========================================
# PASO 2: Corregir server/app.ts (buildApp como async)
# ==========================================
echo -e "\n🔌 PASO 2: Corrigiendo ensamblaje de la API..."
cat > apps/api/src/server/app.ts << 'APP_EOF'
import Fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import { env } from "../config/env.js";
import { createDatabasePool, checkConnection } from "../lib/database.js";
import { authPlugin } from "../plugins/auth.js";
import { authRoutes } from "../routes/auth.js";
import { AuditService } from "../modules/audit/service.js";

export async function buildApp() {
  const app = Fastify({ logger: true });
  const db = createDatabasePool(env.DATABASE_URL);
  app.decorate("db", db);

  await app.register(cors, { origin: env.CORS_ORIGIN, credentials: true });
  await app.register(cookie);
  await app.register(authPlugin);

  app.get("/health", async () => ({ status: "ok" }));
  app.get("/ready", async (req, reply) => {
    const ok = await checkConnection(db);
    return ok ? { status: "ready" } : reply.code(503).send({ status: "not_ready" });
  });

  await app.register(authRoutes);

  app.get("/api/v1/audit", { preHandler: [app.authenticate] }, async (request: any) => {
    const audit = new AuditService(db);
    const logs = await audit.consultar(request.user.tenantId, 100);
    return { success: true, data: logs };
  });

  return app;
}

declare module "fastify" {
  interface FastifyInstance {
    db: any;
    authenticate: (request: any, reply: any) => Promise<void>;
  }
}
APP_EOF
echo "✅ app.ts corregido"

# ==========================================
# PASO 3: Corregir index.ts (buildApp ahora es async)
# ==========================================
echo -e "\n🚀 PASO 3: Corrigiendo index.ts..."
cat > apps/api/src/index.ts << 'INDEX_EOF'
import { buildApp } from "./server/app.js";
import { env } from "./config/env.js";

async function start() {
  const app = await buildApp();
  try {
    await app.listen({ port: env.PORT, host: "0.0.0.0" });
    app.log.info(`API en puerto ${env.PORT}`);
  } catch (e) {
    app.log.error(e);
    process.exit(1);
  }
}

start();
INDEX_EOF
echo "✅ index.ts corregido"

# ==========================================
# PASO 4: Verificar que el .env y las migraciones estén bien
# ==========================================
echo -e "\n📋 PASO 4: Verificando configuración..."
if [ ! -f "apps/api/.env" ] || ! grep -q "DATABASE_URL=postgresql" apps/api/.env; then
  echo "❌ Error: apps/api/.env no está configurado."
  exit 1
fi
echo "✅ Configuración OK"

# ==========================================
# PASO 5: Arrancar todo
# ==========================================
echo -e "\n🚀 PASO 5: Arrancando el sistema completo..."
echo "   API: http://localhost:3001"
echo "   Web: http://localhost:3000"
echo "   Presiona Ctrl+C para detener."
echo ""
npm run dev
