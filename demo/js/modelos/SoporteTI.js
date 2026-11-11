import { Usuario } from "./Usuario.js";

export class SoporteTI extends Usuario {
    #especialidad;
    nivelSoporte;

    constructor(nombre, apellido, correo, telefono, fechaNacimiento, genero, mensaje, especialidad, nivelSoporte) {
        super(nombre, apellido, correo, telefono, fechaNacimiento, genero, mensaje, "Soporte TI");
        this.especialidad = especialidad;
        if (typeof nivelSoporte !== "string" || !nivelSoporte.trim()) {
            throw new Error("Debe indicar: nivel de soporte.");
        }
        this.nivelSoporte = nivelSoporte.trim();
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
        return `Brinda soporte técnico en ${this.#especialidad}; nivel de soporte: ${this.nivelSoporte}.`;
    }

    obtenerDetalles() {
        return [
            ["Especialidad", this.especialidad],
            ["Nivel de soporte", this.nivelSoporte]
        ];
    }
}