import { Venta } from "./Venta.js";
import { centavos, entero, moneda } from "../utilidades.js";

export class VentaBitel extends Venta {
  #gb;
  #activacion;

  constructor(datos) {
    super(datos);
    this.#gb = entero(datos.gbBonoBitel);
    this.#activacion = centavos(datos.costoActivacionBitel);
  }

  obtenerOperador() {
    return "Bitel";
  }

  obtenerDetalle() {
    return `Bono: ${this.#gb} GB por equipo; Activación: ${moneda(this.#activacion)}`;
  }

  calcularAjuste() {
    return this.#activacion;
  }
}