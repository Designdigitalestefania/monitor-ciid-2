# 04 — Diagrama Entidad-Relación (resumen)

```
tenants 1--* tenant_memberships *--1 users
tenant_memberships *--* roles (via membership_roles)
roles *--* permissions (role_permissions)
tenants 1--* expedientes
expedientes 1--* materials
materials *--1 sources
materials 1--* documents
materials 1--* evidences
claims *--* evidences (claim_evidence)
materials 1--* classifications
materials 1--* pipeline_runs 1--* pipeline_events
agent_runs 1--* agent_findings
jobs (queue tracking)
editorial_drafts 1--* editorial_decisions
editorial_drafts 1--1 publications (human registered)
legislators 1--* legislative_activities
monitored_sources *--* legislators
monitoring_runs 1--* legislative_activities
reports, notifications, metrics_snapshots, audit_logs (tenant scoped)
sessions *--1 users
```

Todas las entidades de negocio incluyen tenant_id, created_at, updated_at. UUID PK.
