import { moneda } from "./utilidades.js";
import { crearVenta } from "../factory/fabrica.js";
import { RepositorioVentas } from "../repository/RepositorioVentas.js";

const formulario = document.querySelector("#formularioVenta");
const categoria = document.querySelector("#categoria");
const producto = document.querySelector("#producto");
const paneles = document.querySelectorAll("[data-categoria]");
const mensaje = document.querySelector("#mensaje");

const productosPorCategoria = {
  "perfumeria-arabe": [
    "Perfume Afnan 9pm",
    "Perfume Khamrah Qahwa",
    "Al Haramain Amber Oud Gold"
  ],
  "accesorios-tech": [
    "Cargador Inalámbrico M52",
    "Reloj Proyector Digital",
    "Humidificador Efecto Llama 3D"
  ],
  "hogar-cocina": [
    "Termómetro Digital de Cocina",
    "Soporte Magnético para Cuchillos",
    "Cortador de Verduras"
  ],
  "accesorios-mascotas": [
    "Kit Pup Jet Limpiador",
    "Lanzador de Pelotas",
    "Collar con Cámara para Mascotas"
  ]
};

function limpiarResultado() {
  for (const id of ["subtotal", "ajuste", "total"]) {
    document.getElementById(id).textContent = "S/ 0.00";
  }
  mensaje.textContent = "";
  mensaje.classList.remove("text-danger", "text-success");
}

function actualizarCampos() {
  const seleccion = categoria.value;
  const productos = productosPorCategoria[seleccion] ?? [];

  producto.replaceChildren();
  if (!productos.length) {
    producto.disabled = true;
    producto.required = true;
    producto.add(new Option("Primero seleccione una categoría", "", true, true));
  } else {
    producto.disabled = false;
    producto.add(new Option("Seleccione un producto", "", true, true));
    for (const nombreProducto of productos) {
      producto.add(new Option(nombreProducto, nombreProducto));
    }
  }

  for (const panel of paneles) {
    const activo = panel.dataset.categoria === seleccion;
    panel.hidden = !activo;
    panel.disabled = !activo;
  }
  limpiarResultado();
}

function mostrarResultado(venta) {
  document.querySelector("#subtotal").textContent = moneda(venta.calcularSubtotal());
  document.querySelector("#ajuste").textContent = moneda(venta.calcularAjuste());
  document.querySelector("#total").textContent = moneda(venta.calcularTotal().total);
}

categoria.addEventListener("change", actualizarCampos);
formulario.addEventListener("input", limpiarResultado);
formulario.addEventListener("reset", () => setTimeout(actualizarCampos, 0));
actualizarCampos();

const repositorio = new RepositorioVentas();
const cuerpoVentas = document.querySelector("#cuerpoVentas");

function obtenerNombreCategoria(categoriaVenta) {
  const nombres = {
    "perfumeria-arabe": "Perfumería Árabe",
    "accesorios-tech": "Accesorios Tech",
    "hogar-cocina": "Hogar y Cocina",
    "accesorios-mascotas": "Accesorios para Mascotas"
  };
  return nombres[categoriaVenta] ?? categoriaVenta;
}

function obtenerDetalle(venta) {
  if (venta.presentacion !== undefined) {
    return `Presentación: ${venta.presentacion}\n\nDescuento: ${venta.descuento}%`;
  }
  if (venta.modelo !== undefined) {
    return `Modelo: ${venta.modelo}\n\nGarantía: ${venta.mesesGarantia} meses`;
  }
  if (venta.material !== undefined) {
    return `Material: ${venta.material}\n\nDescuento: ${venta.descuento}%`;
  }
  if (venta.talla !== undefined) {
    return `Talla: ${venta.talla}\n\nEmpaque: ${moneda(venta.empaqueEspecial)}`;
  }
  return "—";
}

function obtenerMetodoPago(metodoPago) {
  const metodos = {
    efectivo: "Efectivo",
    "yape-plin": "Yape / Plin",
    tarjeta: "Tarjeta",
    transferencia: "Transferencia"
  };
  return metodos[metodoPago] ?? metodoPago;
}

function dibujarTabla() {
  const registros = repositorio.listar();
  cuerpoVentas.replaceChildren();
  let unidades = 0;
  let importe = 0;

  for (const { id, venta } of registros) {
    unidades += venta.cantidad;
    importe += venta.calcularTotal().total;

    const fila = document.createElement("tr");
    const valores = [
      id,
      venta.cliente,
      venta.dni,
      venta.numeroCelular,
      obtenerMetodoPago(venta.metodoPago),
      obtenerNombreCategoria(venta.categoria),
      venta.producto,
      venta.cantidad,
      moneda(venta.precioUnitario),
      obtenerDetalle(venta),
      moneda(venta.calcularAjuste()),
      moneda(venta.calcularTotal().total)
    ];

    for (const valor of valores) {
      const celda = document.createElement("td");
      celda.textContent = String(valor);
      fila.append(celda);
    }

    const celdaAccion = document.createElement("td");
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "btn btn-eliminar w-100";
    boton.textContent = "Eliminar";
    boton.addEventListener("click", () => {
      repositorio.eliminar(id);
      dibujarTabla();
      mensaje.textContent = `Pedido ${id} eliminado.`;
      mensaje.classList.remove("text-success");
      mensaje.classList.add("text-danger");
    });
    celdaAccion.append(boton);
    fila.append(celdaAccion);
    cuerpoVentas.append(fila);
  }

  if (registros.length === 0) {
    const fila = document.createElement("tr");
    const celda = document.createElement("td");
    celda.colSpan = 13;
    celda.className = "text-center text-secondary py-3";
    celda.textContent = "Todavía no hay pedidos registrados.";
    fila.append(celda);
    cuerpoVentas.append(fila);
  }

  document.querySelector("#resumen").textContent =
    `${registros.length} pedidos | ${unidades} unidades | ${moneda(importe)}`;
}

dibujarTabla();

formulario.addEventListener("submit", evento => {
  evento.preventDefault();

  if (!formulario.reportValidity()) return;

  try {
    const datos = Object.fromEntries(new FormData(formulario));
    const venta = crearVenta(datos);
    mostrarResultado(venta);
    const registro = repositorio.guardar(venta);
    dibujarTabla();
    mensaje.textContent = `Pedido ${registro.id} registrado correctamente.`;
    mensaje.classList.remove("text-danger");
    mensaje.classList.add("text-success");
  } catch (error) {
    limpiarResultado();
    mensaje.textContent = error.message;
    mensaje.classList.add("text-danger");
  }
});