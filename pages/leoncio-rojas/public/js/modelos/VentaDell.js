import { Venta } from "./Venta.js";
import { centavos, entero, moneda } from "../utilidades.js";

export class VentaDell extends Venta {
  #mesesSoporte;
  #costoSoporte;

  constructor(datos) {
    super(datos);
    this.#mesesSoporte = entero(datos.mesesSoporteDell);
    this.#costoSoporte = centavos(datos.costoSoporteDell);
  }

  obtenerMarca() {
    return "Dell";
  }

  obtenerDetalle() {
    return `Soporte Pro: ${this.#mesesSoporte} meses; Costo: ${moneda(this.#costoSoporte)}`;
  }

  calcularAjuste() {
    // Cargo adicional por soporte técnico (suma al total)
    return this.#costoSoporte;
  }
}