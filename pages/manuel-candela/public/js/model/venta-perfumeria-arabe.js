import { convertirEntero } from "../view/utilidades.js";
import { Venta } from "./venta.js";

export class VentaPerfumeriaArabe extends Venta {
  constructor(datos) {
    super(datos);
    this.presentacion = datos.presentacionPerfumes?.trim() ?? "";
    this.descuento = convertirEntero(datos.descuentoPerfumes, "El descuento", 0, 100);

    if (!this.presentacion) {
      throw new Error("Ingrese la presentación del perfume.");
    }
  }

  calcularAjuste() {
    return -Math.round(this.calcularSubtotal() * this.descuento / 100);
  }
}
