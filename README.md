# MONITOR CIID 2.0

**Centro Inteligente de Información Digital de Monitor Noticias**  
**Dirección General de Monitor Noticias:** Carlos Salazar Hernández  
**Dirección y arquitectura del proyecto:** Estefanía Pérez Vázquez  

> La tecnología asiste. El periodista decide.

MONITOR CIID es una plataforma modular para recibir y preservar materiales autorizados, apoyar su clasificación y verificación, preparar propuestas editoriales y registrar decisiones humanas. Los agentes no aprueban ni publican autónomamente.

## Estado del proyecto

El repositorio contiene una base inicial de monorepo, API, interfaz, migraciones y documentación. La rama `phase-0-security-and-foundation` es de trabajo. El estado actual no representa un producto listo para producción y no debe usarse con información confidencial hasta completar las revisiones de seguridad y privacidad.

## Piloto con presupuesto cero

- Código y colaboración: GitHub Free.
- Base de datos, autenticación y archivos: Supabase Free como opción, tras verificar sus condiciones y cuotas actuales.
- Desarrollo local primero; no se presupone que los servicios gratuitos mantengan workers activos o garanticen disponibilidad.
- Sin integración de WhatsApp/Facebook hasta contar con API y autorización; usar carga/importación controlada.
- Sin proveedores de IA de pago; cualquier herramienta externa requiere revisión de privacidad y aprobación.

Los planes gratuitos pueden cambiar, tener límites o suspender servicios. Mantener copias locales de trabajo, no cargar secretos al repositorio y no depender de una cuenta gratuita como único respaldo.

## Requisitos para desarrollo local

- Node.js LTS compatible con las dependencias del repositorio.
- npm y Git.
- Proyecto PostgreSQL/Supabase configurado únicamente cuando se esté listo para probar persistencia.

Las versiones y compatibilidad deben verificarse antes de instalar o actualizar dependencias.

## Configuración segura

1. Copiar `.env.example` a `apps/api/.env`.
2. Completar `DATABASE_URL` y generar `JWT_SECRET` de manera local (`openssl rand -base64 48`).
3. No compartir credenciales por chat, issues, commits o capturas; usar el gestor de secretos correspondiente.
4. Aplicar migraciones solo a una base de desarrollo revisada.
5. No utilizar el seed para crear credenciales; el seed solo inicializa el tenant.

## Gobernanza y decisiones

- Bitácora del proyecto: `docs/13-project-log.md`.
- Revisión y límites de seguridad: `docs/14-security-review.md`.
- Plan por fases: `docs/10-implementation-plan.md`.
- Decisiones y pendientes: `docs/12-blocking-questions.md`.

## Verificación

No se debe afirmar que un módulo está validado hasta ejecutar y registrar las pruebas correspondientes. Un CI exitoso no sustituye revisión de seguridad, pruebas de aislamiento multi-tenant, pruebas de restauración ni aprobación editorial humana.
