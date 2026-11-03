export default class GimnasioFactory {
  static crearReserva(nombre, apellido, correo, telefono, clase) {
    return {
      id: 'GYM-' + Math.floor(1000 + Math.random() * 9000),
      nombre,
      apellido,
      correo,
      telefono,
      clase
    };
  }
}