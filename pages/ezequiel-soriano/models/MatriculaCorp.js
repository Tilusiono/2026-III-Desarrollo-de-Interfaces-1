import Matricula from './Matricula.js';

export default class MatriculaCorp extends Matricula {
  constructor(dni, estudiante, programa, creditos) {
    super(dni, estudiante, programa, creditos);
  }

  calcularDescuento() {
    // Descuento fijo por convenio empresarial
    return 100;
  }

  obtenerDetalle() {
    return "Modalidad: Corporativo (Convenio Empresa - Descuento S/ 100)";
  }
}
