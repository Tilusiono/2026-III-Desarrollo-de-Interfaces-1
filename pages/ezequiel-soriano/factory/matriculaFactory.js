import MatriculaRegular from '../models/MatriculaRegular.js';
import MatriculaBecado from '../models/MatriculaBecado.js';
import MatriculaCorp from '../models/MatriculaCorp.js';

export default class MatriculaFactory {
  static crearMatricula(tipo, dni, estudiante, programa, creditos, extra) {
    switch (tipo.toLowerCase()) {
      case 'regular':
        return new MatriculaRegular(dni, estudiante, programa, creditos);
      case 'becado':
        return new MatriculaBecado(dni, estudiante, programa, creditos, extra);
      case 'corporativo':
        return new MatriculaCorp(dni, estudiante, programa, creditos);
      default:
        throw new Error('Tipo de matrícula no válido');
    }
  }
}
