import { convertirEntero } from "../view/utilidades.js";
import { Venta } from "./venta.js";

export class VentaAccesoriosTech extends Venta {
  constructor(datos) {
    super(datos);
    this.modelo = datos.modeloTech?.trim() ?? "";
    this.mesesGarantia = convertirEntero(datos.cargoTech, "Los meses de garantía", 1, 36);

    if (!this.modelo) {
      throw new Error("Ingrese el modelo del accesorio.");
    }
  }
}
