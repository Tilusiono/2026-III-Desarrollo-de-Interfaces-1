import { VentaHP } from "../modelos/VentaHP.js";
import { VentaLenovo } from "../modelos/VentaLenovo.js";
import { VentaDell } from "../modelos/VentaDell.js";
import { VentaAsus } from "../modelos/VentaAsus.js";

export function crearVenta(datos) {
  switch (datos.marca) {
    case "hp":
      return new VentaHP(datos);
    case "lenovo":
      return new VentaLenovo(datos);
    case "dell":
      return new VentaDell(datos);
    case "asus":
      return new VentaAsus(datos);
    default:
      throw new Error("Seleccione una marca válida.");
  }
}