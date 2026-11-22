# 11 — Riesgos técnicos

- Acceso a grupos WhatsApp: depende de APIs/permisos; fallback carga controlada/importación autorizada.
- Identidad del segundo perfil legislativo (Mauro Sánchez) sin confirmar.
- Fuentes inaccesibles deben registrarse, no asumir "sin novedades".
- Prompt injection desde documentos: sanitizar y no ejecutar instrucciones embebidas.
- Multi-tenant: riesgo de cross-tenant si guard falla; pruebas obligatorias.
- Costos LLM y rate limits.
- Storage privado y URLs firmadas con expiración.
- Backups y restauración probados.
