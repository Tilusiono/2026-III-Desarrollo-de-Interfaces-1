import { Usuario } from "./Usuario.js";

export class Maestro extends Usuario {
    #especialidad;
    gradoAcademico; // Atributo público propio de este rol.

    constructor(nombre, apellido, correo, telefono, fechaNacimiento, genero, mensaje, especialidad, gradoAcademico) {
        super(nombre, apellido, correo, telefono, fechaNacimiento, genero, mensaje, "Maestro");
        this.especialidad = especialidad;
        if (typeof gradoAcademico !== "string" || !gradoAcademico.trim()) {
            throw new Error("Debe indicar: grado académico.");
        }
        this.gradoAcademico = gradoAcademico.trim();
    }

    get especialidad() { return this.#especialidad; }
    set especialidad(valor) {
        if (typeof valor !== "string" || !valor.trim()) {
            throw new Error("Debe indicar: especialidad.");
        }
        this.#especialidad = valor.trim();
    }

    obtenerRol() { return this.rol; }

    obtenerDescripcion() {
        return `Imparte clases de ${this.#especialidad}; grado académico: ${this.gradoAcademico}.`;
    }

    obtenerDetalles() {
        return [
            ["Especialidad", this.especialidad],
            ["Grado académico", this.gradoAcademico]
        ];
    }
}
