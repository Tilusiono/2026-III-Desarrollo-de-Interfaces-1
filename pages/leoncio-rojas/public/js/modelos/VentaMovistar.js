import { Venta } from "./Venta.js";
import { centavos, moneda } from "../utilidades.js";

export class VentaMovistar extends Venta {
  #plan;
  #descuento;

  constructor(datos) {
    super(datos);
    this.#plan = datos.planMovistar;
    this.#descuento = centavos(datos.descuentoMovistar);
  }

  obtenerOperador() {
    return "Movistar";
  }

  obtenerDetalle() {
    return `Plan: ${this.#plan}; Descuento: ${moneda(this.#descuento)}`;
  }

  calcularAjuste() {
    return -this.#descuento;
  }
}