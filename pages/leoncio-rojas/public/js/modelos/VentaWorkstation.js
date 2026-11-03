import Venta from './Venta.js';
import { centavos, moneda } from '../utilidades.js';

/**
 * Subclase VentaWorkstation: Aplica un recargo positivo por garantía extendida y soporte técnico especializado.
 */
export default class VentaWorkstation extends Venta {
  // 1 variable pública
  softwareLicencia;

  // 1 variable privada (#costo en centavos)
  #costo;

  constructor(datos) {
    super(datos);
    this.softwareLicencia = datos.softwareLicencia || 'Licencia AutoCAD / Blender 3D';
    this.#costo = centavos(datos.costoGarantia);
  }

  calcularAjuste() {
    // Recargo adicional positivo
    return this.#costo;
  }

  obtenerTipo() {
    return 'Workstation IA / 3D';
  }

  obtenerDetalle() {
    return `Suite: ${this.softwareLicencia} (Garantía VIP +${moneda(this.#costo)})`;
  }
}
