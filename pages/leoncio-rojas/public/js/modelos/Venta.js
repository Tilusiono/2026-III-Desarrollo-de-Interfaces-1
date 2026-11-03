import { centavos, entero } from '../utilidades.js';

/**
 * Clase base abstracta Venta
 */
export default class Venta {
  // 2 variables privadas
  #dni;
  #precio;

  // 3 variables públicas
  cliente;
  modelo;
  cantidad;

  // Identificador asignado por el repositorio
  id = null;

  constructor(datos) {
    if (new.target === Venta) {
      throw new Error('No se puede instanciar directamente la clase abstracta Venta');
    }

    this.cliente = datos.cliente;
    this.#dni = String(datos.dni || '');
    this.modelo = datos.modelo;
    this.#precio = centavos(datos.precioUnitario);
    this.cantidad = entero(datos.cantidad);
  }

  get dni() {
    return this.#dni;
  }

  get precio() {
    return this.#precio;
  }

  calcularSubtotal() {
    return this.cantidad * this.#precio;
  }

  calcularTotal() {
    return this.calcularSubtotal() + this.calcularAjuste();
  }

  calcularAjuste() {
    throw new Error('El método abstracto calcularAjuste() debe ser implementado');
  }

  obtenerTipo() {
    throw new Error('El método abstracto obtenerTipo() debe ser implementado');
  }

  obtenerDetalle() {
    throw new Error('El método abstracto obtenerDetalle() debe ser implementado');
  }
}
