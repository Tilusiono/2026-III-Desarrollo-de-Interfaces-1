import Venta from './Venta.js';
import { centavos, entero, moneda } from '../utilidades.js';

export default class VentaRam extends Venta {
  frecuencia;
  #costoDisipador;

  constructor(datos) {
    super(datos);
    this.frecuencia = entero(datos.frecuencia);
    this.#costoDisipador = centavos(datos.costoDisipador);
  }

  calcularAjuste() {
    return this.#costoDisipador;
  }

  obtenerTipo() {
    return 'Memoria RAM';
  }

  obtenerDetalle() {
    return `Frecuencia: ${this.frecuencia}MHz (Extra RGB: +${moneda(this.#costoDisipador)})`;
  }
}
