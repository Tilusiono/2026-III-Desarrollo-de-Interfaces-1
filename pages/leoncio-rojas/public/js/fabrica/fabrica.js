import { VentaMovistar } from "../modelos/VentaMovistar.js";
import { VentaClaro } from "../modelos/VentaClaro.js";
import { VentaEntel } from "../modelos/VentaEntel.js";
import { VentaBitel } from "../modelos/VentaBitel.js";

export function crearVenta(datos) {
  switch (datos.operador) {
    case "movistar":
      return new VentaMovistar(datos);
    case "claro":
      return new VentaClaro(datos);
    case "entel":
      return new VentaEntel(datos);
    case "bitel":
      return new VentaBitel(datos);
    default:
      throw new Error("Seleccione un operador válido.");
  }
}