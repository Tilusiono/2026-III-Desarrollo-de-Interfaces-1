import Usuario from './Usuario.js';

export default class SoporteTI extends Usuario {
  constructor(nombre, apellido, correo, telefono, fechaNacimiento, genero, mensaje) {
    super(nombre, apellido, correo, telefono, fechaNacimiento, genero, mensaje);
  }

  obtenerRol() { return "Soporte TI"; }
  obtenerDescripcionRol() { return "Administrador de sistemas, redes y mantenimiento de equipos."; }
}
