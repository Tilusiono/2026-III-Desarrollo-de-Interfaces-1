import VentaProcesador from '../modelos/VentaProcesador.js';
import VentaGpu from '../modelos/VentaGpu.js';
import VentaRam from '../modelos/VentaRam.js';
import VentaSsd from '../modelos/VentaSsd.js';

export function crearVenta(datos) {
  switch (datos.categoria) {
    case 'procesador':
      return new VentaProcesador(datos);
    case 'gpu':
      return new VentaGpu(datos);
    case 'ram':
      return new VentaRam(datos);
    case 'ssd':
      return new VentaSsd(datos);
    default:
      throw new Error(`Categoría de venta desconocida o no soportada: "${datos.categoria}"`);
  }
}
