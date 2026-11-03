import CarreraSoftware from '../models/CarreraSoftware.js';
import CarreraRedes from '../models/CarreraRedes.js';
import CarreraSistemas from '../models/CarreraSistemas.js';
import BootcampIA from '../models/BootcampIA.js';

export default class MatriculaTechFactory {
  static crearMatricula(tipo, estudiante, correo, telefono, fechaNacimiento, genero, observaciones) {
    switch (tipo.toLowerCase()) {
      case 'software':
      case 'alumno': // Mapeado de compatibilidad
        return new CarreraSoftware(estudiante, correo, telefono, fechaNacimiento, genero, observaciones);
      case 'redes':
      case 'maestro': // Mapeado de compatibilidad
        return new CarreraRedes(estudiante, correo, telefono, fechaNacimiento, genero, observaciones);
      case 'sistemas':
      case 'personalapoyo': // Mapeado de compatibilidad
        return new CarreraSistemas(estudiante, correo, telefono, fechaNacimiento, genero, observaciones);
      case 'bootcamp':
      case 'soporteti': // Mapeado de compatibilidad
        return new BootcampIA(estudiante, correo, telefono, fechaNacimiento, genero, observaciones);
      default:
        return new CarreraSoftware(estudiante, correo, telefono, fechaNacimiento, genero, observaciones);
    }
  }
}
