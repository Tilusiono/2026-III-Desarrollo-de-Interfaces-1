import { Evento } from "./evento.js";

export class EventoVirtual extends Evento {

    #plataforma;

    constructor(datos, plataforma) {
        super(datos);

        this.#plataforma = plataforma;
    }

    get plataforma() {
        return this.#plataforma;
    }

    get modalidad() {
        return "Virtual";
    }

    // Polimorfismo: comportamiento específico
    obtenerDetalles() {
        return `${super.obtenerDetalles()} | Plataforma: ${this.#plataforma}`;
    }
}

