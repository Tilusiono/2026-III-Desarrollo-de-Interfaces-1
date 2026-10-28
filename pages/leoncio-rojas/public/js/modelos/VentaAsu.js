import { Venta } from "./Venta.js";
import { centavos, entero, moneda } from "../utilidades.js";

export class VentaAsus extends Venta {
  #ramExtra;
  #costoInstalacion;

  constructor(datos) {
    super(datos);
    this.#ramExtra = entero(datos.ramExtraAsus);
    this.#costoInstalacion = centavos(datos.costoInstalacionAsus);
  }

  obtenerMarca() {
    return "Asus";
  }

  obtenerDetalle() {
    return `Upgrade: ${this.#ramExtra} GB RAM; Instalación: ${moneda(this.#costoInstalacion)}`;
  }

  calcularAjuste() {
    // Cargo adicional por instalación de memoria (suma al total)
    return this.#costoInstalacion;
  }
}