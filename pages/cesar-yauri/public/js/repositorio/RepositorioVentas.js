import Venta from '../modelos/Venta.js';

export default class RepositorioVentas {
  #ventas = [];
  #siguienteId = 1;

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

  listar() {
    return [...this.#ventas];
  }

  eliminar(id) {
    const idNumero = Number(id);
    const indice = this.#ventas.findIndex((r) => r.id === idNumero);

    if (indice === -1) {
      throw new Error(`No se encontró la venta con ID ${id}`);
    }

    return this.#ventas.splice(indice, 1)[0];
  }
}
