export default class Usuario {
  #nombre;
  #apellido;
  #correo;
  #telefono;
  #fechaNacimiento;
  #genero;
  #mensaje;

  constructor(nombre, apellido, correo, telefono, fechaNacimiento, genero, mensaje) {
    this.#nombre = nombre;
    this.#apellido = apellido;
    this.#correo = correo;
    this.#telefono = telefono;
    this.#fechaNacimiento = fechaNacimiento;
    this.#genero = genero;
    this.#mensaje = mensaje;
  }

  get nombre() { return this.#nombre; }
  get apellido() { return this.#apellido; }
  get correo() { return this.#correo; }
  get telefono() { return this.#telefono; }
  get fechaNacimiento() { return this.#fechaNacimiento; }
  get genero() { return this.#genero; }
  get mensaje() { return this.#mensaje; }

  obtenerRol() { return "Usuario General"; }
  obtenerDescripcionRol() { return "Sin rol específico asignado."; }
}
