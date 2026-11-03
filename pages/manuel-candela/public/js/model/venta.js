import { convertirCentavos, convertirEntero } from "../view/utilidades.js";

export class Venta {
  constructor(datos) {
    const precio = convertirCentavos(datos.precioUnitario, "El precio unitario");
    this.cantidad = convertirEntero(datos.cantidad, "La cantidad", 1, 100);
    this.precioUnitario = precio;
    this.cliente = datos.cliente?.trim() ?? "";
    this.dni = datos.dni?.trim() ?? "";
    this.numeroCelular = datos.numeroCelular?.trim() ?? "";
    this.metodoPago = datos.metodoPago ?? "";
    this.categoria = datos.categoria ?? "";
    this.producto = datos.producto?.trim() ?? "";

    if (!/^\d{8}$/.test(this.dni)) {
      throw new Error("Ingrese un DNI válido de ocho dígitos.");
    }
    if (!/^\d{9}$/.test(this.numeroCelular)) {
      throw new Error("Ingrese un número de celular válido de nueve dígitos.");
    }
    if (!this.metodoPago) {
      throw new Error("Seleccione un método de pago.");
    }
    if (!this.cliente) {
      throw new Error("Ingrese el nombre del cliente.");
    }
    if (!this.producto) {
      throw new Error("Seleccione un producto.");
    }
  }

  calcularSubtotal() {
    return this.precioUnitario * this.cantidad;
  }

  calcularAjuste() {
    return 0;
  }

  calcularTotal() {
    const subtotal = this.calcularSubtotal();
    const ajuste = this.calcularAjuste();

    if (subtotal + ajuste < 0) {
      throw new Error("El ajuste no puede superar el subtotal.");
    }

    return { subtotal, ajuste, total: subtotal + ajuste };
  }
}