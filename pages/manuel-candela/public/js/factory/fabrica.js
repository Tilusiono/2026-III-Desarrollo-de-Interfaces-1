import { VentaPerfumeriaArabe } from "../model/venta-perfumeria-arabe.js";
import { VentaAccesoriosTech } from "../model/venta-accesorios-tech.js";
import { VentaHogarCocina } from "../model/venta-hogar-cocina.js";
import { VentaAccesoriosMascotas } from "../model/venta-accesorios-mascotas.js";

export function crearVenta(datos) {
  switch (datos.categoria) {
    case "perfumeria-arabe":
      return new VentaPerfumeriaArabe(datos);
    case "accesorios-tech":
      return new VentaAccesoriosTech(datos);
    case "hogar-cocina":
      return new VentaHogarCocina(datos);
    case "accesorios-mascotas":
      return new VentaAccesoriosMascotas(datos);
    default:
      throw new Error("Seleccione una categoría de producto.");
  }
}
