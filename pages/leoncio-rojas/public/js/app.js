import { moneda } from "./utilidades.js";
import { crearVenta } from "./fabrica/fabrica.js";
import { RepositorioVentas } from "./repositorio/RepositorioVentas.js";

// Elementos del DOM
const formulario = document.querySelector("#formularioVenta");
const marca = document.querySelector("#marca");
const paneles = document.querySelectorAll("[data-marca]");
const mensaje = document.querySelector("#mensaje");
const cuerpoVentas = document.querySelector("#cuerpoVentas");
const resumen = document.querySelector("#resumen");

// Repositorio en memoria
const repositorio = new RepositorioVentas();

function limpiarResultado() {
  for (const id of ["subtotal", "ajuste", "total"]) {
    document.getElementById(id).textContent = "—";
  }
  mensaje.textContent = "";
}

function actualizarCampos() {
  for (const panel of paneles) {
    const activo = panel.dataset.marca === marca.value;
    panel.hidden = !activo;
    panel.disabled = !activo;
  }
  limpiarResultado();
}

function mostrarResultado(subtotal, ajuste, total) {
  document.querySelector("#subtotal").textContent = moneda(subtotal);
  document.querySelector("#ajuste").textContent = moneda(ajuste);
  document.querySelector("#total").textContent = moneda(total);
}

function dibujarTabla() {
  const registros = repositorio.listar();
  cuerpoVentas.replaceChildren();

  let totalEquipos = 0;
  let totalImporte = 0;

  if (registros.length === 0) {
    const filaVacia = document.createElement("tr");
    const celda = document.createElement("td");
    celda.colSpan = 9;
    celda.className = "text-center text-secondary py-3";
    celda.textContent = "Todavía no hay ventas.";
    filaVacia.appendChild(celda);
    cuerpoVentas.appendChild(filaVacia);
  } else {
    registros.forEach((reg) => {
      const v = reg.venta;
      totalEquipos += v.cantidad;
      totalImporte += v.calcularTotal();

      const fila = document.createElement("tr");

      const valores = [
        reg.id,
        v.cliente,
        v.dni,
        v.modelo,
        v.cantidad,
        v.obtenerMarca(),
        v.obtenerDetalle(),
        moneda(v.calcularTotal())
      ];

      valores.forEach((val) => {
        const celda = document.createElement("td");
        celda.textContent = String(val);
        fila.appendChild(celda);
      });

      // Celda con botón eliminar
      const celdaAccion = document.createElement("td");
      const botonEliminar = document.createElement("button");
      botonEliminar.type = "button";
      botonEliminar.className = "btn btn-sm btn-outline-danger";
      botonEliminar.textContent = "Eliminar";

      botonEliminar.addEventListener("click", () => {
        repositorio.eliminar(reg.id);
        mensaje.textContent = `Venta ${reg.id} eliminada.`;
        dibujarTabla();
      });

      celdaAccion.appendChild(botonEliminar);
      fila.appendChild(celdaAccion);

      cuerpoVentas.appendChild(fila);
    });
  }

  // Actualizar resumen consolidado
  resumen.textContent = `${registros.length} ventas | ${totalEquipos} equipos | ${moneda(totalImporte)}`;
}

// Eventos
marca.addEventListener("change", actualizarCampos);
formulario.addEventListener("reset", () => {
  setTimeout(actualizarCampos, 0);
});

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  if (!formulario.reportValidity()) return;

  try {
    const datos = Object.fromEntries(new FormData(formulario));
    const venta = crearVenta(datos);

    mostrarResultado(
      venta.calcularSubtotal(),
      venta.calcularAjuste(),
      venta.calcularTotal()
    );

    const registro = repositorio.guardar(venta);
    mensaje.textContent = `Venta ${registro.id} registrada: ${venta.obtenerMarca()}.`;

    dibujarTabla();
  } catch (error) {
    limpiarResultado();
    mensaje.textContent = error.message;
  }
});

// Inicialización al cargar la página
actualizarCampos();
dibujarTabla();