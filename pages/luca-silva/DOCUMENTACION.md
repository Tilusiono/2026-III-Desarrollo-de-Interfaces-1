# EventHub — Documentación del proyecto

## 1. Descripción del proyecto

EventHub es una aplicación web desarrollada con HTML, CSS, JavaScript, Bootstrap y Node.js con Express, orientada a facilitar la consulta y gestión de inscripciones a eventos.

La aplicación que diseñe permite explorar eventos disponibles, buscar por nombre, filtrar por categoría, consultar información detallada, registrar participantes y cancelar inscripciones sin necesidad de recargar la página.

Adicionalmente, incorpora un sistema de precios que permite consultar el costo de inscripción, seleccionar materiales adicionales, aplicar cupones de descuento y calcular automáticamente el importe total por pagar.

El proyecto aplica principios de diseño de interfaces, experiencia de usuario y Programación Orientada a Objetos.

## 2. Situación problemática

Una empresa organizadora de eventos necesita una aplicación web que facilite el registro de participantes, la consulta de información sobre los eventos y la administración de las inscripciones realizadas.

El sistema debe ofrecer una interfaz intuitiva, adaptable y accesible para los usuarios, permitiendo que realicen sus operaciones de forma dinámica.

Asimismo, los participantes necesitan conocer anticipadamente los costos asociados a cada evento, seleccionar materiales complementarios y consultar posibles descuentos antes de confirmar su inscripción.

EventHub propone una solución mediante una aplicación web que centraliza la información de los eventos, simplifica los procesos de inscripción y cancelación, y presenta un desglose económico claro de cada registro.

## 3. Identificación de usuarios

**Usuario principal: Participante**

Es la persona interesada en asistir a conferencias, talleres, ferias u otros eventos.

Sus necesidades principales son:

- Encontrar eventos de manera rápida.
- Consultar fechas, modalidades, ubicaciones y descripciones.
- Conocer los precios de inscripción.
- Seleccionar materiales adicionales según sus necesidades.
- Aplicar cupones de descuento disponibles.
- Consultar el importe total antes de registrarse.
- Inscribirse mediante un formulario sencillo.
- Evitar inscripciones duplicadas.
- Consultar sus registros y sus respectivos importes.
- Cancelar una inscripción cuando lo necesite.
- Utilizar la aplicación desde diferentes dispositivos.

**Parte interesada: Empresa organizadora**

Es la organización que necesita ofrecer un servicio digital para facilitar la inscripción a sus actividades.

Sus principales necesidades son:

- Presentar información clara y organizada.
- Informar sobre los precios y servicios adicionales.
- Ofrecer descuentos promocionales.
- Reducir la complejidad del registro de participantes.
- Mantener la consistencia de la información registrada.
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
| RF-13 | Mostrar el precio base de cada evento | Implementado |
| RF-14 | Mostrar los materiales adicionales y sus respectivos precios | Implementado |
| RF-15 | Permitir seleccionar materiales adicionales opcionales | Implementado |
| RF-16 | Calcular dinámicamente el subtotal de la inscripción | Implementado |
| RF-17 | Validar y aplicar cupones de descuento | Implementado |
| RF-18 | Calcular el descuento y el importe total por pagar | Implementado |
| RF-19 | Guardar el detalle económico de cada inscripción en localStorage | Implementado |
| RF-20 | Mostrar el desglose de precios, extras y descuentos en Mis inscripciones | Implementado |
| RF-21 | Detectar correos asociados a nombres de participantes diferentes | Implementado |

### 4.1. Sistema de precios

Cada evento dispone de un precio base y tres materiales adicionales opcionales.

| Evento | Precio base |
|---|---:|
| Conferencia de Tecnología | S/ 150.00 |
| Taller de Diseño Web | S/ 100.00 |
| Feria de Emprendedores | S/ 60.00 |

**Conferencia de Tecnología**

- Kit tecnológico: S/ 40.00.
- Taller práctico: S/ 60.00.
- Certificado: S/ 30.00.

**Taller de Diseño Web**

- Plantillas premium: S/ 25.00.
- Asesoría personalizada: S/ 50.00.
- Certificado: S/ 20.00.

**Feria de Emprendedores**

- Material de negocios: S/ 20.00.
- Acceso a networking: S/ 35.00.
- Taller empresarial: S/ 45.00.

