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


// ========================================
// 2.1. PRECIOS, EXTRAS Y DESCUENTOS
// ========================================

// Configuración económica de cada evento
const tarifasEventos = {

    // Conferencia de Tecnología
    1: {
        precioBase: 150,
        extras: [
            { id: "kit", nombre: "Kit tecnológico", precio: 40 },
            { id: "taller", nombre: "Taller práctico", precio: 60 },
            { id: "certificado", nombre: "Certificado", precio: 30 }
        ]
    },

    // Taller de Diseño Web
    2: {
        precioBase: 100,
        extras: [
            { id: "plantillas", nombre: "Plantillas premium", precio: 25 },
            { id: "asesoria", nombre: "Asesoría personalizada", precio: 50 },
            { id: "certificado", nombre: "Certificado", precio: 20 }
        ]
    },

    // Feria de Emprendedores
    3: {
        precioBase: 60,
        extras: [
            { id: "material", nombre: "Material de negocios", precio: 20 },
            { id: "networking", nombre: "Acceso a networking", precio: 35 },
            { id: "taller", nombre: "Taller empresarial", precio: 45 }
        ]
    }

};

// Cupones de descuento disponibles
const cuponesDescuento = {
    EVENTHUB10: 0.10
};


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
    const mensajeSinResultados = document.getElementById("mensajeSinResultados");

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
                            : "",

                        // Recuperar los precios registrados originalmente
                        detallePago:
                            registro.detallePago &&
                                typeof registro.detallePago.total === "number" &&
                                Number.isFinite(registro.detallePago.total) &&
                                registro.detallePago.total >= 0
                                ? registro.detallePago
                                : null
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
    // 3.1. MOSTRAR PRECIOS Y EXTRAS
    // ========================================

    tarjetas.forEach((tarjeta) => {

        // Identificar el evento de cada tarjeta
        const eventoId = Number(tarjeta.dataset.eventoId);

        // Obtener los precios correspondientes
        const tarifa = tarifasEventos[eventoId];

        if (!tarifa) return;

        // Buscar la zona donde están los botones
        const acciones = tarjeta.querySelector(".acciones-evento");

        if (!acciones) return;

        // Crear el contenedor de precios
        const bloquePrecios = document.createElement("div");
        bloquePrecios.className = "mt-3 mb-3";

        // Mostrar el precio base
        const precio = document.createElement("p");
        precio.className = "fw-bold text-primary mb-2";
        precio.textContent =
            `Precio de inscripción: S/ ${tarifa.precioBase.toFixed(2)}`;

        // Título de materiales adicionales
        const tituloExtras = document.createElement("p");
        tituloExtras.className = "small fw-semibold mb-1";
        tituloExtras.textContent = "Extras opcionales:";

        // Crear la lista de materiales
        const listaExtras = document.createElement("ul");
        listaExtras.className = "small text-secondary ps-3 mb-0";

        tarifa.extras.forEach((extra) => {

            const elemento = document.createElement("li");

            elemento.textContent =
                `${extra.nombre} (+ S/ ${extra.precio.toFixed(2)})`;

            listaExtras.appendChild(elemento);

        });

        // Organizar los elementos
        bloquePrecios.append(
            precio,
            tituloExtras,
            listaExtras
        );

        // Colocar los precios encima de los botones
        acciones.before(bloquePrecios);

    });


    // ========================================
    // 3.2. SELECCIONAR MATERIALES ADICIONALES
    // ========================================

    const selectorEvento = document.getElementById("eventoSeleccionado");
    const bloqueExtras = document.getElementById("bloqueExtras");
    const listaExtrasFormulario = document.getElementById("listaExtrasFormulario");
    const subtotalInscripcion = document.getElementById("subtotalInscripcion");

    // Elementos para descuentos y total
    const campoCupon = document.getElementById("cuponDescuento");
    const botonAplicarCupon = document.getElementById("btnAplicarCupon");
    const mensajeCupon = document.getElementById("mensajeCupon");
    const descuentoInscripcion = document.getElementById("descuentoInscripcion");
    const totalInscripcion = document.getElementById("totalInscripcion");

    // Cupón actualmente aplicado
    let cuponAplicado = "";

    // Obtener el desglose económico de la inscripción
    function obtenerDetallePago() {

        const eventoId = Number(selectorEvento.value);
        const tarifa = tarifasEventos[eventoId];

        if (!tarifa) return null;

        // Identificar los materiales seleccionados
        const seleccionados = new Set(
            Array.from(
                listaExtrasFormulario.querySelectorAll(
                    'input[type="checkbox"]:checked'
                ),
                casilla => casilla.value
            )
        );

        // Obtener los materiales y sus precios originales
        const extras = tarifa.extras
            .filter(extra => seleccionados.has(extra.id))
            .map(extra => ({
                id: extra.id,
                nombre: extra.nombre,
                precio: extra.precio
            }));

        // Calcular los importes
        const totalExtras = extras.reduce(
            (suma, extra) => suma + extra.precio,
            0
        );

        const subtotal = Math.round(
            (tarifa.precioBase + totalExtras) * 100
        ) / 100;

        const porcentaje = cuponesDescuento[cuponAplicado] || 0;

        const descuento = Math.round(
            subtotal * porcentaje * 100
        ) / 100;

        const total = Math.round(
            (subtotal - descuento) * 100
        ) / 100;

        return {
            precioBase: tarifa.precioBase,
            extras,
            subtotal,
            cupon: cuponAplicado,
            descuento,
            total
        };
    }


    // Actualizar el resumen económico del formulario
    function calcularSubtotal() {

        const detalle = obtenerDetallePago();

        if (!detalle) return;

        subtotalInscripcion.textContent =
            `Subtotal: S/ ${detalle.subtotal.toFixed(2)}`;

        descuentoInscripcion.textContent =
            `Descuento: - S/ ${detalle.descuento.toFixed(2)}`;

        totalInscripcion.textContent =
            `Total por pagar: S/ ${detalle.total.toFixed(2)}`;
    }



    // ========================================
    // 3.3. VALIDAR Y APLICAR CUPONES
    // ========================================

    function aplicarCupon() {

        const codigo = campoCupon.value.trim().toUpperCase();

        if (!selectorEvento.value) {
            mensajeCupon.textContent = "Primero selecciona un evento.";
            mensajeCupon.className = "small text-danger mt-2 mb-0";
            return;
        }

        // Si no se ingresó un cupón, quitar el descuento
        if (codigo === "") {

            cuponAplicado = "";

            mensajeCupon.textContent =
                "No has ingresado ningún cupón.";

            mensajeCupon.className = "small text-secondary mt-2 mb-0";

            calcularSubtotal();
            return;
        }

        // Verificar si el cupón existe
        if (Object.hasOwn(cuponesDescuento, codigo)) {

            cuponAplicado = codigo;

            mensajeCupon.textContent =
                "¡Cupón aplicado correctamente! Obtienes un 10 % de descuento.";

            mensajeCupon.className = "small text-success mt-2 mb-0";

        } else {

            cuponAplicado = "";

            mensajeCupon.textContent =
                "El cupón ingresado no es válido.";

            mensajeCupon.className = "small text-danger mt-2 mb-0";
        }

        calcularSubtotal();
    }

    // Aplicar descuento al pulsar el botón
    botonAplicarCupon.addEventListener("click", aplicarCupon);

    // Permitir aplicar el cupón con Enter sin enviar el formulario
    campoCupon.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {
            event.preventDefault();
            aplicarCupon();
        }

    });

    // Si se modifica el código, retirar el descuento anterior
    campoCupon.addEventListener("input", () => {

        cuponAplicado = "";
        mensajeCupon.textContent = "";

        if (selectorEvento.value) {
            calcularSubtotal();
        }

    });


    // Mostrar los materiales correspondientes al evento
    function mostrarExtrasFormulario() {

        const eventoId = Number(selectorEvento.value);
        const tarifa = tarifasEventos[eventoId];

        listaExtrasFormulario.replaceChildren();


        // Reiniciar el cupón al cambiar de evento
        cuponAplicado = "";
        campoCupon.value = "";
        mensajeCupon.textContent = "";


        if (!tarifa) {
            bloqueExtras.hidden = true;
            subtotalInscripcion.textContent = "";
            return;
        }

        bloqueExtras.hidden = false;

        tarifa.extras.forEach((extra) => {

            const contenedorExtra = document.createElement("div");
            contenedorExtra.className = "form-check";

            const casilla = document.createElement("input");
            casilla.type = "checkbox";
            casilla.className = "form-check-input";
            casilla.id = `extra-${extra.id}`;
            casilla.value = extra.id;
            casilla.dataset.precio = extra.precio;

            const etiqueta = document.createElement("label");
            etiqueta.className = "form-check-label";
            etiqueta.htmlFor = casilla.id;
            etiqueta.textContent =
                `${extra.nombre} (+ S/ ${extra.precio.toFixed(2)})`;

            contenedorExtra.append(casilla, etiqueta);
            listaExtrasFormulario.appendChild(contenedorExtra);

        });

        calcularSubtotal();
    }

    // Cambiar los materiales cuando se selecciona otro evento
    selectorEvento.addEventListener("change", mostrarExtrasFormulario);

    // Actualizar subtotal al seleccionar o quitar un material
    listaExtrasFormulario.addEventListener("change", calcularSubtotal);

    // Limpiar los materiales al reiniciar el formulario
    formulario.addEventListener("reset", () => {
        listaExtrasFormulario.replaceChildren();
        subtotalInscripcion.textContent = "";
        bloqueExtras.hidden = true;

        // Reiniciar el descuento
        cuponAplicado = "";
        campoCupon.value = "";
        mensajeCupon.textContent = "";
        descuentoInscripcion.textContent = "Descuento: - S/ 0.00";
        totalInscripcion.textContent = "Total por pagar: S/ 0.00";

    });


    // ========================================
    // FUNCIONES PARA MOSTRAR INFORMACIÓN
    // ========================================

    // Convertir una fecha al formato español
    function formatearFecha(fechaISO) {

        const [anio, mes, dia] = fechaISO.split("-").map(Number);

        const fecha = new Date(anio, mes - 1, dia);

        return new Intl.DateTimeFormat("es-PE", {
            day: "numeric",
            month: "long",
            year: "numeric"
        }).format(fecha);
    }

    // Mostrar los nombres legibles de las categorías
    function obtenerNombreCategoria(categoria) {

        const categorias = {
            tecnologia: "Tecnología",
            educacion: "Educación",
            emprendimiento: "Emprendimiento"
        };

        return categorias[categoria] ?? categoria;
    }



    // ========================================
    // 4. FILTRADO DE EVENTOS
    // ========================================


    function filtrarEventos() {

        const texto = buscador.value.trim().toLowerCase();
        const categoria = filtroCategoria.value;

        let resultados = 0;

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
                resultados++;
            } else {
                columna.classList.add("d-none");
            }

        });

        // Informar cuando no hay coincidencias
        if (resultados === 0) {
            mensajeSinResultados.textContent =
                "No se encontraron eventos. Prueba con otra búsqueda o categoría.";
        } else {
            mensajeSinResultados.textContent = "";
        }
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
            fecha.textContent = `Fecha: ${formatearFecha(evento.fecha)}`;

            // ========================================
            // MOSTRAR DETALLE ECONÓMICO
            // ========================================

            const resumenPago = document.createElement("div");
            resumenPago.className = "border-top pt-3 mt-3 mb-3";

            const detalle = inscripcion.detallePago;

            // Crear párrafos de manera segura
            function agregarDatoPago(texto, clase = "mb-2") {
                const parrafo = document.createElement("p");
                parrafo.className = clase;
                parrafo.textContent = texto;
                resumenPago.appendChild(parrafo);
            }

            // Dar formato a los importes en soles
            function formatoSoles(valor) {
                return `S/ ${Number(valor).toFixed(2)}`;
            }

            if (detalle && typeof detalle.total === "number") {

                const tituloResumen = document.createElement("h4");
                tituloResumen.className = "h6 fw-bold mb-3";
                tituloResumen.textContent = "Resumen de la inscripción";

                resumenPago.appendChild(tituloResumen);

                // Precio original del evento
                agregarDatoPago(
                    `Precio base: ${formatoSoles(detalle.precioBase)}`
                );

                // Materiales adicionales seleccionados
                const extras = Array.isArray(detalle.extras)
                    ? detalle.extras
                    : [];

                if (extras.length > 0) {

                    agregarDatoPago("Materiales adicionales:", "fw-semibold mb-1");

                    const lista = document.createElement("ul");
                    lista.className = "small mb-3";

                    extras.forEach(extra => {

                        const elemento = document.createElement("li");

                        elemento.textContent =
                            `${extra.nombre}: ${formatoSoles(extra.precio)}`;

                        lista.appendChild(elemento);

                    });

                    resumenPago.appendChild(lista);

                } else {
                    agregarDatoPago("Materiales adicionales: Ninguno");
                }

                // Subtotal
                agregarDatoPago(
                    `Subtotal: ${formatoSoles(detalle.subtotal)}`
                );

                // Cupón utilizado
                if (detalle.cupon) {
                    agregarDatoPago(
                        `Cupón aplicado: ${detalle.cupon}`,
                        "text-success mb-2"
                    );
                }

                // Descuento aplicado
                agregarDatoPago(
                    `Descuento: - ${formatoSoles(detalle.descuento)}`,
                    "text-success mb-2"
                );

                // Total final
                agregarDatoPago(
                    `Total por pagar: ${formatoSoles(detalle.total)}`,
                    "fw-bold text-primary fs-5 mb-2"
                );

                agregarDatoPago(
                    "Estado: Pendiente de pago (simulación académica)",
                    "small text-secondary"
                );

            } else {

                // Mantener compatibilidad con inscripciones antiguas
                agregarDatoPago(
                    "Inscripción anterior: importe no registrado.",
                    "small text-secondary"
                );

            }

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
                resumenPago,
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

        // ========================================
        // VALIDACIÓN DE DATOS DEL PARTICIPANTE
        // ========================================

        // Permitir letras, tildes, espacios, apóstrofes y guiones
        const patronNombre = /^[\p{L}\p{M}][\p{L}\p{M} .'-]*$/u;

        // Validar nombres
        if (nombre.length < 2 || nombre.length > 80 ||
            !patronNombre.test(nombre)) {

            mostrarMensaje(
                "Ingresa un nombre válido, utilizando letras.",
                "danger"
            );
            return;
        }

        // Validar apellidos
        if (apellido.length < 2 || apellido.length > 80 ||
            !patronNombre.test(apellido)) {

            mostrarMensaje(
                "Ingresa un apellido válido, utilizando letras.",
                "danger"
            );
            return;
        }

        // Validar teléfono (campo opcional)
        if (telefono !== "") {

            const cantidadDigitos = telefono.replace(/\D/g, "").length;
            const formatoValido = /^\+?[\d\s()-]+$/.test(telefono);

            if (!formatoValido ||
                cantidadDigitos < 7 ||
                cantidadDigitos > 15) {

                mostrarMensaje(
                    "Ingresa un teléfono válido de 7 a 15 dígitos.",
                    "danger"
                );
                return;
            }
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

        // ========================================
        // VALIDAR QUE EL CORREO PERTENEZCA
        // AL MISMO PARTICIPANTE
        // ========================================

        // Normalizar nombres para evitar diferencias
        // por mayúsculas, espacios o tildes
        function normalizarNombre(valor) {
            return valor
                .trim()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/\s+/g, " ")
                .toLowerCase();
        }

        // Comprobar si otro participante utiliza el correo
        const correoDeOtroParticipante = inscripciones.some(
            (inscripcion) => {

                const mismoCorreo =
                    inscripcion.correo.toLowerCase() === correo;

                const mismoNombre =
                    normalizarNombre(inscripcion.nombre) ===
                    normalizarNombre(nombre);

                const mismoApellido =
                    normalizarNombre(inscripcion.apellido) ===
                    normalizarNombre(apellido);

                return mismoCorreo && !(mismoNombre && mismoApellido);
            }
        );

        // Rechazar un correo asociado a otro participante
        if (correoDeOtroParticipante) {

            mostrarMensaje(
                "Este correo electrónico ya está asociado a otro participante.",
                "danger"
            );

            return;
        }


        try {

            // Obtener el detalle económico antes de registrar
            const detallePago = obtenerDetallePago();

            if (!detallePago) {
                mostrarMensaje(
                    "No se pudo calcular el importe de la inscripción.",
                    "danger"
                );
                return;
            }


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


            // Guardar los datos del participante y su importe
            inscripciones.push({
                eventoId,
                nombre,
                apellido,
                correo,
                telefono,
                detallePago
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


    // ========================================
    // SELECCIÓN AUTOMÁTICA DEL EVENTO
    // ========================================

    tarjetas.forEach((tarjeta) => {

        // Buscar el enlace Inscribirme de cada tarjeta
        const botonInscribirme = tarjeta.querySelector(
            'a[href="#inscripcion"]'
        );

        if (!botonInscribirme) return;

        // Detectar cuando el usuario hace clic
        botonInscribirme.addEventListener("click", () => {

            // Obtener el ID de la tarjeta seleccionada
            const eventoId = Number(tarjeta.dataset.eventoId);

            // Buscar el evento en nuestro arreglo de objetos
            const evento = eventos.find(
                e => e.id === eventoId
            );

            // Obtener el selector del formulario
            const selectorEvento = document.getElementById(
                "eventoSeleccionado"
            );

            if (!evento || !selectorEvento) {
                console.error("No se pudo seleccionar el evento.");
                return;
            }

            // Seleccionar automáticamente el evento
            selectorEvento.value = String(evento.id);

            // Mostrar los materiales del evento seleccionado
            selectorEvento.dispatchEvent(new Event("change"));

            // Limpiar mensajes de operaciones anteriores
            mensaje.className = "mt-3";
            mensaje.textContent = "";

            // Facilitar la navegación con el teclado
            selectorEvento.focus({ preventScroll: true });

            console.log("Evento seleccionado:", evento.nombre);

        });

    });



    // ========================================
    // MOSTRAR DETALLES DE LOS EVENTOS
    // ========================================

    const listaEventos = document.getElementById("listaEventos");

    listaEventos.addEventListener("click", (event) => {

        const boton = event.target.closest("[data-ver-detalles]");

        if (!boton || !listaEventos.contains(boton)) {
            return;
        }

        // Identificar la tarjeta seleccionada
        const tarjeta = boton.closest(".tarjeta-evento");

        if (!tarjeta) return;

        const eventoId = Number(tarjeta.dataset.eventoId);

        // Buscar el objeto correspondiente
        const eventoSeleccionado = eventos.find(
            evento => evento.id === eventoId
        );

        if (!eventoSeleccionado) {
            console.error("No se encontró el evento.");
            return;
        }

        // Completar los datos de la ventana
        document.getElementById("tituloModalEvento")
            .textContent = eventoSeleccionado.nombre;


        document.getElementById("modalCategoria")
            .textContent = obtenerNombreCategoria(
                eventoSeleccionado.categoria
            );

        document.getElementById("modalFecha")
            .textContent = formatearFecha(
                eventoSeleccionado.fecha
            );


        document.getElementById("modalUbicacion")
            .textContent = eventoSeleccionado.ubicacion;

        document.getElementById("modalModalidad")
            .textContent = eventoSeleccionado.modalidad;

        document.getElementById("modalDescripcion")
            .textContent = eventoSeleccionado.descripcion;


        // Mostrar información específica según la modalidad
        let informacionAdicional = "";

        if (eventoSeleccionado instanceof EventoPresencial) {

            informacionAdicional =
                `Dirección: ${eventoSeleccionado.direccion}`;

        } else if (eventoSeleccionado instanceof EventoVirtual) {

            informacionAdicional =
                `Plataforma: ${eventoSeleccionado.plataforma}`;

        }

        document.getElementById("modalInformacion")
            .textContent = informacionAdicional;


        // Mostrar la ventana modal de Bootstrap
        const elementoModal = document.getElementById(
            "modalDetallesEvento"
        );

        const modal = bootstrap.Modal.getOrCreateInstance(
            elementoModal
        );

        modal.show();

    });

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
