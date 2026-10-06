# Práctica: formulario avanzado de solicitud de matrícula

## Escenario

Implementarás un formulario de solicitud de matrícula con más de veinte datos. La solución deberá usar APIs del DOM, validación nativa y personalizada, controles dependientes, archivos, resumen de errores, vista previa y envío asíncrono simulado.

## Entregables

```text
solicitud-matricula-form/
├── index.html
├── css/
│   └── estilos.css
└── js/
    ├── datos.js
    ├── validacion.js
    └── app.js
```

Incluye además:

- Evidencia de pruebas con teclado.
- Capturas de validaciones.
- Matriz de casos de prueba.
- Explicación del modelo construido desde `FormData`.

## Requisitos funcionales

El formulario incluirá al menos los siguientes datos:

1. Tipo de documento.
2. Número de documento.
3. Nombres.
4. Apellido paterno.
5. Apellido materno.
6. Fecha de nacimiento.
7. Correo.
8. Confirmación de correo.
9. Teléfono.
10. Dirección.
11. Departamento.
12. Provincia.
13. Distrito.
14. Programa académico.
15. Modalidad.
16. Turno.
17. Sede.
18. Ciclo de ingreso.
19. Nivel de estudios.
20. Persona de contacto.
21. Teléfono de contacto.
22. Intereses académicos.
23. Documento adjunto.
24. Comentarios.
25. Aceptación de términos.

---

## 1. HTML base

Construye el formulario con secciones semánticas.

