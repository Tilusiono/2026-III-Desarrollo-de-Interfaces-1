import { RolFactory } from "./factory/RolFactory.js";
import { CamposRol } from "./vistas/CamposRol.js";

const formularioRegistro = document.querySelector("#formularioRegistro");

if (!formularioRegistro) {
    throw new Error("No se encontró el formulario #formularioRegistro");
}

const camposRol = new CamposRol(
    formularioRegistro.querySelector("#rol"),
    formularioRegistro.querySelectorAll("[data-rol]"),
    formularioRegistro.querySelector("#camposFormulario")
);
camposRol.iniciar();

function obtenerValores(nombreFormulario) {
    const datosObtenidos = new FormData(nombreFormulario);

    return Object.freeze({
        nombre: String(datosObtenidos.get("nombre") ?? "").trim().toUpperCase(),
        apellidos: String(datosObtenidos.get("apellido") ?? "").trim().toUpperCase(),
        usuario: String(datosObtenidos.get("usuario") ?? "").trim(),
        rol: RolFactory.crear(
            String(datosObtenidos.get("rol") ?? ""),
            camposRol.obtenerValores()
        ),
        correoElectronico: String(datosObtenidos.get("correo") ?? "").trim().toUpperCase(),
        nroContacto: Number(datosObtenidos.get("telefono")),
        fechaNacimiento: new Date(`${datosObtenidos.get("fechaNacimiento")}T00:00:00`),
        fechaRegistro: new Date(),
        genero: String(datosObtenidos.get("genero") ?? "").trim(),
        mensaje: String(datosObtenidos.get("mensaje") ?? "").trim(),
        aceptaTerminos: Boolean(datosObtenidos.get("aceptaTerminos"))
    });
}

function validarContrasenas() {
    const contrasena = document.querySelector("#contrasena");
    const confirmarContrasena = document.querySelector("#confirmarContrasena");

    if (confirmarContrasena.value !== contrasena.value) {
        confirmarContrasena.setCustomValidity("Las contraseñas no coinciden.");
    } else {
        confirmarContrasena.setCustomValidity("");
    }
}

function procesarFormulario(evento) {
    evento.preventDefault();

    validarContrasenas();

    if (!formularioRegistro.reportValidity()) {
        return;
    }

    const valoresObtenidos = obtenerValores(formularioRegistro);
    imprimirDatosConsola(valoresObtenidos);
    imprimirDatosHTML(valoresObtenidos);
}

function imprimirDatosConsola(valores) {
    console.log("Datos del formulario obtenidos:");

    // No se muestran ni se imprimen las contraseñas.
    console.table({
        nombre: typeof valores.nombre,
        apellidos: typeof valores.apellidos,
        usuario: typeof valores.usuario,
        rol: valores.rol.nombre,
        camposEspecificos: valores.rol.obtenerDetalles().map(([campo]) => campo),
        correoElectronico: typeof valores.correoElectronico,
        nroContacto: typeof valores.nroContacto,
        fechaNacimiento: typeof valores.fechaNacimiento,
        genero: typeof valores.genero,
        mensaje: typeof valores.mensaje,
        aceptaTerminos: typeof valores.aceptaTerminos
    });
}

function limpiarFormulario() {
    console.log("El formulario será restablecido.");

    const seccionResultado = document.querySelector("#resultadoFormulario");
    const cuerpoResultado = document.querySelector("#cuerpoResultado");

    seccionResultado.hidden = true;
    cuerpoResultado.replaceChildren();

    document.querySelector("#confirmarContrasena").setCustomValidity("");
    setTimeout(() => camposRol.actualizar(), 0);
}

function imprimirDatosHTML(valores) {
    const seccionResultado = document.querySelector("#resultadoFormulario");
    const cuerpoResultado = document.querySelector("#cuerpoResultado");

    const datosParaMostrar = [
        { campo: "Nombre", valor: valores.nombre, tipo: "Texto" },
        { campo: "Apellidos", valor: valores.apellidos, tipo: "Texto" },
        { campo: "Nombre de usuario", valor: valores.usuario, tipo: "Texto" },
        { campo: "Rol", valor: valores.rol.nombre, tipo: "Texto" },
        ...valores.rol.obtenerDetalles().map(([campo, valor]) => ({
            campo,
            valor,
            tipo: "Texto"
        })),
        { campo: "Correo electrónico", valor: valores.correoElectronico, tipo: "Texto" },
        { campo: "Número de contacto", valor: valores.nroContacto, tipo: "Número" },
        {
            campo: "Fecha de nacimiento",
            valor: valores.fechaNacimiento.toLocaleDateString("es-PE"),
            tipo: "Fecha"
        },
        { campo: "Género", valor: valores.genero, tipo: "Texto" },
        { campo: "Mensaje", valor: valores.mensaje, tipo: "Texto" },
        {
            campo: "Aceptó los términos",
            valor: valores.aceptaTerminos ? "Sí" : "No",
            tipo: "Confirmación"
        },
        {
            campo: "Fecha y hora de registro",
            valor: valores.fechaRegistro.toLocaleString("es-PE"),
            tipo: "Fecha y hora"
        }
    ];

    const fragmento = document.createDocumentFragment();

    for (const dato of datosParaMostrar) {
        const fila = document.createElement("tr");
        const celdaCampo = document.createElement("td");
        const celdaValor = document.createElement("td");
        const celdaTipo = document.createElement("td");
        const celdaValidacion = document.createElement("td");

        celdaCampo.textContent = dato.campo;
        celdaValor.textContent = String(dato.valor);
        celdaTipo.textContent = dato.tipo;
        celdaValidacion.textContent = "Correcto";

        fila.append(celdaCampo, celdaValor, celdaTipo, celdaValidacion);
        fragmento.append(fila);
    }

    cuerpoResultado.replaceChildren(fragmento);
    seccionResultado.hidden = false;
}

// Comprobar la coincidencia mientras se escriben las contraseñas.
document
    .querySelector("#contrasena")
    .addEventListener("input", validarContrasenas);

document
    .querySelector("#confirmarContrasena")
    .addEventListener("input", validarContrasenas);

// Escuchar el envío y la limpieza del formulario.
formularioRegistro.addEventListener("submit", procesarFormulario);
formularioRegistro.addEventListener("reset", limpiarFormulario);

// Ctrl + Shift + P
// Debug: Open Link