Los precios establecidos son ficticios y se utilizan exclusivamente para la demostración académica del proyecto.

### 4.2. Sistema de descuentos

EventHub incluye un sistema de cupones promocionales.

El código `EVENTHUB10` permite obtener un descuento del 10 % sobre el subtotal de la inscripción.

El sistema comprueba si el cupón ingresado es válido y muestra mensajes de confirmación o error.

Cuando el usuario modifica los materiales seleccionados, el subtotal, el descuento y el total se actualizan automáticamente.

### 4.3. Cálculo del importe final

El cálculo económico sigue estas operaciones:

- Subtotal = Precio base + Total de materiales adicionales.
- Descuento = Subtotal × Porcentaje de descuento.
- Total por pagar = Subtotal − Descuento.

**Ejemplo:**

| Concepto | Importe |
|---|---:|
| Conferencia de Tecnología | S/ 150.00 |
| Kit tecnológico | S/ 40.00 |
| Certificado | S/ 30.00 |
| Subtotal | S/ 220.00 |
| Descuento EVENTHUB10 (10 %) | - S/ 22.00 |
| **Total por pagar** | **S/ 198.00** |

El importe final se almacena junto con los datos de la inscripción para permitir su consulta posterior.

## 5. Requisitos no funcionales

| Código | Requisito | Implementación o verificación |
|---|---|---|
| RNF-01 | Usabilidad | Navegación clara, formularios etiquetados, mensajes de confirmación y resumen económico |
| RNF-02 | Diseño responsive | Uso de Bootstrap y CSS adaptable |
| RNF-03 | Accesibilidad básica | Navegación con teclado, etiquetas, atributos ARIA y modales accesibles |
| RNF-04 | Mantenibilidad | Separación de HTML, CSS, JavaScript y clases de modelos |
| RNF-05 | Integridad de registros | Validación de campos, prevención de duplicados y comprobación de consistencia entre correo y participante |
| RNF-06 | Persistencia local | Almacenamiento de inscripciones y detalles económicos en localStorage |
| RNF-07 | Precisión de cálculos | Cálculo de subtotales, descuentos e importes finales con redondeo a dos decimales |
| RNF-08 | Transparencia de información | Presentación de precios, extras, descuentos y estado de pago antes y después de la inscripción |

## 6. Alcance y limitaciones

EventHub es un prototipo académico ejecutado mediante un servidor local de Express.

Los datos de inscripción se almacenan en localStorage, por lo que permanecen únicamente en el navegador y perfil donde fueron registrados. No se sincronizan entre dispositivos ni usuarios.

El sistema permite calcular importes, seleccionar materiales adicionales y aplicar descuentos, pero no procesa pagos reales ni se conecta con plataformas bancarias o pasarelas de pago.

El estado «Pendiente de pago» es informativo y forma parte de la simulación académica.

Esta versión no incluye autenticación, verificación real de la propiedad de correos electrónicos, base de datos, administración de eventos desde un panel o almacenamiento centralizado.

Las validaciones permiten detectar inconsistencias entre nombres y correos dentro de los registros locales, pero no constituyen un sistema de identificación de personas.

El sistema conserva los datos económicos originales de las nuevas inscripciones, incluso cuando se recarga la página. Las inscripciones antiguas que no contienen información económica se identifican sin asignarles importes ficticios.

Para las pruebas y demostraciones se utilizan datos ficticios, debido a que localStorage no es una solución adecuada para almacenar datos personales sensibles en una aplicación de producción.

## 7. Pruebas funcionales realizadas

Se realizaron pruebas manuales para verificar el funcionamiento de las principales características de EventHub.

