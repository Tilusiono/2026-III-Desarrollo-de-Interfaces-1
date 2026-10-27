import Usuario from './Usuario.js';

export default class Maestro extends Usuario {
  constructor(nombre, apellido, correo, telefono, fechaNacimiento, genero, mensaje) {
    super(nombre, apellido, correo, telefono, fechaNacimiento, genero, mensaje);
  }

  obtenerRol() { return "Maestro"; }
  obtenerDescripcionRol() { return "Docente encargado de impartir clases y evaluar módulos."; }
}
