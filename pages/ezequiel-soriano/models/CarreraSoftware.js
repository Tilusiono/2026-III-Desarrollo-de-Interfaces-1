import MatriculaTech from './MatriculaTech.js';

export default class CarreraSoftware extends MatriculaTech {
  obtenerEspecialidad() { return "Desarrollo de Software y Web"; }
  obtenerDuracion() { return "3 años (6 Semestres)"; }
  calcularCosto() { return 450.00; }
}
