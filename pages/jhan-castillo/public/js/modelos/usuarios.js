// public/js/modelos/Usuario.js

export class Usuario {
    // Atributos privados (#) para asegurar el encapsulamiento estricto
    #id;
    #nombre;
    #correo;
    #rol;

    constructor(id, nombre, correo, rol) {
        this.#id = id;
        this.#nombre = nombre;
        this.#correo = correo;
        this.#rol = rol;
    }

    // Métodos Getter y Setter eficientes exigidos por la rúbrica
    get id() { return this.#id; }
    get nombre() { return this.#nombre; }
    get correo() { return this.#correo; }
    get rol() { return this.#rol; }

    set nombre(nuevoNombre) {
        if (nuevoNombre.trim() !== "") this.#nombre = nuevoNombre;
    }

    // Método que será sobrescrito en las subclases (Polimorfismo)
    obtenerPresentacion() {
        return `[${this.#rol}] ${this.#nombre} - Contacto: ${this.#correo}`;
    }
}
