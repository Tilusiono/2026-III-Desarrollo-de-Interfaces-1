import Venta from './Venta.js';
import { centavos, entero, moneda } from '../utilidades.js';

export default class VentaSsd extends Venta {
  capacidad;
  #costoInstalacion;

  constructor(datos) {
    super(datos);
    this.capacidad = entero(datos.capacidad);
    this.#costoInstalacion = centavos(datos.costoInstalacion);
  }

  calcularAjuste() {
    return this.#costoInstalacion;
  }

  obtenerTipo() {
    return 'Almacenamiento SSD';
  }

  obtenerDetalle() {
    return `Capacidad: ${this.capacidad}GB (Clonado: +${moneda(this.#costoInstalacion)})`;
  }
}
