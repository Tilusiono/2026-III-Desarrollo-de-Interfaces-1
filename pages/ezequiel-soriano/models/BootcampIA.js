import MatriculaTech from './MatriculaTech.js';

export default class BootcampIA extends MatriculaTech {
  obtenerEspecialidad() { return "Bootcamp de IA & Ciencia de Datos"; }
  obtenerDuracion() { return "6 meses (Intensivo)"; }
  calcularCosto() { return 250.00; }
}
