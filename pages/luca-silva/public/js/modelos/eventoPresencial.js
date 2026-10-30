
import { Evento } from "./evento.js";

export class EventoPresencial extends Evento {

    #direccion;

    constructor(datos, direccion) {
        super(datos);

        this.#direccion = direccion;
    }

    get direccion() {
        return this.#direccion;
    }

    get modalidad() {
        return "Presencial";
    }

    // Polimorfismo: sobrescribimos el método del padre
    obtenerDetalles() {
        return `${super.obtenerDetalles()} | Dirección: ${this.#direccion}`;
    }
}
