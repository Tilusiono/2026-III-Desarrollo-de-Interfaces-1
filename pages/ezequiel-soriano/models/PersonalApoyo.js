import Usuario from './Usuario.js';

export default class PersonalApoyo extends Usuario {
  constructor(nombre, apellido, correo, telefono, fechaNacimiento, genero, mensaje) {
    super(nombre, apellido, correo, telefono, fechaNacimiento, genero, mensaje);
  }

  obtenerRol() { return "Personal de apoyo"; }
  obtenerDescripcionRol() { return "Encargado de la asistencia administrativa y atención en instalaciones."; }
}
