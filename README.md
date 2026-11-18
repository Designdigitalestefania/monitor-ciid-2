# MONITOR CIID 2.0

**Centro Inteligente de Información Digital**

> _"La tecnología asiste. El periodista decide."_

[![Version](https://img.shields.io/badge/version-2.0.0-blue?style=flat-square)](https://github.com/Designdigitalestefania/monitor-ciid-2)
[![License](https://img.shields.io/badge/license-Proprietary-red?style=flat-square)](LICENSE)

## Descripción

Plataforma modular para Monitor Noticias que integra dos agentes especializados:
- **Monitor Editorial**: Procesa materiales de comunicación social.
- **Radar Legislativo**: Monitorea fuentes públicas.

**Principio institucional**: Ningún agente publica de forma autónoma. Toda publicación requiere aprobación humana explícita y auditable.

## Requisitos

- Node.js >= 20.0.0
- PostgreSQL >= 15.0 (Supabase)
- Git >= 2.40

## Instalación

```bash
git clone https://github.com/Designdigitalestefania/monitor-ciid-2.git
cd monitor-ciid-2
npm install
cp .env.example apps/api/.env
# Edita apps/api/.env con tu DATABASE_URL
npx tsx scripts/seed.ts
npm run dev
```

Seguridad

· Contraseñas hasheadas con bcrypt.
· Sesiones JWT con HttpOnly, Secure y SameSite.
· Multi-tenant por tenant_id desde el JWT.
· Auditoría de acciones críticas.
· Consultas SQL parametrizadas.

Licencia

Propietario de Monitor Noticias. Consulta LICENSE.
