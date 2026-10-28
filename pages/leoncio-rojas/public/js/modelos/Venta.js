import { Venta } from "./Venta.js";
import { entero } from "../utilidades.js";

export class VentaLenovo extends Venta {
  #comboAccesorios;
  #porcentaje;

  constructor(datos) {
    super(datos);
    this.#comboAccesorios = datos.comboLenovo;
    this.#porcentaje = entero(datos.descuentoLenovo);
  }

  obtenerMarca() {
    return "Lenovo";
  }

  obtenerDetalle() {
    return `Combo: ${this.#comboAccesorios}; Descuento: ${this.#porcentaje}%`;
  }

  calcularAjuste() {
    // Descuento porcentual sobre el subtotal (resta al total)
    const descuento = Math.round(this.calcularSubtotal() * (this.#porcentaje / 100));
    return -descuento;
  }
}