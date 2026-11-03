export class RepositorioVentas {
  constructor() {
    this.registros = [];
    this.siguienteId = 1;
  }

  guardar(venta) {
    const registro = { id: this.siguienteId, venta };
    this.siguienteId += 1;
    this.registros.push(registro);
    return registro;
  }

  listar() {
    return [...this.registros];
  }

  eliminar(id) {
    const cantidadInicial = this.registros.length;
    this.registros = this.registros.filter(registro => registro.id !== id);
    return this.registros.length < cantidadInicial;
  }
}