```html
<main class="pagina">
  <header class="cabecera">
    <h1>Solicitud de matrícula</h1>
    <p>Complete los datos obligatorios marcados con “Requerido”.</p>
  </header>

  <div id="resumen-errores" tabindex="-1" hidden></div>
  <p id="estado-envio" aria-live="polite"></p>

  <form id="matricula-form" action="/api/matriculas" method="post" novalidate>
    <fieldset>
      <legend>Identificación</legend>

      <label for="tipo-documento">Tipo de documento</label>
      <select id="tipo-documento" name="tipoDocumento" required>
        <option value="">Seleccione</option>
        <option value="DNI">DNI</option>
        <option value="CE">Carné de extranjería</option>
        <option value="PASAPORTE">Pasaporte</option>
      </select>
      <p id="tipo-documento-error" class="error" hidden></p>

      <label for="numero-documento">Número de documento</label>
      <input id="numero-documento" name="numeroDocumento"
             inputmode="numeric" required aria-describedby="numero-documento-ayuda numero-documento-error">
      <small id="numero-documento-ayuda">El formato depende del tipo seleccionado.</small>
      <p id="numero-documento-error" class="error" hidden></p>

      <label for="nombres">Nombres</label>
      <input id="nombres" name="nombres" autocomplete="given-name"
             minlength="2" maxlength="60" required>

      <label for="apellido-paterno">Apellido paterno</label>
      <input id="apellido-paterno" name="apellidoPaterno"
             autocomplete="family-name" maxlength="50" required>

      <label for="apellido-materno">Apellido materno</label>
      <input id="apellido-materno" name="apellidoMaterno" maxlength="50">

      <label for="fecha-nacimiento">Fecha de nacimiento</label>
      <input id="fecha-nacimiento" name="fechaNacimiento" type="date" required>
    </fieldset>

    <fieldset>
      <legend>Contacto</legend>

      <label for="correo">Correo</label>
      <input id="correo" name="correo" type="email" autocomplete="email" required>

      <label for="confirmar-correo">Confirmar correo</label>
      <input id="confirmar-correo" name="confirmarCorreo" type="email" required>

      <label for="telefono">Teléfono</label>
      <input id="telefono" name="telefono" type="tel" autocomplete="tel"
             inputmode="tel" pattern="[0-9]{9}" required>

      <label for="direccion">Dirección</label>
      <input id="direccion" name="direccion" autocomplete="street-address"
             maxlength="120" required>

      <label for="departamento">Departamento</label>
      <select id="departamento" name="departamento" required></select>

      <label for="provincia">Provincia</label>
      <select id="provincia" name="provincia" required disabled></select>

      <label for="distrito">Distrito</label>
      <select id="distrito" name="distrito" required disabled></select>
    </fieldset>

    <fieldset>
      <legend>Información académica</legend>

      <label for="programa">Programa académico</label>
      <select id="programa" name="programa" required>
        <option value="">Seleccione</option>
        <option value="DESARROLLO_SOFTWARE">Desarrollo de Software</option>
        <option value="DISENO_INTERFACES">Diseño de Interfaces</option>
        <option value="REDES">Administración de Redes</option>
      </select>

      <fieldset>
        <legend>Modalidad</legend>
        <label><input type="radio" name="modalidad" value="PRESENCIAL" required> Presencial</label>
        <label><input type="radio" name="modalidad" value="VIRTUAL"> Virtual</label>
        <label><input type="radio" name="modalidad" value="SEMIPRESENCIAL"> Semipresencial</label>
      </fieldset>

      <label for="turno">Turno</label>
      <select id="turno" name="turno" required>
        <option value="">Seleccione</option>
        <option value="MANANA">Mañana</option>
        <option value="TARDE">Tarde</option>
        <option value="NOCHE">Noche</option>
      </select>

      <label for="sede">Sede</label>
      <select id="sede" name="sede" required></select>

      <label for="ciclo">Ciclo de ingreso</label>
      <input id="ciclo" name="cicloIngreso" type="number"
             min="1" max="6" step="1" required>

      <label for="nivel-estudios">Nivel de estudios</label>
      <select id="nivel-estudios" name="nivelEstudios" required>
        <option value="">Seleccione</option>
        <option value="SECUNDARIA">Secundaria completa</option>
        <option value="TECNICO">Técnico</option>
        <option value="UNIVERSITARIO">Universitario</option>
      </select>
    </fieldset>

    <fieldset>
      <legend>Contacto de emergencia</legend>

      <label for="contacto-emergencia">Persona de contacto</label>
      <input id="contacto-emergencia" name="contactoEmergencia" maxlength="80" required>

      <label for="telefono-emergencia">Teléfono de contacto</label>
      <input id="telefono-emergencia" name="telefonoEmergencia"
             inputmode="tel" pattern="[0-9]{9}" required>
    </fieldset>

    <fieldset>
      <legend>Información adicional</legend>

      <p>Intereses académicos</p>
      <label><input type="checkbox" name="intereses" value="WEB"> Desarrollo web</label>
      <label><input type="checkbox" name="intereses" value="MOVIL"> Aplicaciones móviles</label>
      <label><input type="checkbox" name="intereses" value="DATOS"> Datos</label>

      <label for="documento-adjunto">Documento de identidad</label>
      <input id="documento-adjunto" name="documentoAdjunto" type="file"
             accept="application/pdf,image/jpeg,image/png" required>
      <p id="archivo-descripcion"></p>

      <label for="comentarios">Comentarios</label>
      <textarea id="comentarios" name="comentarios" maxlength="500"></textarea>
      <output id="contador-comentarios" for="comentarios">0/500</output>

      <label>
        <input type="checkbox" name="aceptaTerminos" required>
        Acepto el tratamiento de mis datos para gestionar la solicitud.
      </label>
    </fieldset>

    <div class="acciones">
      <button type="submit" name="accion" value="BORRADOR">Guardar borrador</button>
      <button type="submit" name="accion" value="ENVIAR">Enviar solicitud</button>
      <button type="button" id="vista-previa">Vista previa</button>
      <button type="reset">Limpiar</button>
    </div>
  </form>
</main>

<script type="module" src="./js/app.js"></script>
```

## 2. Catálogo geográfico

En `datos.js`:

