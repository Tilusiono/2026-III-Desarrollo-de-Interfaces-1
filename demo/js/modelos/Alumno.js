import { Usuario } from "./Usuario.js";

export class Alumno extends Usuario {
    #codigoAlumno;
    carrera; // Atributo público propio de este rol.

    constructor(nombre, apellido, correo, telefono, fechaNacimiento, genero, mensaje, codigoAlumno, carrera) {
        super(nombre, apellido, correo, telefono, fechaNacimiento, genero, mensaje, "Alumno");
        this.codigoAlumno = codigoAlumno;
        if (typeof carrera !== "string" || !carrera.trim()) {
            throw new Error("Debe indicar: carrera.");
        }
        this.carrera = carrera.trim();
    }

    get codigoAlumno() { return this.#codigoAlumno; }
    set codigoAlumno(valor) {
        if (typeof valor !== "string" || !valor.trim()) {
            throw new Error("Debe indicar: código del alumno.");
        }
        this.#codigoAlumno = valor.trim();
    }

    obtenerRol() { return this.rol; }

    obtenerDescripcion() {
        return `Estudia ${this.carrera}; código de alumno ${this.#codigoAlumno}.`;
    }

    obtenerDetalles() {
        return [
            ["Código del alumno", this.codigoAlumno],
            ["Carrera", this.carrera]
        ];
    }
}
