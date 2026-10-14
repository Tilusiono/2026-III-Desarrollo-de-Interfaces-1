import { Usuario } from "./Usuario.js";

export class PersonalAseo extends Usuario {
    #areaAsignada;
    turno; // Atributo público propio de este rol.

    constructor(nombre, apellido, correo, telefono, fechaNacimiento, genero, mensaje, areaAsignada, turno) {
        super(nombre, apellido, correo, telefono, fechaNacimiento, genero, mensaje, "Personal de aseo");
        this.areaAsignada = areaAsignada;
        if (typeof turno !== "string" || !turno.trim()) {
            throw new Error("Debe indicar: turno.");
        }
        this.turno = turno.trim();
    }

    get areaAsignada() { return this.#areaAsignada; }
    set areaAsignada(valor) {
        if (typeof valor !== "string" || !valor.trim()) {
            throw new Error("Debe indicar: área asignada.");
        }
        this.#areaAsignada = valor.trim();
    }

    obtenerRol() { return this.rol; }

    obtenerDescripcion() {
        return `Realiza la limpieza de ${this.#areaAsignada} en el turno ${this.turno}.`;
    }

    obtenerDetalles() {
        return [
            ["Área asignada", this.areaAsignada],
            ["Turno", this.turno]
        ];
    }
}
