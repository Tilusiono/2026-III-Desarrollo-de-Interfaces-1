# EventHub — Documentación de mi proyecto

## 1. Descripción del proyecto

EventHub es una aplicación web desarrollada con HTML, CSS, JavaScript, Bootstrap y Node.js con Express, orientada a facilitar la consulta y gestión de inscripciones a eventos.

La aplicación permite explorar eventos disponibles, buscar por nombre, filtrar por categoría, consultar información detallada, registrar participantes y cancelar inscripciones sin necesidad de recargar la página.

El proyecto aplica principios de diseño de interfaces, experiencia de usuario y Programación Orientada a Objetos.

## 2. Situación problemática

Una empresa organizadora de eventos necesita una aplicación web que facilite el registro de participantes, la consulta de información sobre los eventos y la administración de las inscripciones realizadas.

El sistema debe ofrecer una interfaz intuitiva, adaptable y accesible para los usuarios, permitiendo así que los usuarios realicen sus operaciones de forma dinámica.

EventHub propone una solución mediante una aplicación web que centraliza la información de los eventos y simplifica el proceso de inscripción y cancelación.

## 3. Identificación de usuarios

**Usuario principal: Participante**

Es la persona interesada en asistir a conferencias, talleres, ferias u otros eventos.

Sus necesidades principales son:

- Encontrar eventos de manera rápida.
- Consultar fechas, modalidades, ubicaciones y descripciones.
- Inscribirse mediante un formulario sencillo.
- Evitar inscripciones duplicadas.
- Consultar sus registros realizados en el navegador.
- Cancelar una inscripción cuando lo necesite.
- Utilizar la aplicación desde diferentes dispositivos.

**Parte interesada: Empresa organizadora**

Es la organización que necesita ofrecer un servicio digital para facilitar la inscripción a sus actividades.

Sus principales necesidades son:

- Presentar información clara y organizada.
- Reducir la complejidad del registro de participantes.
- Ofrecer procesos de inscripción y cancelación comprensibles.
- Contar con una interfaz adaptable y fácil de mantener.

En esta versión académica no se ha implementado un panel administrativo para gestionar eventos o consultar registros de múltiples dispositivos.

## 4. Requisitos funcionales

| Código | Requisito | Estado |
|---|---|---|
| RF-01 | Visualizar los eventos disponibles | Implementado |
| RF-02 | Buscar eventos por nombre | Implementado |
| RF-03 | Filtrar eventos por categoría | Implementado |
| RF-04 | Consultar detalles mediante ventanas modales | Implementado |
| RF-05 | Seleccionar automáticamente el evento al pulsar Inscribirme | Implementado |
| RF-06 | Registrar participantes mediante formulario | Implementado |
| RF-07 | Validar los datos ingresados | Implementado |
| RF-08 | Impedir inscripciones duplicadas por correo y evento | Implementado |
| RF-09 | Mostrar las inscripciones realizadas | Implementado |
| RF-10 | Cancelar inscripciones | Implementado |
| RF-11 | Conservar inscripciones utilizando localStorage | Implementado |
| RF-12 | Actualizar la interfaz sin recargar la página | Implementado |

## 5. Requisitos no funcionales

| Código | Requisito | Implementación o verificación |
|---|---|---|
| RNF-01 | Usabilidad | Navegación clara, formularios etiquetados y mensajes de confirmación |
| RNF-02 | Diseño responsive | Uso de Bootstrap y CSS adaptable |
| RNF-03 | Accesibilidad básica | Navegación con teclado, etiquetas, atributos ARIA y modales accesibles |
| RNF-04 | Mantenibilidad | Separación de HTML, CSS, JavaScript y clases de modelos |
| RNF-05 | Integridad de registros | Validación de campos y prevención de duplicados |
| RNF-06 | Persistencia local | Almacenamiento en localStorage del navegador |

## 6. Alcance y limitaciones

EventHub es un prototipo académico ejecutado mediante un servidor local de Express.

Los datos de inscripción se almacenan en localStorage, por lo que permanecen únicamente en el navegador y perfil donde fueron registrados. No se sincronizan entre dispositivos ni usuarios.

Esta versión no incluye autenticación, base de datos, administración de eventos desde un panel o almacenamiento centralizado.

Para las pruebas y demostraciones se utilizarán datos ficticios, debido a que localStorage no es una solución adecuada para almacenar datos personales sensibles en una aplicación de producción.