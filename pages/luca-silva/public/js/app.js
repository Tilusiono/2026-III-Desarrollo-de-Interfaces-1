// ========================================
// 1. IMPORTACIÓN DE CLASES
// ========================================

import { EventoPresencial } from "./modelos/eventoPresencial.js";
import { EventoVirtual } from "./modelos/eventoVirtual.js";


// ========================================
// 2. CREACIÓN DE EVENTOS
// ========================================

const eventos = [

    new EventoPresencial({
        id: 1,
        nombre: "Conferencia de Tecnología",
        fecha: "2026-11-15",
        ubicacion: "Lima, Perú",
        categoria: "tecnologia",
        descripcion: "Conoce las últimas tendencias en inteligencia artificial y desarrollo web."
    }, "Sede por confirmar"),

    new EventoVirtual({
        id: 2,
        nombre: "Taller de Diseño Web",
        fecha: "2026-11-22",
        ubicacion: "Evento virtual",
        categoria: "educacion",
        descripcion: "Aprende fundamentos de diseño, accesibilidad y experiencia de usuario."
    }, "Plataforma por confirmar"),

    new EventoPresencial({
        id: 3,
        nombre: "Feria de Emprendedores",
        fecha: "2026-12-05",
        ubicacion: "Lima, Perú",
        categoria: "emprendimiento",
        descripcion: "Descubre nuevos proyectos, conecta con emprendedores y aprende sobre negocios."
    }, "Sede por confirmar")

];


// Comprobar la creación de los objetos
console.table(eventos.map((evento) => ({
    id: evento.id,
    nombre: evento.nombre,
    modalidad: evento.modalidad,
    estado: evento.estadoInscripcion,
    detalles: evento.obtenerDetalles()
})));


