import Matricula from './Matricula.js';

export default class MatriculaBecado extends Matricula {
  #porcentajeBeca;

  constructor(dni, estudiante, programa, creditos, porcentajeBeca = 30) {
    super(dni, estudiante, programa, creditos);
    this.#porcentajeBeca = Number(porcentajeBeca);
  }

  calcularDescuento() {
    const subtotal = this.calcularCostoBase();
    return subtotal * (this.#porcentajeBeca / 100);
  }

  obtenerDetalle() {
    return `Modalidad: Becado (${this.#porcentajeBeca}% de descuento aplicado)`;
  }
}