```js
export const ubicaciones = {
    departamentos: [
        { id: "15", nombre: "Lima" },
        { id: "04", nombre: "Arequipa" }
    ],
    provincias: [
        { id: "1501", departamentoId: "15", nombre: "Lima" },
        { id: "1502", departamentoId: "15", nombre: "Barranca" },
        { id: "0401", departamentoId: "04", nombre: "Arequipa" }
    ],
    distritos: [
        { id: "150101", provinciaId: "1501", nombre: "Lima" },
        { id: "150122", provinciaId: "1501", nombre: "Miraflores" },
        { id: "150201", provinciaId: "1502", nombre: "Barranca" },
        { id: "040101", provinciaId: "0401", nombre: "Arequipa" }
    ]
};

export const sedes = [
    { id: "CENTRO", nombre: "Lima Centro", modalidades: ["PRESENCIAL", "SEMIPRESENCIAL"] },
    { id: "NORTE", nombre: "Lima Norte", modalidades: ["PRESENCIAL"] },
    { id: "VIRTUAL", nombre: "Campus Virtual", modalidades: ["VIRTUAL"] }
];
```

## 3. Referencias y contrato inicial

```js
function requerido(selector, raiz = document) {
    const elemento = raiz.querySelector(selector);
    if (!elemento) throw new Error(`No se encontró ${selector}`);
    return elemento;
}

const formulario = requerido("#matricula-form");

const ui = Object.freeze({
    formulario,
    resumen: requerido("#resumen-errores"),
    estado: requerido("#estado-envio"),
    departamento: formulario.elements.departamento,
    provincia: formulario.elements.provincia,
    distrito: formulario.elements.distrito,
    modalidad: formulario.elements.namedItem("modalidad"),
    sede: formulario.elements.sede,
    archivo: formulario.elements.documentoAdjunto,
    comentarios: formulario.elements.comentarios,
    contador: requerido("#contador-comentarios"),
    vistaPrevia: requerido("#vista-previa")
});
```

Verifica mediante `instanceof` los controles críticos antes de registrar eventos.

## 4. Generación de opciones

```js
function reemplazarOpciones(select, opciones, etiquetaInicial) {
    const fragmento = document.createDocumentFragment();
    fragmento.append(new Option(etiquetaInicial, ""));

    for (const opcion of opciones) {
        fragmento.append(new Option(opcion.nombre, opcion.id));
    }

    select.replaceChildren(fragmento);
    select.disabled = opciones.length === 0;
}
```

Inicializa departamentos y sedes. Las provincias y distritos deben permanecer deshabilitados hasta que exista una selección anterior válida.

## 5. Controles dependientes

```js
ui.departamento.addEventListener("change", evento => {
    const departamentoId = evento.currentTarget.value;
    const provincias = ubicaciones.provincias.filter(
        item => item.departamentoId === departamentoId
    );

    reemplazarOpciones(ui.provincia, provincias, "Seleccione una provincia");
    reemplazarOpciones(ui.distrito, [], "Seleccione un distrito");
});

ui.provincia.addEventListener("change", evento => {
    const provinciaId = evento.currentTarget.value;
    const distritos = ubicaciones.distritos.filter(
        item => item.provinciaId === provinciaId
    );

    reemplazarOpciones(ui.distrito, distritos, "Seleccione un distrito");
});
```

### Reto obligatorio

Filtra las sedes disponibles cuando cambia la modalidad. Si la sede seleccionada deja de ser válida, debe restablecerse.

## 6. Validación del documento

En `validacion.js`:

```js
const reglasDocumento = Object.freeze({
    DNI: { patron: /^\d{8}$/, mensaje: "El DNI debe contener 8 dígitos" },
    CE: { patron: /^[A-Z0-9]{9,12}$/i, mensaje: "Ingrese un carné válido" },
    PASAPORTE: { patron: /^[A-Z0-9]{6,12}$/i, mensaje: "Ingrese un pasaporte válido" }
});

export function validarDocumento(tipo, numero) {
    const regla = reglasDocumento[tipo];
    if (!regla) return "Seleccione el tipo de documento";
    return regla.patron.test(numero.trim()) ? "" : regla.mensaje;
}
```

En `app.js`:

```js
function aplicarValidacionDocumento() {
    const tipo = formulario.elements.tipoDocumento.value;
    const numero = formulario.elements.numeroDocumento;
    numero.setCustomValidity(validarDocumento(tipo, numero.value));
}

formulario.elements.tipoDocumento.addEventListener("change", aplicarValidacionDocumento);
formulario.elements.numeroDocumento.addEventListener("input", aplicarValidacionDocumento);
```

## 7. Validación de mayoría de edad

