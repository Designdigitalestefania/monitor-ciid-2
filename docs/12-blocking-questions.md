# Decisiones y preguntas pendientes de MONITOR CIID 2.0

## Decisiones confirmadas por la dirección del proyecto

1. **Dirección general de Monitor Noticias:** Carlos Salazar Hernández.
2. **Dirección y arquitectura de MONITOR CIID:** Estefanía Pérez Vázquez.
3. **Infraestructura objetivo inicial:** Supabase, sujeto a límites y disponibilidad del plan gratuito.
4. **Integraciones sociales:** no hay API de WhatsApp ni de Facebook por el momento; iniciar con carga o importación autorizada.
5. **Radar Legislativo:** la dirección confirma que el perfil/enlace previamente proporcionado corresponde a Mauro Cruz Sánchez.
6. **Principio editorial:** agentes asistenciales; aprobación y publicación exclusivamente humanas.
7. **Presupuesto inicial:** priorizar herramientas gratuitas y limitar el alcance a un piloto no crítico.

## Recomendaciones aceptadas como base de diseño

- Usar las opciones gratuitas solo para desarrollo y validación inicial, sin prometer continuidad, respaldo ni SLA.
- No ejecutar despliegues pagados ni guardar secretos en Git.
- Configurar Supabase Auth antes de habilitar usuarios reales.
- Registrar la publicación humana realizada fuera de la plataforma, sin automatizar distribución inicialmente.
- Usar fuentes institucionales accesibles y autorizadas para el primer piloto.
- Separar autoría y aprobación editorial siempre que sea posible.

## Pendientes que bloquean el uso con datos reales o producción

1. Crear proyecto Supabase y configurar acceso solo por canal de secretos local/gestionado. No enviar claves en el chat ni subir `.env`.
2. Confirmar región de datos, clasificación de información, retención, eliminación y responsables de acceso.
3. Revisar autenticación/membresías y permisos granularmente; toda ruta de negocio debe verificar tenant y permiso en backend.
4. Definir quién aprueba contenido y la política formal de separación autor/revisor.
5. Confirmar autorización y procedimiento de carga de materiales provenientes de cada equipo o fuente.
6. Definir fuentes institucionales concretas para Radar Legislativo y la evidencia de identidad que acompañará los perfiles.
7. Definir presupuesto/volumen y límites de archivo para el piloto; no superar las cuotas gratuitas vigentes.
8. Confirmar logo oficial y lineamientos visuales.
9. Diseñar y probar una estrategia de backup/restauración fuera de cualquier promesa implícita del plan gratuito.
10. No desplegar ni habilitar procesamiento de información sensible hasta cerrar las revisiones de seguridad.

## Estado de autorización

El trabajo de ingeniería está autorizado únicamente en la rama de trabajo `phase-0-security-and-foundation`. Esto no autoriza despliegues, cambios de producción, publicación automática ni carga de información sensible.
