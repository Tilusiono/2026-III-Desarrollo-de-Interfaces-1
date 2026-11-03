import Venta from './Venta.js';
import { centavos, moneda } from '../utilidades.js';

export default class VentaProcesador extends Venta {
  socket;
  #descuentoCombo;

  constructor(datos) {
    super(datos);
    this.socket = datos.socket || '';
    this.#descuentoCombo = centavos(datos.descuentoCombo);
  }

  calcularAjuste() {
    return -this.#descuentoCombo;
  }

  obtenerTipo() {
    return 'Procesador';
  }

  obtenerDetalle() {
    return `Socket: ${this.socket} (Combo: -${moneda(this.#descuentoCombo)})`;
  }
}
