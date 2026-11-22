<div align="center">

# MONITOR CIID 2.0

**Centro Inteligente de Información Digital**

[![Version](https://img.shields.io/badge/version-2.0.0-blue?style=for-the-badge)](https://github.com/Designdigitalestefania/monitor-ciid-2)
[![Tests](https://img.shields.io/badge/tests-passing-success?style=for-the-badge)](#pruebas)
[![License](https://img.shields.io/badge/license-Proprietary-red?style=for-the-badge)](LICENSE)

<p><em>"La tecnología asiste. El periodista decide."</em></p>

**Monitor Noticias** — Periodismo confiable. Hechos que Impactan.

</div>

---

## Descripción

MONITOR CIID 2.0 es una plataforma modular de gestión, recepción, procesamiento, clasificación, verificación y seguimiento de información para **Monitor Noticias**.

Integra dos agentes especializados:
- **Monitor Editorial**: Procesa materiales de comunicación social.
- **Radar Legislativo**: Monitorea fuentes públicas.

**Principio institucional**: Ningún agente tiene autorización para publicar información de manera autónoma.

---

## Requisitos

- **Node.js** >= 20.0.0
- **PostgreSQL** >= 15.0 (Supabase)
- **Git** >= 2.40

---

## Instalación

```bash
git clone https://github.com/Designdigitalestefania/monitor-ciid-2.git
cd monitor-ciid-2
npm install
cp .env.example apps/api/.env
# Edita apps/api/.env con tu DATABASE_URL
npx tsx scripts/seed.ts
npm run dev
