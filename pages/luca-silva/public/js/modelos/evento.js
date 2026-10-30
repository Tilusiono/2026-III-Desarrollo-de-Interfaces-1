export class Evento {

    // Atributos privados
    #id;
    #nombre;
    #fecha;
    #ubicacion;
    #categoria;
    #descripcion;
    #inscritos = new Set();

    constructor({ id, nombre, fecha, ubicacion, categoria, descripcion }) {
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("El ID del evento no es válido.");
        }

        this.#id = id;
        this.nombre = nombre;
        this.#fecha = fecha;
        this.#ubicacion = ubicacion;
        this.#categoria = categoria;
        this.#descripcion = descripcion;
    }

    // Getters: permiten consultar los atributos
    get id() {
        return this.#id;
    }

    get nombre() {
        return this.#nombre;
    }

    get fecha() {
        return this.#fecha;
    }

    get ubicacion() {
        return this.#ubicacion;
    }

    get categoria() {
        return this.#categoria;
    }

    get descripcion() {
        return this.#descripcion;
    }

    get modalidad() {
        return "General";
    }

    get cantidadInscritos() {
        return this.#inscritos.size;
    }

    get estadoInscripcion() {
        return this.cantidadInscritos > 0
            ? "Con inscripciones"
            : "Sin inscripciones";
    }

    // Setter: permite modificar el nombre con validación
    set nombre(nuevoNombre) {
        if (typeof nuevoNombre !== "string" || !nuevoNombre.trim()) {
            throw new Error("El nombre del evento no puede estar vacío.");
        }

        this.#nombre = nuevoNombre.trim();
    }

    // Método privado para normalizar y validar correos
    #normalizarCorreo(correo) {
        const valor = typeof correo === "string"
            ? correo.trim().toLowerCase()
            : "";

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
            throw new Error("El correo electrónico no es válido.");
        }

        return valor;
    }

    // Registrar una inscripción
    inscribir(correo) {
        const correoValidado = this.#normalizarCorreo(correo);

        if (this.#inscritos.has(correoValidado)) {
            return false;
        }

        this.#inscritos.add(correoValidado);
        return true;
    }

    // Cancelar una inscripción
    cancelarInscripcion(correo) {
        const correoValidado = this.#normalizarCorreo(correo);
        return this.#inscritos.delete(correoValidado);
    }

    // Comprobar si una persona está inscrita
    estaInscrito(correo) {
        const correoValidado = this.#normalizarCorreo(correo);
        return this.#inscritos.has(correoValidado);
    }

    // Método que pueden sobrescribir las clases hijas
    obtenerDetalles() {
        return `${this.nombre} | ${this.fecha} | ${this.ubicacion}`;
    }
}
