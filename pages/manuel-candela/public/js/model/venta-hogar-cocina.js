import { convertirEntero } from "../view/utilidades.js";
import { Venta } from "./venta.js";

export class VentaHogarCocina extends Venta {
  constructor(datos) {
    super(datos);
    this.material = datos.tipoHogar?.trim() ?? "";
    this.descuento = convertirEntero(datos.descuentoHogar, "El descuento", 0, 100);

    if (!this.material) {
      throw new Error("Ingrese el material del producto.");
    }
  }

  calcularAjuste() {
    return -Math.round(this.calcularSubtotal() * this.descuento / 100);
  }
}
