# Bitácora profesional del proyecto MONITOR CIID 2.0

**Producto:** Centro Inteligente de Información Digital de Monitor Noticias  
**Dirección General de Monitor Noticias:** Carlos Salazar Hernández  
**Dirección y arquitectura del proyecto:** Estefanía Pérez Vázquez  
**Principio institucional:** La tecnología asiste. El periodista decide.  
**Repositorio:** `Designdigitalestefania/monitor-ciid-2`  

## Propósito

Mantener un registro verificable de decisiones, cambios, validaciones, riesgos y pendientes. Esta bitácora no sustituye los issues, revisiones de código ni el registro técnico de auditoría de la aplicación.

## Registro de inicio

| Fecha | Tipo | Registro | Estado |
|---|---|---|---|
| 2026-11-25 | Gobernanza | Carlos Salazar Hernández queda identificado por la dirección del proyecto como Director General de Monitor Noticias. Estefanía Pérez Vázquez dirige y arquitecta MONITOR CIID. | Confirmado por la dirección del proyecto |
| 2026-11-25 | Alcance | Iniciar con herramientas gratuitas, límites de piloto y sin despliegue pagado. | Acordado como objetivo; revisar límites del proveedor antes de usar |
| 2026-11-25 | Infraestructura | Supabase se adopta como opción prevista para el piloto. No hay credenciales de proyecto compartidas ni se ha conectado una instancia. | Pendiente de configuración segura |
| 2026-11-25 | Integraciones | No hay API de WhatsApp ni Facebook. El ingreso inicial será carga/importación autorizada y manual. | Confirmado |
| 2026-11-25 | Radar | La dirección confirma que el enlace previamente indicado corresponde a Mauro Cruz Sánchez. | Identidad reportada; conservar enlace y evidencia de referencia |
| 2026-11-25 | Editorial | Ningún agente podrá aprobar ni publicar. Se recomienda separación entre redacción y aprobación. | Regla institucional; pruebas pendientes |
| 2026-11-25 | Ingeniería | Trabajo inicial aislado en `phase-0-security-and-foundation`; no desplegar ni modificar `main`. | En curso |

## Bitácora de cambios de ingeniería

### Entrada 001 — Endurecimiento inicial de configuración y auditoría

- **Objetivo:** eliminar secretos por defecto, restringir CORS, proteger logs y evitar fallas silenciosas de auditoría.
- **Archivos previstos:** `.env.example`, `apps/api/src/config/env.ts`, `apps/api/src/server/app.ts`, `apps/api/src/modules/audit/service.ts`, `scripts/seed.ts`.
- **Pruebas requeridas:** instalación limpia; compilación; pruebas de rutas públicas/protegidas; rechazo de configuración débil; revisión del seed; comprobación de límites de lectura de auditoría.
- **Resultado:** completar después de ejecutar CI en la rama.
- **Riesgos/pendientes:** el esquema actual de membresías y roles y la autenticación todavía requieren revisión integral; no declarar listo para producción.

## Plantilla para cada entrega

- Fecha y responsable:
- Fase/issue/PR:
- Objetivo y alcance:
- Archivos creados/modificados:
- Migraciones o cambios de datos:
- Comandos ejecutados:
- Pruebas ejecutadas y resultados observables:
- Hallazgos, errores y correcciones:
- Riesgos y pendientes:
- Decisión humana requerida:
- Estado: propuesto / en curso / bloqueado / validado / rechazado.

## Criterios de calidad

1. No registrar credenciales, tokens, contraseñas ni datos privados en bitácoras, commits, prompts o logs.
2. Separar hechos confirmados, decisiones, supuestos y propuestas.
3. Cada afirmación automática debe conservar procedencia y permitir revisión humana.
4. Cada cambio funcional debe tener pruebas pertinentes y resultados registrados; no afirmar pruebas no ejecutadas.
5. No hacer despliegues, cambios destructivos ni publicaciones sin autorización explícita.
6. Registrar incidentes y fallas de auditoría; no ocultarlos ni continuar como si hubieran tenido éxito.
7. Los documentos de esta bitácora son registros del proyecto, no evidencia de que el sistema ya sea seguro o esté listo para producción.