No calcules la edad dividiendo milisegundos entre 365 días. Compara año, mes y día.

```js
export function calcularEdad(fechaNacimiento, hoy = new Date()) {
    const nacimiento = new Date(`${fechaNacimiento}T00:00:00`);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();

    const aunNoCumplio =
        hoy.getMonth() < nacimiento.getMonth() ||
        (hoy.getMonth() === nacimiento.getMonth() &&
         hoy.getDate() < nacimiento.getDate());

    if (aunNoCumplio) edad -= 1;
    return edad;
}
```

Establece un error personalizado cuando la edad sea menor que 16 o la fecha sea futura.

## 8. Coincidencia de correos

```js
function validarCorreos() {
    const correo = formulario.elements.correo;
    const confirmar = formulario.elements.confirmarCorreo;

    confirmar.setCustomValidity(
        confirmar.value !== correo.value
            ? "Los correos no coinciden"
            : ""
    );
}

formulario.elements.correo.addEventListener("input", validarCorreos);
formulario.elements.confirmarCorreo.addEventListener("input", validarCorreos);
```

Normaliza ambos valores con `trim()` y minúsculas al crear el modelo, no mientras el usuario está escribiendo.

## 9. Archivo adjunto

Acepta PDF, JPEG o PNG de hasta 4 MiB.

```js
const TIPOS_PERMITIDOS = new Set([
    "application/pdf",
    "image/jpeg",
    "image/png"
]);
const MAX_BYTES = 4 * 1024 * 1024;

function validarArchivo() {
    const control = ui.archivo;
    const archivo = control.files[0];

    if (!archivo) {
        control.setCustomValidity("Adjunte el documento solicitado");
        return;
    }

    if (!TIPOS_PERMITIDOS.has(archivo.type)) {
        control.setCustomValidity("Solo se permite PDF, JPEG o PNG");
    } else if (archivo.size > MAX_BYTES) {
        control.setCustomValidity("El archivo supera 4 MiB");
    } else {
        control.setCustomValidity("");
    }

    document.querySelector("#archivo-descripcion").textContent =
        `${archivo.name} — ${(archivo.size / 1024).toFixed(1)} KiB`;
}

ui.archivo.addEventListener("change", validarArchivo);
```

La validación debe repetirse en el servidor.

## 10. Contador de comentarios

```js
ui.comentarios.addEventListener("input", evento => {
    const actual = evento.currentTarget.value.length;
    const maximo = evento.currentTarget.maxLength;

    ui.contador.value = `${actual}/${maximo}`;
    ui.contador.textContent = `${actual}/${maximo}`;
});
```

No anuncies cada carácter mediante una región `aria-live`; generaría ruido innecesario.

## 11. Modelo desde `FormData`

```js
function normalizarSolicitud(formulario, accion) {
    const datos = new FormData(formulario);

    return Object.freeze({
        accion,
        tipoDocumento: String(datos.get("tipoDocumento")),
        numeroDocumento: String(datos.get("numeroDocumento")).trim().toUpperCase(),
        nombres: String(datos.get("nombres")).trim(),
        apellidoPaterno: String(datos.get("apellidoPaterno")).trim(),
        apellidoMaterno: String(datos.get("apellidoMaterno") ?? "").trim(),
        fechaNacimiento: String(datos.get("fechaNacimiento")),
        correo: String(datos.get("correo")).trim().toLowerCase(),
        telefono: String(datos.get("telefono")).trim(),
        direccion: String(datos.get("direccion")).trim(),
        departamento: String(datos.get("departamento")),
        provincia: String(datos.get("provincia")),
        distrito: String(datos.get("distrito")),
        programa: String(datos.get("programa")),
        modalidad: String(datos.get("modalidad")),
        turno: String(datos.get("turno")),
        sede: String(datos.get("sede")),
        cicloIngreso: Number(datos.get("cicloIngreso")),
        nivelEstudios: String(datos.get("nivelEstudios")),
        contactoEmergencia: String(datos.get("contactoEmergencia")).trim(),
        telefonoEmergencia: String(datos.get("telefonoEmergencia")).trim(),
        intereses: datos.getAll("intereses").map(String),
        comentarios: String(datos.get("comentarios") ?? "").trim(),
        aceptaTerminos: datos.has("aceptaTerminos"),
        documentoAdjunto: datos.get("documentoAdjunto")
    });
}
```

