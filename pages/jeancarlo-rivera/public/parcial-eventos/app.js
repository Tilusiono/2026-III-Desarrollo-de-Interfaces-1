
"use strict";

// CLASE PADRE: representa un evento
class Evento {
    #inscritos = 0;

    constructor(id, nombre, fecha, ubicacion, categoria, capacidad) {
        this.id = id;
        this.nombre = nombre;
        this.fecha = fecha;
        this.ubicacion = ubicacion;
        this.categoria = categoria;
        this.capacidad = capacidad;
    }

    get inscritos() {
        return this.#inscritos;
    }

    hayCupos() {
        return this.#inscritos < this.capacidad;
    }

    registrar() {
        if (!this.hayCupos()) return false;
        this.#inscritos++;
        return true;
    }

    cancelar() {
        if (this.#inscritos > 0) {
            this.#inscritos--;
        }
    }

    descripcion() {
        return `${this.nombre} - ${this.categoria}`;
    }
}

// CLASE HIJA 1: hereda de Evento
class EventoPresencial extends Evento {
    constructor(id, nombre, fecha, ubicacion, categoria, capacidad, sala) {
        super(id, nombre, fecha, ubicacion, categoria, capacidad);
        this.sala = sala;
    }

    descripcion() {
        return `${super.descripcion()} | Sala: ${this.sala}`;
    }
}

// CLASE HIJA 2: hereda de Evento
class EventoVirtual extends Evento {
    #plataforma;

    constructor(id, nombre, fecha, categoria, capacidad, plataforma) {
        super(id, nombre, fecha, "En línea", categoria, capacidad);
        this.#plataforma = plataforma;
    }

    descripcion() {
        return `${super.descripcion()} | Plataforma: ${this.#plataforma}`;
    }
}

// Lista de eventos disponibles
const eventos = [
    new EventoPresencial(
        1, "Conferencia de Inteligencia Artificial",
        "25/10/2026", "Lima", "Tecnología", 30, "Auditorio A"
    ),
    new EventoVirtual(
        2, "Taller de Programación JavaScript",
        "28/10/2026", "Educación", 25, "Google Meet"
    ),
    new EventoPresencial(
        3, "Festival de Música",
        "30/10/2026", "Miraflores", "Entretenimiento", 50, "Escenario principal"
    ),
    new EventoVirtual(
        4, "Introducción al Desarrollo Web",
        "02/11/2026", "Tecnología", 20, "Zoom"
    )
];

// Guardamos los IDs de los eventos inscritos
const inscripciones = [];

const listaEventos = document.getElementById("lista-eventos");
const listaInscripciones = document.getElementById("mis-inscripciones");
const filtro = document.getElementById("filtro");

// Crear elementos de texto de manera segura
function agregarTexto(contenedor, etiqueta, texto) {
    const elemento = document.createElement(etiqueta);
    elemento.textContent = texto;
    contenedor.appendChild(elemento);
    return elemento;
}

// Mostrar los eventos
function mostrarEventos() {
    listaEventos.innerHTML = "";

    const categoria = filtro.value;

    const filtrados = eventos.filter(evento =>
        categoria === "todos" || evento.categoria === categoria
    );

    if (filtrados.length === 0) {
        agregarTexto(listaEventos, "p", "No hay eventos disponibles.");
        return;
    }

    filtrados.forEach(evento => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta";

        agregarTexto(tarjeta, "h3", evento.nombre);
        agregarTexto(tarjeta, "p", `Fecha: ${evento.fecha}`);
        agregarTexto(tarjeta, "p", `Ubicación: ${evento.ubicacion}`);
        agregarTexto(tarjeta, "p", `Categoría: ${evento.categoria}`);
        agregarTexto(tarjeta, "p", evento.descripcion());
        agregarTexto(
            tarjeta,
            "p",
            `Cupos disponibles: ${evento.capacidad - evento.inscritos}`
        );

        const boton = document.createElement("button");
        const inscrito = inscripciones.includes(evento.id);

        boton.textContent = inscrito ? "Ya inscrito" : "Inscribirme";
        boton.disabled = inscrito || !evento.hayCupos();

        if (!inscrito && !evento.hayCupos()) {
            boton.textContent = "Sin cupos";
        }

        boton.addEventListener("click", () => inscribir(evento.id));

        tarjeta.appendChild(boton);
        listaEventos.appendChild(tarjeta);
    });
}

// Registrar una inscripción
function inscribir(id) {
    const evento = eventos.find(e => e.id === id);

    if (!evento || inscripciones.includes(id)) return;

    if (evento.registrar()) {
        inscripciones.push(id);
        actualizarPantalla();
    }
}

// Cancelar una inscripción
function cancelarInscripcion(id) {
    const indice = inscripciones.indexOf(id);

    if (indice === -1) return;

    const evento = eventos.find(e => e.id === id);
    if (!evento) return;

    evento.cancelar();
    inscripciones.splice(indice, 1);
    actualizarPantalla();
}

// Mostrar las inscripciones
function mostrarInscripciones() {
    listaInscripciones.innerHTML = "";

    if (inscripciones.length === 0) {
        agregarTexto(
            listaInscripciones,
            "p",
            "Todavía no te has inscrito en ningún evento."
        );
        return;
    }

    inscripciones.forEach(id => {
        const evento = eventos.find(e => e.id === id);
        if (!evento) return;

        const tarjeta = document.createElement("div");
        tarjeta.className = "inscripcion";

        agregarTexto(tarjeta, "h3", evento.nombre);
        agregarTexto(tarjeta, "p", `Fecha: ${evento.fecha}`);

        const boton = document.createElement("button");
        boton.textContent = "Cancelar inscripción";
        boton.className = "btn-cancelar";

        boton.addEventListener("click", () => cancelarInscripcion(id));

        tarjeta.appendChild(boton);
        listaInscripciones.appendChild(tarjeta);
    });
}

// Actualizar sin recargar la página
function actualizarPantalla() {
    mostrarEventos();
    mostrarInscripciones();
}

// Filtrar eventos cuando cambia la categoría
filtro.addEventListener("change", mostrarEventos);

// Iniciar aplicación
actualizarPantalla();
