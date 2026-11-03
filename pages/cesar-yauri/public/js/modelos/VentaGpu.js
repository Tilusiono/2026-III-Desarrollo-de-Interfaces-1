import Venta from './Venta.js';

export default class VentaGpu extends Venta {
  refrigeracion;
  #descuentoCyber;

  constructor(datos) {
    super(datos);
    this.refrigeracion = datos.refrigeracion || '';
    this.#descuentoCyber = Number(datos.descuentoCyber || 0);
  }

  calcularAjuste() {
    return -Math.round(this.calcularSubtotal() * (this.#descuentoCyber / 100));
  }

  obtenerTipo() {
    return 'Tarjeta de Video';
  }

  obtenerDetalle() {
    return `Refrig: ${this.refrigeracion} (Cyber: -${this.#descuentoCyber}%)`;
  }
}