No incluyas `confirmarCorreo` en el modelo final: es un control de verificación de interfaz.

## 12. Mensajes por campo

Agrega un `<p class="error">` para cada control obligatorio y crea una función común.

```js
function mensajeControl(control) {
    if (control.validity.valueMissing) return "Este dato es obligatorio";
    if (control.validity.typeMismatch) return "El formato no es válido";
    if (control.validity.patternMismatch) return "No cumple el formato solicitado";
    if (control.validity.tooShort) return `Ingrese al menos ${control.minLength} caracteres`;
    if (control.validity.rangeUnderflow) return `El mínimo es ${control.min}`;
    if (control.validity.rangeOverflow) return `El máximo es ${control.max}`;
    if (control.validity.customError) return control.validationMessage;
    return "";
}

function presentarControl(control) {
    const error = document.querySelector(`#${control.id}-error`);
    if (!error) return;

    const mensaje = mensajeControl(control);
    error.textContent = mensaje;
    error.hidden = !mensaje;
    control.setAttribute("aria-invalid", String(Boolean(mensaje)));
}
```

## 13. Resumen de errores

```js
function controlesInvalidos() {
    return Array.from(
        formulario.querySelectorAll("input, select, textarea")
    ).filter(control => !control.validity.valid);
}

function mostrarResumen(invalidos) {
    const lista = document.createElement("ul");

    for (const control of invalidos) {
        presentarControl(control);

        const item = document.createElement("li");
        const enlace = document.createElement("a");
        enlace.href = `#${control.id}`;
        enlace.textContent = `${control.labels?.[0]?.textContent}: ${mensajeControl(control)}`;
        item.append(enlace);
        lista.append(item);
    }

    ui.resumen.replaceChildren(
        Object.assign(document.createElement("h2"), {
            textContent: "Revise los siguientes datos"
        }),
        lista
    );
    ui.resumen.hidden = false;
    ui.resumen.focus();
}
```

## 14. Vista previa segura

Crea un `<dialog>` para mostrar un resumen. No uses `innerHTML` con los datos del usuario.

```js
function agregarDato(lista, etiqueta, valor) {
    const termino = document.createElement("dt");
    const detalle = document.createElement("dd");

    termino.textContent = etiqueta;
    detalle.textContent = valor || "No registrado";
    lista.append(termino, detalle);
}
```

La vista previa debe:

- Excluir el archivo completo y mostrar solo nombre y tamaño.
- Ocultar parcialmente el documento.
- Mostrar intereses como una lista.
- Devolver el foco al botón que abrió el diálogo.

## 15. Envío y `event.submitter`

```js
formulario.addEventListener("submit", async evento => {
    evento.preventDefault();

    aplicarValidacionDocumento();
    validarCorreos();
    validarArchivo();

    const invalidos = controlesInvalidos();
    if (invalidos.length > 0) {
        mostrarResumen(invalidos);
        return;
    }

    const accion = evento.submitter?.value ?? "ENVIAR";
    const modelo = normalizarSolicitud(formulario, accion);

    await enviarSolicitud(modelo);
});
```

Para `BORRADOR`, define qué campos pueden ser opcionales. No elimines restricciones globalmente sin documentar la regla.

## 16. Envío asíncrono simulado

```js
let envioActual;

function simularServidor(modelo, signal) {
    return new Promise((resolve, reject) => {
        const id = setTimeout(() => {
            resolve({ ok: true, codigo: crypto.randomUUID(), modelo });
        }, 1200);

        signal.addEventListener("abort", () => {
            clearTimeout(id);
            reject(new DOMException("Cancelado", "AbortError"));
        }, { once: true });
    });
}

