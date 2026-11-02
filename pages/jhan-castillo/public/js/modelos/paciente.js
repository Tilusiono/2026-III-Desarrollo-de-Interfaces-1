// public/js/modelos/Paciente.js
import { Usuario } from './Usuario.js';

export class Paciente extends Usuario {
    #especialidadRequerida;
    #tieneCita;

    constructor(id, nombre, correo, especialidadRequerida) {
        super(id, nombre, correo, "Paciente");
        this.#especialidadRequerida = especialidadRequerida;
        this.#tieneCita = false; // Estado inicial del flujo
    }

    get especialidadRequerida() { return this.#especialidadRequerida; }
    get tieneCita() { return this.#tieneCita; }
    set tieneCita(estado) { this.#tieneCita = estado; }

    obtenerPresentacion() {
        const estadoCita = this.#tieneCita ? "Cita Confirmada" : "En espera de programación";
        return `${super.obtenerPresentacion()} | Requerimiento: ${this.#especialidadRequerida} | Estado: ${estadoCita}`;
    }
}
