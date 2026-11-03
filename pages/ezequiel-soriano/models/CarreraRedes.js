import MatriculaTech from './MatriculaTech.js';

export default class CarreraRedes extends MatriculaTech {
  obtenerEspecialidad() { return "Redes, Seguridad y Ciberseguridad"; }
  obtenerDuracion() { return "3 años (6 Semestres)"; }
  calcularCosto() { return 420.00; }
}
