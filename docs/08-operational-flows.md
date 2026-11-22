# 08 — Flujos operativos

## Ingesta
RECEIVED → VALIDATING (Zod, MIME, tamaño, tenant) → STORED (hash+storage) → PROCESSING → CLASSIFIED → EDITORIAL_REVIEW.

## Verificación
Afirmaciones extraídas → vinculación con evidencias → estado verified/unverified/pending. No publicar sin verificación suficiente.

## Distribución
Decisión aprobada → registro de publicación humana (quién, cuándo, canal) → PRESERVED.

## Preservación
Mantener original + hash + metadata + auditoría; backups cifrados + pruebas de restauración.

## Reintentos
Errores recuperables: reintentos limitados con backoff; idempotencia por idempotency_key.
