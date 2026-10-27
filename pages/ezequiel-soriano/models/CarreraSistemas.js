import MatriculaTech from './MatriculaTech.js';

export default class CarreraSistemas extends MatriculaTech {
  obtenerEspecialidad() { return "Administración de Sistemas e Infraestructura Cloud"; }
  obtenerDuracion() { return "3 años (6 Semestres)"; }
  calcularCosto() { return 400.00; }
}
