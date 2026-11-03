import Venta from './Venta.js';
import { centavos, moneda } from '../utilidades.js';

/**
 * Subclase VentaUltrabook: Aplica un descuento fijo negativo en soles.
 */
export default class VentaUltrabook extends Venta {
  // 1 variable pública
  fundaProtectora;

  // 1 variable privada (#descuento fijo en centavos)
  #descuento;

  constructor(datos) {
    super(datos);
    this.fundaProtectora = datos.fundaProtectora || 'Funda de Cuero Ejecutivo';
    this.#descuento = centavos(datos.descuentoFijo);
  }

  calcularAjuste() {
    // Descuento fijo negativo
    return -this.#descuento;
  }

  obtenerTipo() {
    return 'Ultrabook Portátil';
  }

  obtenerDetalle() {
    return `Accesorio: ${this.fundaProtectora} (Cupón -${moneda(this.#descuento)})`;
  }
}
