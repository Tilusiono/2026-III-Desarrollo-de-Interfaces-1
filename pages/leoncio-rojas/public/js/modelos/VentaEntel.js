import { Venta } from "./Venta.js";
import { centavos, entero, moneda } from "../utilidades.js";

export class VentaEntel extends Venta {
  #meses;
  #costo;

  constructor(datos) {
    super(datos);
    this.#meses = entero(datos.mesesGarantiaEntel);
    this.#costo = centavos(datos.costoGarantiaEntel);
  }

  obtenerOperador() {
    return "Entel";
  }

  obtenerDetalle() {
    return `Garantía: ${this.#meses} meses; Costo: ${moneda(this.#costo)}`;
  }

  calcularAjuste() {
    return this.#costo;
  }
}