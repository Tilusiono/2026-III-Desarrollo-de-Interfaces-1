export default class Matricula {
  #dni;
  #estudiante;
  #programa;
  #creditos;

  constructor(dni, estudiante, programa, creditos) {
    this.#dni = dni;
    this.#estudiante = estudiante;
    this.#programa = programa;
    this.#creditos = Number(creditos);
  }

  get dni() { return this.#dni; }
  get estudiante() { return this.#estudiante; }
  get programa() { return this.#programa; }
  get creditos() { return this.#creditos; }

  calcularCostoBase() {
    const costoPorCredito = 50; // S/ 50 por crédito por defecto
    return this.#creditos * costoPorCredito;
  }

  calcularDescuento() {
    return 0;
  }

  calcularTotal() {
    return this.calcularCostoBase() - this.calcularDescuento();
  }

  obtenerDetalle() {
    return "Matrícula General";
  }
}
