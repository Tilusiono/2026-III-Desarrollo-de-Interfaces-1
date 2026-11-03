import VentaGamer from '../modelos/VentaGamer.js';
import VentaUltrabook from '../modelos/VentaUltrabook.js';
import VentaWorkstation from '../modelos/VentaWorkstation.js';
import VentaServidor from '../modelos/VentaServidor.js';

/**
 * Patrón Factory Method para instanciar la subclase adecuada de Venta según la categoría.
 * @param {Object} datos 
 * @returns {VentaGamer|VentaUltrabook|VentaWorkstation|VentaServidor}
 */
export function crearVenta(datos) {
  switch (datos.categoria) {
    case 'gamer':
      return new VentaGamer(datos);
    case 'ultrabook':
      return new VentaUltrabook(datos);
    case 'workstation':
      return new VentaWorkstation(datos);
    case 'servidor':
      return new VentaServidor(datos);
    default:
      throw new Error(`Categoría de venta desconocida o no soportada: "${datos.categoria}"`);
  }
}
