import Venta from '../modelos/Venta.js';

/**
 * Patrón Repositorio en memoria para el almacenamiento y gestión de ventas.
 */
export default class RepositorioVentas {
  #ventas = [];
  #siguienteId = 1;

  /**
   * Guarda una venta en el repositorio asignando un ID secuencial e inmutabilizando el registro.
   * @param {Venta} venta 
   * @returns {Object} Registro congelado { id, venta }
   */
  guardar(venta) {
    if (!(venta instanceof Venta)) {
      throw new Error('El objeto a guardar debe ser una instancia válida de la clase Venta');
    }

    venta.id = this.#siguienteId++;
    const registro = Object.freeze({
      id: venta.id,
      venta
    });

    this.#ventas.push(registro);
    return registro;
  }

  /**
   * Retorna una copia superficial del arreglo de ventas registradas.
   * @returns {Array<Object>}
   */
  listar() {
    return [...this.#ventas];
  }

  /**
   * Elimina un registro de venta según su ID.
   * @param {number|string} id 
   * @returns {Object} Registro eliminado
   */
  eliminar(id) {
    const idNumero = Number(id);
    const indice = this.#ventas.findIndex((r) => r.id === idNumero);

    if (indice === -1) {
      throw new Error(`No se encontró la venta con ID ${id}`);
    }

    return this.#ventas.splice(indice, 1)[0];
  }
}