async function enviarSolicitud(modelo) {
    envioActual?.abort();
    envioActual = new AbortController();
    cambiarEstadoEnvio(true, "Enviando solicitud…");

    try {
        const respuesta = await simularServidor(
            modelo,
            envioActual.signal
        );

        ui.estado.textContent = `Solicitud registrada: ${respuesta.codigo}`;
        formulario.reset();
        limpiarDependencias();
    } catch (error) {
        if (error.name !== "AbortError") {
            ui.estado.textContent = "No se pudo registrar. Intente nuevamente.";
            ui.estado.setAttribute("role", "alert");
        }
    } finally {
        cambiarEstadoEnvio(false);
    }
}
```

## 17. Evitar envíos duplicados

```js
function cambiarEstadoEnvio(enviando, mensaje = "") {
    const botones = formulario.querySelectorAll("button[type='submit']");

    for (const boton of botones) {
        boton.disabled = enviando;
        boton.setAttribute("aria-disabled", String(enviando));
    }

    formulario.setAttribute("aria-busy", String(enviando));
    if (mensaje) ui.estado.textContent = mensaje;
}
```

Deshabilitar controles antes de construir `FormData` puede excluirlos. Construye primero el modelo o deshabilita solamente los botones.

## 18. Reinicio coherente

El evento `reset` se dispara antes de que el navegador restaure los valores. Programa la actualización dependiente para el siguiente ciclo.

```js
formulario.addEventListener("reset", () => {
    queueMicrotask(() => {
        limpiarDependencias();
        ui.resumen.hidden = true;
        ui.resumen.replaceChildren();
        ui.estado.textContent = "Formulario restablecido";
        ui.contador.textContent = "0/500";
    });
});
```

## 19. Casos de prueba

| Caso | Entrada o acción | Resultado esperado |
|---|---|---|
| Formulario vacío | Enviar | Resumen y foco, datos conservados |
| DNI inválido | 7 dígitos | Mensaje específico |
| Correos diferentes | Valores distintos | Error en confirmación |
| Fecha futura | Fecha posterior a hoy | Rechazo personalizado |
| Menor de edad mínima | Edad menor que 16 | Mensaje de dominio |
| Ubicación | Cambiar departamento | Provincias y distritos coherentes |
| Modalidad virtual | Seleccionar virtual | Solo sedes compatibles |
| Archivo grande | Más de 4 MiB | Envío bloqueado |
| Archivo no permitido | Ejecutable renombrado | Cliente lo rechaza por tipo; servidor vuelve a validar |
| Checkbox múltiple | Elegir tres intereses | Arreglo con tres valores |
| Borrador | Botón Guardar | `accion = BORRADOR` |
| Envío doble | Dos intentos rápidos | Un flujo activo y botones bloqueados |
| Error del servidor | Simular rechazo | Datos conservados y reintento disponible |
| Teclado | Navegar sin ratón | Foco visible y orden lógico |
| XSS | Etiquetas en comentarios | Texto literal en vista previa |

## 20. Criterios de evaluación

| Criterio | Peso |
|---|---:|
| Semántica, etiquetas y agrupación | 15 % |
| Uso correcto de DOM y `form.elements` | 15 % |
| Validación nativa y personalizada | 20 % |
| Construcción y normalización de `FormData` | 15 % |
| Accesibilidad, errores y foco | 15 % |
| Archivos, controles dependientes y seguridad | 10 % |
| Envío asíncrono y recuperación | 10 % |

## Retos adicionales

1. Guarda un borrador sin archivos en `sessionStorage` y restáuralo con consentimiento del usuario.
2. Implementa validación asíncrona de documento con debounce y cancelación.
3. Divide el formulario en pasos sin retirar del DOM controles necesarios para la validación.
4. Añade una barra de progreso basada en secciones válidas, no solo en campos llenos.
5. Implementa una versión con mejora progresiva que continúe funcionando sin JavaScript.

## Preguntas de cierre

1. ¿Por qué `name` es imprescindible para `FormData`?
2. ¿Qué diferencia existe entre `disabled` y `readonly`?
3. ¿Cuándo conviene escuchar `input` y cuándo `change`?
4. ¿Por qué `requestSubmit()` es preferible a `submit()`?
5. ¿Cómo se conservan múltiples valores con el mismo nombre?
6. ¿Qué controles se excluyen de la serialización?
7. ¿Por qué la validación del cliente no es una frontera de seguridad?
8. ¿Cómo debe administrarse el foco después de un envío inválido?

