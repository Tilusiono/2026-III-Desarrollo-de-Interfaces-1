export default class GimnasioRepo {
  constructor() {
    this.storageKey = "fitgymReservas";
  }

  listar() {
    return JSON.parse(localStorage.getItem(this.storageKey) || "[]");
  }

  guardar(reserva) {
    const reservas = this.listar();
    reservas.push(reserva);
    localStorage.setItem(this.storageKey, JSON.stringify(reservas));
  }

  eliminar(id) {
    let reservas = this.listar();
    reservas = reservas.filter(r => r.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(reservas));
  }
}