// ========================================
// 3. INICIALIZACIÓN DE LA APLICACIÓN
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("EventHub: JavaScript cargado correctamente");

    // Elementos del catálogo
    const buscador = document.getElementById("buscarEvento");
    const filtroCategoria = document.getElementById("filtroCategoria");
    const tarjetas = document.querySelectorAll(".tarjeta-evento");

    // Elementos del formulario
    const formulario = document.getElementById("formInscripcion");
    const mensaje = document.getElementById("mensajeInscripcion");
    const contenedor = document.getElementById("contenedorInscripciones");

    // Almacenar las inscripciones
    const inscripciones = [];


    // Clave utilizada para guardar los registros
    const CLAVE_ALMACENAMIENTO = "eventhub_inscripciones";

    // Guardar las inscripciones en el navegador
    function guardarInscripciones() {
        try {
            localStorage.setItem(
                CLAVE_ALMACENAMIENTO,
                JSON.stringify(inscripciones)
            );
            return true;
        } catch (error) {
            console.error("No se pudieron guardar los datos:", error);
            return false;
        }
    }

    // Recuperar las inscripciones guardadas
    function cargarInscripciones() {
        let registros;

        try {
            registros = JSON.parse(
                localStorage.getItem(CLAVE_ALMACENAMIENTO) || "[]"
            );
        } catch (error) {
            console.error("Error al recuperar inscripciones:", error);
            return;
        }

        if (!Array.isArray(registros)) return;

        registros.forEach((registro) => {

            if (!registro || typeof registro.correo !== "string" ||
                typeof registro.nombre !== "string" ||
                typeof registro.apellido !== "string") {
                return;
            }

            const evento = eventos.find(
                e => e.id === registro.eventoId
            );

            if (!evento) return;

            try {
                // Sincronizar las inscripciones con la clase Evento
                if (evento.inscribir(registro.correo)) {
                    inscripciones.push({
                        eventoId: evento.id,
                        nombre: registro.nombre,
                        apellido: registro.apellido,
                        correo: registro.correo.trim().toLowerCase(),
                        telefono: typeof registro.telefono === "string"
                            ? registro.telefono
                            : ""
                    });
                }
            } catch (error) {
                console.warn("Registro omitido:", error.message);
            }

        });
    }


    console.log("Tarjetas encontradas:", tarjetas.length);

    // Comprobar que existen los elementos necesarios
    if (!buscador || !filtroCategoria || tarjetas.length === 0 ||
        !formulario || !mensaje || !contenedor) {

        console.error("Faltan elementos necesarios en el HTML.");
        return;
    }


    // ========================================
    // 4. FILTRADO DE EVENTOS
    // ========================================

    function filtrarEventos() {

        const texto = buscador.value.trim().toLowerCase();
        const categoria = filtroCategoria.value;

        tarjetas.forEach((tarjeta) => {

            const nombre = tarjeta
                .querySelector(".card-title")
                .textContent.toLowerCase();

            const categoriaEvento = tarjeta.dataset.categoria;

            const coincideNombre = nombre.includes(texto);

            const coincideCategoria =
                categoria === "todos" ||
                categoria === categoriaEvento;

            const columna = tarjeta.parentElement;

            if (coincideNombre && coincideCategoria) {
                columna.classList.remove("d-none");
            } else {
                columna.classList.add("d-none");
            }

        });
    }


    // ========================================
    // 5. MENSAJES DEL SISTEMA
    // ========================================

    function mostrarMensaje(texto, tipo) {

        mensaje.className = `alert alert-${tipo} mt-3`;
        mensaje.textContent = texto;

    }


    // ========================================
    // 6. MOSTRAR INSCRIPCIONES
    // ========================================

    function mostrarInscripciones() {

        contenedor.replaceChildren();

        // Si todavía no existen inscripciones
        if (inscripciones.length === 0) {

            contenedor.className = "estado-vacio text-center p-5";

            const aviso = document.createElement("p");
            aviso.textContent = "Todavía no tienes inscripciones.";

            contenedor.appendChild(aviso);
            return;
        }

        contenedor.className = "row g-3";

        // Recorrer las inscripciones existentes
        inscripciones.forEach((inscripcion) => {

            const evento = eventos.find(
                e => e.id === inscripcion.eventoId
            );

            if (!evento) return;

            const columna = document.createElement("div");
            columna.className = "col-md-6";

            const tarjeta = document.createElement("article");
            tarjeta.className = "card h-100 shadow-sm";

            const cuerpo = document.createElement("div");
            cuerpo.className = "card-body";

            const titulo = document.createElement("h3");
            titulo.className = "h5";
            titulo.textContent = evento.nombre;

            const participante = document.createElement("p");
            participante.textContent =
                `Participante: ${inscripcion.nombre} ${inscripcion.apellido}`;

            const correo = document.createElement("p");
            correo.textContent = `Correo: ${inscripcion.correo}`;

            const fecha = document.createElement("p");
            fecha.textContent = `Fecha: ${evento.fecha}`;


            // Crear el botón para cancelar la inscripción
            const botonCancelar = document.createElement("button");

            botonCancelar.type = "button";
            botonCancelar.className = "btn btn-outline-danger mt-2";
            botonCancelar.textContent = "Cancelar inscripción";

            // Identificar la inscripción correspondiente
            botonCancelar.dataset.eventoId = inscripcion.eventoId;
            botonCancelar.dataset.correo = inscripcion.correo;

            // Agregar los elementos a la tarjeta
            cuerpo.append(
                titulo,
                participante,
                correo,
                fecha,
                botonCancelar
            );

            tarjeta.appendChild(cuerpo);
            columna.appendChild(tarjeta);
            contenedor.appendChild(columna);

        });
    }


    // ========================================
    // 7. REGISTRAR INSCRIPCIONES
    // ========================================

    function registrarInscripcion(event) {

        // Evitar la recarga de la página
        event.preventDefault();

        // Obtener los datos del formulario
        const nombre = document.getElementById("nombre")
            .value.trim();

        const apellido = document.getElementById("apellido")
            .value.trim();

        const correo = document.getElementById("correo")
            .value.trim().toLowerCase();

        const telefono = document.getElementById("telefono")
            .value.trim();

        const eventoId = Number(
            document.getElementById("eventoSeleccionado").value
        );

        // Validar nombres y apellidos
        if (nombre.length < 2 || apellido.length < 2) {

            mostrarMensaje(
                "Ingresa nombres y apellidos válidos.",
                "danger"
            );

            return;
        }

        // Buscar el evento seleccionado
        const eventoSeleccionado = eventos.find(
            e => e.id === eventoId
        );

        if (!eventoSeleccionado) {

            mostrarMensaje(
                "Selecciona un evento válido.",
                "danger"
            );

            return;
        }

        try {

            // Utilizar el método de la clase Evento
            const registrado = eventoSeleccionado.inscribir(correo);

            // Evitar inscripciones duplicadas
            if (!registrado) {

                mostrarMensaje(
                    "Este correo ya está inscrito en el evento.",
                    "warning"
                );

                return;
            }

            // Guardar los datos del participante
            inscripciones.push({
                eventoId,
                nombre,
                apellido,
                correo,
                telefono
            });

            // Guardar los cambios
            const guardado = guardarInscripciones();

            // Actualizar la lista de inscripciones
            mostrarInscripciones();

            // Mostrar confirmación
            mostrarMensaje(
                guardado
                    ? "¡Inscripción realizada correctamente!"
                    : "Inscripción registrada, pero no se pudo guardar en el navegador.",
                guardado ? "success" : "warning"
            );
            // Limpiar el formulario
            formulario.reset();

        } catch (error) {

            mostrarMensaje(error.message, "danger");

        }
    }


    // ========================================
    // 8. EVENTOS DEL DOM
    // ========================================

    // Filtrar cuando se escribe en el buscador
    buscador.addEventListener("input", filtrarEventos);

    // Filtrar cuando cambia la categoría
    filtroCategoria.addEventListener("change", filtrarEventos);

    // Registrar cuando se envía el formulario
    formulario.addEventListener("submit", registrarInscripcion);


    // Cancelar una inscripción al pulsar su botón
    contenedor.addEventListener("click", (event) => {

        const boton = event.target.closest(
            "button[data-evento-id][data-correo]"
        );

        if (!boton || !contenedor.contains(boton)) {
            return;
        }

        const eventoId = Number(boton.dataset.eventoId);
        const correo = boton.dataset.correo;

        // Buscar la inscripción
        const indice = inscripciones.findIndex(
            inscripcion =>
                inscripcion.eventoId === eventoId &&
                inscripcion.correo === correo
        );

        if (indice === -1) {
            return;
        }

        // Buscar el objeto Evento correspondiente
        const eventoSeleccionado = eventos.find(
            evento => evento.id === eventoId
        );

        if (!eventoSeleccionado) {
            return;
        }

        // Cancelar utilizando el método de la clase Evento
        const cancelado = eventoSeleccionado.cancelarInscripcion(correo);

        if (!cancelado) {
            mostrarMensaje(
                "No se pudo cancelar la inscripción.",
                "danger"
            );
            return;
        }

        // Eliminar la inscripción del arreglo
        inscripciones.splice(indice, 1);

        const guardado = guardarInscripciones();

        // Actualizar la interfaz sin recargar
        mostrarInscripciones();

        mostrarMensaje(
            guardado
                ? "Inscripción cancelada correctamente."
                : "Inscripción cancelada, pero no se pudo guardar el cambio.",
            guardado ? "info" : "warning"
        );
    });

    // ========================================
    // 9. CARGA INICIAL
    // ========================================

    // Recuperar inscripciones guardadas
    cargarInscripciones();

    // Activar los filtros
    filtrarEventos();

    // Mostrar las inscripciones recuperadas
    mostrarInscripciones();
});

