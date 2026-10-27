export default class MatriculaTech {
  #estudiante;
  #correo;
  #telefono;
  #fechaNacimiento;
  #genero;
  #observaciones;

  constructor(estudiante, correo, telefono, fechaNacimiento, genero, observaciones) {
    this.#estudiante = estudiante;
    this.#correo = correo;
    this.#telefono = telefono;
    this.#fechaNacimiento = fechaNacimiento;
    this.#genero = genero;
    this.#observaciones = observaciones;
  }

  get estudiante() { return this.#estudiante; }
  get correo() { return this.#correo; }
  get telefono() { return this.#telefono; }
  get fechaNacimiento() { return this.#fechaNacimiento; }
  get genero() { return this.#genero; }
  get observaciones() { return this.#observaciones; }

  obtenerEspecialidad() { return "Tecnología General"; }
  obtenerDuracion() { return "Sin especificar"; }
  calcularCosto() { return 0.00; }
}
