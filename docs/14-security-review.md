# Revisión de seguridad y estado de la base

## Alcance de esta revisión

Revisión estática del estado inicial del repositorio y correcciones de configuración aplicadas en la rama `phase-0-security-and-foundation`. No equivale a auditoría externa, prueba de penetración, certificación ni validación de producción.

## Hallazgos revisados

| Prioridad | Hallazgo | Tratamiento inicial | Estado |
|---|---|---|---|
| Crítica | El seed contenía una contraseña fija y mostraba credenciales de usuario en salida. | El seed ya no crea cuentas ni contraseñas; solo inicializa el tenant. | Corregido en esta entrega; validar con CI |
| Alta | Existía una clave JWT de respaldo embebida en el servidor. | Eliminada; `JWT_SECRET` ahora es obligatorio y debe tener al menos 32 caracteres. | Corregido en código; probar configuración |
| Alta | CORS reflejaba cualquier origen. | Se limita a una lista de orígenes permitidos mediante `CORS_ORIGINS`. | Corregido en código; requiere prueba de integración |
| Alta | La ruta de auditoría verificaba JWT manualmente y no aplicaba permiso explícito. | Se conecta el plugin de autenticación y se añade una comprobación inicial de rol. | Parcial; RBAC centralizado y membresía vigente pendientes |
| Alta | El servicio de auditoría ignoraba fallas de escritura. | Ahora propaga un error seguro y valida el límite de consulta. | Corregido en código; verificar pruebas |
| Media | Los logs podían incluir cookies o encabezados de autorización. | Fastify configura redacción para esos campos. | Mitigación inicial; revisar todos los logs y proxies |
| Alta | El login propio y el modelo de roles/membresías anteceden a la decisión de Supabase Auth. | No se declara resuelto por esta entrega. Integración y migración segura quedan bloqueantes antes de producción. | Pendiente |

## Límites conocidos y bloqueos para producción

- Revisar y probar el flujo completo de autenticación con Supabase Auth; no usar la contraseña de ejemplo del seed (ya retirada).
- Verificar en cada petición la identidad, membresía activa, tenant autorizado y permiso granular desde almacenamiento confiable; un claim JWT por sí solo no demuestra membresía vigente.
- Revisar todas las rutas existentes por autenticación, Zod, RBAC, rate limiting, errores y protección de referencias entre tenants.
- Implementar y probar restricciones de tenant en PostgreSQL/RLS con una clave de conexión que no evada RLS.
- Revisar migraciones y claves foráneas compuestas para impedir referencias cruzadas entre tenants.
- Añadir pruebas automatizadas de aislamiento, aprobación humana, manejo de fuente inaccesible y escritura de auditoría.
- Configurar límites de carga, verificación real de MIME, almacenamiento privado y estrategia de respaldo/restauración.
- Confirmar límites y condiciones actuales del plan gratuito de Supabase antes de almacenar material real. No cargar información confidencial en un entorno piloto sin autorización institucional.

## Criterio de aceptación de esta etapa

La etapa se considera técnicamente validada solo después de CI verde y revisión de los resultados de compilación y pruebas. Incluso con CI verde, el proyecto sigue siendo un prototipo y no está declarado listo para producción.
