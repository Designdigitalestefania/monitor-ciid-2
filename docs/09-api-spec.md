# 09 — Especificación inicial de API

Base: /api/v1. Auth: Bearer JWT (access + refresh). Paginación: page/limit. Errores: RFC 7807.

Rutas:
- /health, /ready
- /auth/{login,refresh,logout,me}
- /tenants, /tenants/{id}
- /users, /memberships, /roles, /permissions
- /expedientes
- /materials, /materials/{id}/download (signed url)
- /sources
- /documents
- /evidences, /claims, /claim-evidence
- /classifications
- /pipeline/runs, /pipeline/events
- /agents/runs, /agents/findings
- /legislators, /monitored-sources, /legislative-activities, /monitoring-runs
- /editorial-drafts, /editorial-decisions
- /publications
- /reports
- /metrics
- /notifications
- /audit-logs

Cada ruta: Zod validation, tenant guard, RBAC, OpenAPI doc.
