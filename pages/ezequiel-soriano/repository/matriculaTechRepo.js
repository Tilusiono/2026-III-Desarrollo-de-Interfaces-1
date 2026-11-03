export default class MatriculaTechRepo {
  #registros;
  #idCounter;

  constructor() {
    this.#registros = [];
    this.#idCounter = 1001;
  }

  guardar(matricula) {
    const item = {
      id: `TECH-${this.#idCounter++}`,
      estudiante: matricula.estudiante,
      correo: matricula.correo,
      telefono: matricula.telefono,
      fechaNacimiento: matricula.fechaNacimiento,
      genero: matricula.genero,
      especialidad: matricula.obtenerEspecialidad(),
      duracion: matricula.obtenerDuracion(),
      costo: matricula.calcularCosto(),
      observaciones: matricula.observaciones
    };
    this.#registros.push(item);
    return item;
  }

  listar() {
    return this.#registros;
  }

  eliminar(id) {
    const index = this.#registros.findIndex(item => item.id === id);
    if (index !== -1) {
      this.#registros.splice(index, 1);
      return true;
    }
    return false;
  }
}
