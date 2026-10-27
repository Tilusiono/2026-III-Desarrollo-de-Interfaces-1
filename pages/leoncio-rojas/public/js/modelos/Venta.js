import { centavos, entero } from "../utilidades.js";

export class Venta {
  #cliente;
  #dni;
  #modelo;
  #cantidad;
  #precio;

  constructor(datos) {
    if (new.target === Venta) {
      throw new Error("No se puede instanciar directamente la clase base Venta.");
    }
    this.#cliente = datos.cliente;
    this.#dni = datos.dni;
    this.#modelo = datos.modelo;
    this.#cantidad = entero(datos.cantidad);
    this.#precio = centavos(datos.precioUnitario);
  }

  get cliente() { return this.#cliente; }
  get dni() { return this.#dni; }
  get modelo() { return this.#modelo; }
  get cantidad() { return this.#cantidad; }

  calcularSubtotal() {
    return this.#cantidad * this.#precio;
  }

  calcularAjuste() {
    throw new Error("Debe implementar calcularAjuste en la subclase.");
  }

  calcularTotal() {
    return this.calcularSubtotal() + this.calcularAjuste();
  }

  obtenerOperador() {
    throw new Error("Debe implementar obtenerOperador en la subclase.");
  }

  obtenerDetalle() {
    throw new Error("Debe implementar obtenerDetalle en la subclase.");
  }
}