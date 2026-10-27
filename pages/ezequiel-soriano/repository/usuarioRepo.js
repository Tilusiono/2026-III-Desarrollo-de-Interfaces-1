export default class UsuarioRepo {
  #registros;
  #idCounter;

  constructor() {
    this.#registros = [];
    this.#idCounter = 1;
  }

  guardar(usuario) {
    const item = {
      id: this.#idCounter++,
      nombreCompleto: `${usuario.nombre} ${usuario.apellido}`,
      correo: usuario.correo,
      telefono: usuario.telefono,
      fechaNacimiento: usuario.fechaNacimiento,
      genero: usuario.genero,
      rol: usuario.obtenerRol(),
      descripcionRol: usuario.obtenerDescripcionRol(),
      mensaje: usuario.mensaje
    };
    this.#registros.push(item);
    return item;
  }

  listar() {
    return this.#registros;
  }

  eliminar(id) {
    const index = this.#registros.findIndex(item => item.id === Number(id));
    if (index !== -1) {
      this.#registros.splice(index, 1);
      return true;
    }
    return false;
  }
}
