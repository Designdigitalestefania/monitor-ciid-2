# 02 — Árbol del monorepo

```
monitor-ciid-2/
├── apps/
│   ├── api/
│   │   ├── src/{config,index.ts,lib,modules,plugins,routes,server}
│   │   └── package.json
│   └── web/
│       ├── src/{app,components,lib}
│       └── package.json
├── packages/
│   ├── contracts/     # Zod schemas + DTOs
│   ├── domain/        # entities, value objects, domain services
│   ├── database/      # db client, repos, migrations helpers
│   ├── security/      # auth, RBAC, tenant guard, hashing
│   ├── agents-sdk/    # agent contracts, runner, prompts
│   └── shared/        # utils, logger, errors
├── services/
│   └── worker/        # queue consumers, pipelines
├── infrastructure/
│   ├── migrations/    # SQL versionadas
│   └── seeds/
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   └── fixtures/
├── docs/
├── scripts/
├── .github/workflows/
├── package.json (workspaces)
├── tsconfig.base.json
└── .env.example
```

Responsabilidades:
- contracts: validación compartida API/web/worker.
- domain: reglas de negocio puras, sin infra.
- database: acceso a datos y migraciones.
- security: autenticación/autorización/tenant.
- agents-sdk: ejecución de agentes y salidas estructuradas.
- shared: utilidades transversales.
- worker: jobs asíncronos, reintentos, idempotencia.
