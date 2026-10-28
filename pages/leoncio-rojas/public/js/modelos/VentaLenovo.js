import { Venta } from "./Venta.js";
import { entero } from "../utilidades.js";

export class VentaClaro extends Venta {
  #paquete;
  #porcentaje;

  constructor(datos) {
    super(datos);
    this.#paquete = datos.paqueteClaro;
    this.#porcentaje = entero(datos.descuentoClaro);
  }

  obtenerOperador() {
    return "Claro";
  }

  obtenerDetalle() {
    return `Paquete: ${this.#paquete}; Descuento: ${this.#porcentaje}%`;
  }

  calcularAjuste() {
    const descuento = Math.round(this.calcularSubtotal() * (this.#porcentaje / 100));
    return -descuento;
  }
} 