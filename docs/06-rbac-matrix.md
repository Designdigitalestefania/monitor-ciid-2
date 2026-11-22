# 06 — Matriz de roles y permisos

Roles: admin, editor, journalist, reviewer, system.

Permisos (código): tenant.manage, users.manage, roles.manage, expedientes.*, materials.*, sources.*, documents.read, evidences.*, claims.*, classifications.*, pipeline.*, agents.run, legislators.*, monitoring.*, drafts.*, decisions.*, publications.register, reports.*, metrics.read, audit.read, notifications.read.

Matriz (X=permitido):
- admin: todos.
- editor: expedientes CRUD, materials CRUD, sources CRUD, drafts CRUD, decisions read, reports read/write, metrics read, notifications read.
- journalist: expedientes read/create, materials read/create, sources read, drafts create/read, claims read/create, classifications read, reports read, notifications read.
- reviewer: expedientes read, materials read, drafts read, decisions approve/reject, claims read, reports read, audit read.
- system: jobs/pipeline/agents/monitoring ejecución, audit write, sin aprobación editorial.

Regla: publicación solo con decisión humana aprobada (publication.register exige approved draft).
Bloqueo: ningún rol de agente/system puede registrar publicación.