| Código | Prueba realizada | Resultado | Estado |
|---|---|---|---|
| PF-01 | Visualización de los tres eventos | Los eventos aparecen correctamente | Correcto |
| PF-02 | Búsqueda de eventos por nombre | Se muestran los resultados coincidentes | Correcto |
| PF-03 | Filtro por categoría | Se muestran únicamente los eventos correspondientes | Correcto |
| PF-04 | Consulta de información mediante modales | Se presentan los detalles del evento | Correcto |
| PF-05 | Selección automática del evento | Se selecciona el evento correspondiente en el formulario | Correcto |
| PF-06 | Registro de participantes | Se registra la inscripción correctamente | Correcto |
| PF-07 | Cancelación de inscripciones | Se elimina el registro seleccionado | Correcto |
| PF-08 | Persistencia de registros | La inscripción permanece después de actualizar la página | Correcto |
| PF-09 | Selección de materiales extras | El subtotal cambia según los materiales seleccionados | Correcto |
| PF-10 | Aplicación del cupón EVENTHUB10 | Se aplica correctamente el 10 % de descuento | Correcto |
| PF-11 | Ingreso de cupón inválido | Se rechaza el cupón y no se aplica descuento | Correcto |
| PF-12 | Conservación del detalle económico | El desglose permanece después de actualizar con F5 | Correcto |
| PF-13 | Inscripción en varios eventos con el mismo correo y participante | Se permiten registros en eventos diferentes | Correcto |
| PF-14 | Intento de inscripción duplicada en un mismo evento | Se rechaza la segunda inscripción | Correcto |
| PF-15 | Correo asociado a otro nombre de participante | Se muestra un mensaje de error | Correcto |
| PF-16 | Navegación con teclado | Funcionan Tab, Enter y Escape en los controles correspondientes | Correcto |
| PF-17 | Visualización responsive | Se comprobó la adaptación en diferentes tamaños de pantalla | Correcto |

### 7.1. Pruebas de cálculos económicos

**Caso 1: Taller de Diseño Web sin extras**

- Precio base: S/ 100.00.
- Materiales adicionales: ninguno.
- Descuento: S/ 0.00.
- Total: S/ 100.00.
- Resultado: correcto.

**Caso 2: Feria de Emprendedores con dos extras**

- Precio base: S/ 60.00.
- Acceso a networking: S/ 35.00.
- Taller empresarial: S/ 45.00.
- Subtotal: S/ 140.00.
- Resultado: correcto.

**Caso 3: Feria de Emprendedores con cupón**

- Subtotal: S/ 140.00.
- Cupón aplicado: EVENTHUB10.
- Descuento: S/ 14.00.
- Total: S/ 126.00.
- Resultado: correcto.

**Caso 4: Conferencia de Tecnología con cupón**

- Precio base: S/ 150.00.
- Kit tecnológico: S/ 40.00.
- Certificado: S/ 30.00.
- Subtotal: S/ 220.00.
- Descuento: S/ 22.00.
- Total: S/ 198.00.
- Resultado: correcto.

## 8. Implementación técnica

### 8.1. Tecnologías utilizadas

- **HTML5:** estructura de las páginas, tarjetas y formularios.
- **CSS3:** estilos personalizados y presentación visual.
- **Bootstrap:** componentes de interfaz, diseño responsive y ventanas modales.
- **JavaScript:** lógica de negocio, eventos del DOM, validaciones y cálculos.
- **Node.js y Express:** ejecución de la aplicación mediante servidor local.
- **localStorage:** persistencia local de inscripciones y detalles económicos.

### 8.2. Programación Orientada a Objetos

El sistema utiliza una estructura de clases basada en herencia y encapsulación.

**Clase base: Evento**

Representa la información común de los eventos y contiene los métodos necesarios para gestionar inscripciones.

Incorpora atributos privados, getters, setter y métodos de registro, consulta y cancelación.

**Subclase: EventoPresencial**

Hereda de Evento e incorpora información específica de actividades presenciales, como la dirección de realización.

**Subclase: EventoVirtual**

Hereda de Evento e incorpora información relacionada con la plataforma virtual utilizada.

Ambas subclases sobrescriben el método `obtenerDetalles()`, aplicando polimorfismo.

### 8.3. Gestión económica

Los precios y materiales adicionales se administran mediante el objeto `tarifasEventos`, que relaciona cada evento con su precio base y sus extras disponibles.

Los cupones se gestionan mediante `cuponesDescuento`.

La función `obtenerDetallePago()` obtiene los materiales seleccionados y calcula el subtotal, el descuento y el importe final.

La función `calcularSubtotal()` actualiza el resumen económico presentado al usuario.

Al confirmar una inscripción, los datos económicos se almacenan junto con los datos del participante en localStorage.

La sección «Mis inscripciones» recupera estos valores y presenta un resumen con el precio base, materiales, descuento y total por pagar.

### 8.4. Actualización dinámica de la interfaz

Los filtros, formularios, selección de materiales y cálculos económicos utilizan eventos del DOM para responder a las acciones del usuario.

Esto permite actualizar la información sin recargar la página y mejora la experiencia de navegación.