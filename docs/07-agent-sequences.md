# 07 — Diagramas de secuencia de agentes

## Monitor Editorial
1. Fuente autorizada envía material → API ingesta.
2. API valida tenant/permisos, calcula SHA-256, dedup check.
3. Guarda binario en storage privado, metadata en materials.
4. Encola job pipeline.
5. Worker: extracción (texto/OCR), clasificación, entidades.
6. Agent run: genera draft (título, hook, desarrollo, contexto, cierre, CTA, hashtags moderados, observaciones, propuesta gráfica/Reel).
7. Estado → EDITORIAL_REVIEW; notifica editor.
8. Humano revisa/aprueba/rechaza → decisión registrada.
9. Si aprobado → registro de publicación humana → PRESERVED.

## Radar Legislativo
1. Scheduler dispara monitoring_run por legislador.
2. Worker consulta fuentes (Congreso, gacetas, FB públicos, etc.).
3. Registra estado por fuente (consulted/partial/no_access/error/no_news).
4. Extrae actividades/declaraciones/anuncios.
5. Agent run genera reporte diario (periodo, fuentes, novedades, actividades, declaraciones, temas, enlaces, observaciones).
6. No declarar ausencia si fuente no consultada.
7. Guarda reporte, notifica.
8. Humano valida antes de uso editorial.
