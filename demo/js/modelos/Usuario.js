import { RolUsuario } from "../contratos/RolUsuario.js";

export class Usuario extends RolUsuario {
    #nombre;
    #apellido;
    #rol;

    // Campos públicos; se pueden consultar y modificar directamente.
    correo;
    telefono;
    fechaNacimiento;
    genero;
    mensaje;

    constructor(nombre, apellido, correo, telefono, fechaNacimiento, genero, mensaje, rol) {
        super();
        if (new.target === Usuario) {
            throw new Error("Usuario es abstracta: cree una subclase concreta.");
        }
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.telefono = telefono;
        this.fechaNacimiento = fechaNacimiento;
        this.genero = genero;
        this.mensaje = mensaje;
        if (typeof rol !== "string" || !rol.trim()) {
            throw new Error("Debe indicar un rol.");
        }
        this.#rol = rol.trim();
    }

    get nombre() { return this.#nombre; }
    set nombre(valor) {
        if (typeof valor !== "string" || valor.trim().length < 2) {
            throw new Error("El nombre debe tener al menos dos caracteres.");
        }
        this.#nombre = valor.trim();
    }

    get apellido() { return this.#apellido; }
    set apellido(valor) {
        if (typeof valor !== "string" || valor.trim().length < 2) {
            throw new Error("El apellido debe tener al menos dos caracteres.");
        }
        this.#apellido = valor.trim();
    }

    // Solo lectura: el rol lo establece la subclase en super().
    get rol() { return this.#rol; }

    obtenerNombreCompleto() {
        return `${this.#nombre} ${this.#apellido}`;
    }
}
