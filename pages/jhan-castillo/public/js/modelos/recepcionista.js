// public/js/modelos/Recepcionista.js
import { Usuario } from './Usuario.js';

export class Recepcionista extends Usuario {
    #anexo;

    constructor(id, nombre, correo, anexo) {
        super(id, nombre, correo, "Recepcionista");
        this.#anexo = anexo;
    }

    get anexo() { return this.#anexo; }

    obtenerPresentacion() {
        return `${super.obtenerPresentacion()} | Anexo Telefónico: ${this.#anexo}`;
    }
}
