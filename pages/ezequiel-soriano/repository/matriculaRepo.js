export default class MatriculaRepo {
  #registros;
  #idCounter;

  constructor() {
    this.#registros = [];
    this.#idCounter = 1;
  }

  guardar(matricula) {
    const item = {
      id: this.#idCounter++,
      dni: matricula.dni,
      estudiante: matricula.estudiante,
      programa: matricula.programa,
      creditos: matricula.creditos,
      detalle: matricula.obtenerDetalle(),
      total: matricula.calcularTotal()
    };
    this.#registros.push(item);
    return item;
  }

  listar() {
    return this.#registros;
  }

  eliminar(id) {
    const index = this.#registros.findIndex(item => item.id === Number(id));
    if (index !== -1) {
      this.#registros.splice(index, 1);
      return true;
    }
    return false;
  }
}
