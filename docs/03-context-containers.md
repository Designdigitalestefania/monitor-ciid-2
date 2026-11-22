# 03 — Diagrama de contexto y contenedores

## Contexto (C4)
Actores: Periodista, Editor, Reviewer, Admin, Sistema/Agentes.
Sistemas externos: Fuentes (WhatsApp/email/canales), Fuentes legislativas (Congreso, Gacetas, FB públicos), Object Storage S3, PostgreSQL, Proveedores LLM.

## Contenedores
- Web (Next.js) — UI responsive, móvil primero.
- API (Fastify) — REST /api/v1, auth, RBAC, tenant guard.
- Worker (Node) — colas, pipeline, agentes, reportes.
- PostgreSQL — datos transaccionales.
- Object Storage privado — binarios, hashes.
- Queue (Redis/pg-boss).

Flujo: Web → API → DB/Storage/Queue; Worker consume Queue → DB/Storage → notificaciones.
