# MONITOR CIID 2.0 — Arquitectura General

## 1. Visión
Plataforma modular, multi-tenant y escalable de información periodística. La tecnología asiste; el periodista decide. Ningún agente publica de forma autónoma.

## 2. Stack
- Node.js LTS, TypeScript
- Fastify (API REST), Next.js + React (web)
- Zod, PostgreSQL (Supabase alternativa)
- S3-compatible private object storage
- Workers + colas (BullMQ/Redis o pg-boss)
- Git/GitHub, Railway (deploy)

## 3. Monorepo
```
monitor-ciid-2/
├── apps/api          # Fastify API
├── apps/web          # Next.js UI
├── packages/contracts # Zod schemas compartidos
├── packages/domain    # Entidades y lógica de dominio
├── packages/database  # ORM/migraciones/queries
├── packages/security  # auth, RBAC, tenant guard
├── packages/agents-sdk # contratos de agentes
├── packages/shared    # utils comunes
├── services/worker    # procesamiento async
├── infrastructure/migrations
├── infrastructure/seeds
├── tests/{unit,integration,e2e,fixtures}
├── docs
└── scripts
```

## 4. Multi-tenant
- tenant_id en toda entidad de negocio.
- Tenant activo desde sesión/membresía, nunca del cliente.
- RBAC granular. Aislamiento estricto, pruebas de cross-tenant.
- RLS opcional en Supabase.

## 5. Módulos funcionales
Dashboard, tenants, usuarios/permisos, expedientes, ingesta, fuentes, extracción, clasificación, monitor editorial, radar legislativo, verificación, producción editorial, revisión/decisiones, distribución, preservación, reportes, notificaciones, métricas, auditoría, administración.

## 6. Agentes
- Monitor Editorial: procesa materiales de fuentes autorizadas, conserva original, clasifica, genera propuestas (no publica).
- Radar Legislativo: monitorea fuentes públicas, reporte diario por legislador, estados de fuente explícitos.

## 7. Pipeline
RECEIVED → VALIDATING → STORED → PROCESSING → CLASSIFIED → EDITORIAL_REVIEW → VERIFICATION → DECISION → APPROVED/REJECTED/NEEDS_CHANGES → PUBLICACIÓN HUMANA REGISTRADA → PRESERVED

## 8. Seguridad
Auth segura, RBAC, TLS, storage privado, URLs firmadas, validación MIME/tamaño, queries parametrizadas, Zod, CORS restrictivo, rate limiting, auditoría, backups cifrados, gestión de secretos, protección prompt injection.

## 9. Despliegue
Railway o equivalente; DB PostgreSQL gestionada; storage S3-compatible.
