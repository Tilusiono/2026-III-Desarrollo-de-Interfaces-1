import Matricula from './Matricula.js';

export default class MatriculaRegular extends Matricula {
  constructor(dni, estudiante, programa, creditos) {
    super(dni, estudiante, programa, creditos);
  }

  obtenerDetalle() {
    return "Modalidad: Regular (Sin descuento)";
  }
}
