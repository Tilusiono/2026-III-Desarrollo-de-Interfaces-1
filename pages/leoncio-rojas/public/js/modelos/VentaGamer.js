import Venta from './Venta.js';

/**
 * Subclase VentaGamer: Aplica un descuento porcentual negativo sobre el subtotal.
 */
export default class VentaGamer extends Venta {
  // 1 variable pública
  perifericoRegalo;

  // 1 variable privada (#descuento en porcentaje)
  #descuento;

  constructor(datos) {
    super(datos);
    this.perifericoRegalo = datos.perifericoRegalo || 'Combo Teclado Mecánico + Mouse RGB';
    this.#descuento = Number(datos.descuentoGamer || 0);
  }

  calcularAjuste() {
    // Descuento porcentual negativo sobre el subtotal
    return -Math.round(this.calcularSubtotal() * (this.#descuento / 100));
  }

  obtenerTipo() {
    return 'Laptop Gamer';
  }

  obtenerDetalle() {
    return `Combo: ${this.perifericoRegalo} (Desc. ${this.#descuento}%)`;
  }
}
