import Alumno from '../models/Alumno.js';
import Maestro from '../models/Maestro.js';
import PersonalApoyo from '../models/PersonalApoyo.js';
import SoporteTI from '../models/SoporteTI.js';

export default class UsuarioFactory {
  static crearUsuario(tipo, nombre, apellido, correo, telefono, fechaNacimiento, genero, mensaje) {
    switch (tipo.toLowerCase()) {
      case 'alumno':
        return new Alumno(nombre, apellido, correo, telefono, fechaNacimiento, genero, mensaje);
      case 'maestro':
        return new Maestro(nombre, apellido, correo, telefono, fechaNacimiento, genero, mensaje);
      case 'personalapoyo':
        return new PersonalApoyo(nombre, apellido, correo, telefono, fechaNacimiento, genero, mensaje);
      case 'soporteti':
        return new SoporteTI(nombre, apellido, correo, telefono, fechaNacimiento, genero, mensaje);
      default:
        throw new Error('Tipo de usuario no válido');
    }
  }
}
