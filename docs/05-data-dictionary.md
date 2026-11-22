# 05 — Diccionario de datos (resumen por tabla)

Campos comunes: id UUID PK, tenant_id UUID FK, created_at TIMESTAMPTZ, updated_at TIMESTAMPTZ.

- tenants: name, slug UNIQUE, status, settings JSONB.
- users: email UNIQUE, name, password_hash, status.
- tenant_memberships: user_id, tenant_id, status.
- roles: name, description.
- permissions: code UNIQUE, description.
- role_permissions: role_id, permission_id.
- membership_roles: membership_id, role_id.
- sessions: user_id, token_hash, expires_at, ip, user_agent.
- expedientes: title, description, status, owner_user_id.
- materials: source_id, title, type, received_at, hash_sha256, storage_key, mime_type, size_bytes, status, metadata JSONB.
- sources: name, type, channel, external_ref, verified bool, status.
- source_references: material_id, source_id, provenance JSONB.
- documents: material_id, extracted_text, language, page_count, extraction_status.
- evidences: material_id, kind, locator, hash, metadata JSONB.
- claims: text, status, confidence.
- claim_evidence: claim_id, evidence_id, relation.
- classifications: material_id, category, tags JSONB, confidence.
- pipeline_runs: material_id, current_state, started_at, finished_at.
- pipeline_events: run_id, from_state, to_state, actor, reason.
- agent_runs: agent_name, input_ref, output JSONB, status, started_at, finished_at.
- agent_findings: run_id, kind, payload JSONB, confidence.
- jobs: queue, payload JSONB, status, attempts, last_error, idempotency_key UNIQUE.
- editorial_drafts: material_id, title, hook, body, context, cta, hashtags, status.
- editorial_decisions: draft_id, decision (approved/rejected/needs_changes), reviewer_id, notes.
- publications: draft_id, published_by_user_id, published_at, channel, external_url.
- legislators: name, profile_url, party, district, status, verified_identity bool.
- monitored_sources: url, type, status (consulted/partial/no_access/error/no_news).
- legislative_activities: legislator_id, kind, title, description, date, source_url, verified bool.
- monitoring_runs: legislator_id, started_at, finished_at, summary JSONB.
- reports: type, scope, period_start, period_end, content JSONB, file_key.
- notifications: user_id, type, payload JSONB, read_at.
- metrics_snapshots: metric, value, period, metadata JSONB.
- audit_logs: actor_user_id, action, entity, entity_id, diff JSONB, ip, created_at.

Índices: tenant_id en todas; hash_sha256; status; fechas; FKs.
Deduplicación: materials.hash_sha256 + tenant_id UNIQUE parcial; mantener provenance en source_references.
Storage: binarios en S3 privado; DB guarda storage_key + sha256.
