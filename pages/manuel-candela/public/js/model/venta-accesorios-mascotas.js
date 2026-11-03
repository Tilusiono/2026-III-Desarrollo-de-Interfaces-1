import { convertirCentavos } from "../view/utilidades.js";
import { Venta } from "./venta.js";

export class VentaAccesoriosMascotas extends Venta {
  constructor(datos) {
    super(datos);
    this.talla = datos.tipoMascota?.trim() ?? "";
    this.empaqueEspecial = convertirCentavos(datos.cargoMascotas, "El costo de empaque");

    if (!this.talla) {
      throw new Error("Ingrese la talla del accesorio.");
    }
  }

  calcularAjuste() {
    return this.empaqueEspecial;
  }
}
