import Usuario from './Usuario.js';

export default class Alumno extends Usuario {
  constructor(nombre, apellido, correo, telefono, fechaNacimiento, genero, mensaje) {
    super(nombre, apellido, correo, telefono, fechaNacimiento, genero, mensaje);
  }

  obtenerRol() { return "Alumno"; }
  obtenerDescripcionRol() { return "Estudiante matriculado en los cursos y talleres activos."; }
}
