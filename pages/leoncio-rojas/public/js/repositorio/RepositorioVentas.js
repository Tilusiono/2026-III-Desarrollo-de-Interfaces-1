import { Venta } from "../modelos/Venta.js";

export class RepositorioVentas {
  #ventas = [];
  #siguienteId = 1;

  guardar(venta) {
    if (!(venta instanceof Venta)) {
      throw new Error("Se esperaba un objeto Venta.");
    }
    const registro = Object.freeze({ id: this.#siguienteId++, venta });
    this.#ventas.push(registro);
    return registro;
  }

  listar() {
    return [...this.#ventas];
  }

  eliminar(id) {
    const indice = this.#ventas.findIndex((registro) => registro.id === id);
    if (indice === -1) {
      throw new Error("La venta seleccionada no existe.");
    }
    this.#ventas.splice(indice, 1);
  }
}