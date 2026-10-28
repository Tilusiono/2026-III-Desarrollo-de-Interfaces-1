import Venta from './Venta.js';
import { centavos, moneda } from '../utilidades.js';

/**
 * Subclase VentaServidor: Aplica un recargo positivo por instalación y configuración en rack.
 */
export default class VentaServidor extends Venta {
  // 1 variable pública
  tipoVirtualizacion;

  // 1 variable privada (#costo en centavos)
  #costo;

  constructor(datos) {
    super(datos);
    this.tipoVirtualizacion = datos.tipoVirtualizacion || 'Cluster Proxmox / Docker';
    this.#costo = centavos(datos.costoInstalacion);
  }

  calcularAjuste() {
    // Recargo adicional positivo
    return this.#costo;
  }

  obtenerTipo() {
    return 'Servidor Cloud / Rack';
  }

  obtenerDetalle() {
    return `Entorno: ${this.tipoVirtualizacion} (Instalación +${moneda(this.#costo)})`;
  }
}
