import { crearVenta } from './fabrica/fabrica.js';
import RepositorioVentas from './repositorio/RepositorioVentas.js';
import { moneda } from './utilidades.js';

const repositorio = new RepositorioVentas();

const formulario = document.getElementById('formularioVenta');
const selectCategoria = document.getElementById('categoria');
const fieldsets = document.querySelectorAll('fieldset[data-categoria]');

const elemSubtotal = document.getElementById('subtotal');
const elemAjuste = document.getElementById('ajuste');
const elemTotal = document.getElementById('total');
const elemMensaje = document.getElementById('mensaje');

const cuerpoVentas = document.getElementById('cuerpoVentas');
const elemResumen = document.getElementById('resumen');

selectCategoria.addEventListener('change', () => {
  const categoriaSeleccionada = selectCategoria.value;

  fieldsets.forEach((fieldset) => {
    const corresponde = fieldset.dataset.categoria === categoriaSeleccionada;
    fieldset.hidden = !corresponde;
    fieldset.disabled = !corresponde;
  });
});

formulario.addEventListener('reset', () => {
  setTimeout(() => {
    fieldsets.forEach((fieldset) => {
      fieldset.hidden = true;
      fieldset.disabled = true;
    });

    elemSubtotal.textContent = 'S/ 0.00';
    elemAjuste.textContent = 'S/ 0.00';
    elemTotal.textContent = 'S/ 0.00';
    elemMensaje.textContent = 'Complete el formulario y seleccione una categoría para cotizar.';
    elemMensaje.className = 'small text-info mb-0';
  }, 0);
});

function dibujarTabla() {
  const lista = repositorio.listar();
  cuerpoVentas.innerHTML = '';

  if (lista.length === 0) {
    const trVacio = document.createElement('tr');
    const tdVacio = document.createElement('td');
    tdVacio.colSpan = 9;
    tdVacio.className = 'text-center text-muted py-4';
    tdVacio.textContent = 'Todavía no hay ventas.';
    trVacio.appendChild(tdVacio);
    cuerpoVentas.appendChild(trVacio);

    elemResumen.textContent = '0 ventas | 0 componentes | S/ 0.00';
    return;
  }

  let totalComponentes = 0;
  let totalCentavosAcumulado = 0;

  lista.forEach((reg) => {
    const { id, venta } = reg;
    const totalVenta = venta.calcularTotal();

    totalComponentes += venta.cantidad;
    totalCentavosAcumulado += totalVenta;

    const fila = document.createElement('tr');

    const tdId = document.createElement('td');
    tdId.className = 'fw-bold text-secondary';
    tdId.textContent = id;
    fila.appendChild(tdId);

    const tdCliente = document.createElement('td');
    tdCliente.className = 'fw-semibold';
    tdCliente.textContent = venta.cliente;
    fila.appendChild(tdCliente);

    const tdDni = document.createElement('td');
    tdDni.textContent = venta.dni;
    fila.appendChild(tdDni);

    const tdModelo = document.createElement('td');
    tdModelo.textContent = venta.modelo;
    fila.appendChild(tdModelo);

    const tdCantidad = document.createElement('td');
    tdCantidad.className = 'text-center';
    tdCantidad.textContent = venta.cantidad;
    fila.appendChild(tdCantidad);

    const tdTipo = document.createElement('td');
    tdTipo.innerHTML = `<span class="badge bg-primary-subtle text-primary border border-primary-subtle badge-tipo">${venta.obtenerTipo()}</span>`;
    fila.appendChild(tdTipo);

    const tdDetalle = document.createElement('td');
    tdDetalle.className = 'small text-muted';
    tdDetalle.textContent = venta.obtenerDetalle();
    fila.appendChild(tdDetalle);

    const tdTotal = document.createElement('td');
    tdTotal.className = 'fw-bold text-success';
    tdTotal.textContent = moneda(totalVenta);
    fila.appendChild(tdTotal);

    const tdAccion = document.createElement('td');
    tdAccion.className = 'text-center';
    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn btn-sm btn-outline-danger';
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.addEventListener('click', () => {
      repositorio.eliminar(id);
      dibujarTabla();
    });
    tdAccion.appendChild(btnEliminar);
    fila.append(tdAccion);

    cuerpoVentas.appendChild(fila);
  });

  elemResumen.textContent = `${lista.length} ventas | ${totalComponentes} componentes | ${moneda(totalCentavosAcumulado)}`;
}

formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!formulario.reportValidity()) {
    return;
  }

  const formData = new FormData(formulario);
  const datos = Object.fromEntries(formData.entries());

  try {
    const venta = crearVenta(datos);

    const subtotal = venta.calcularSubtotal();
    const ajuste = venta.calcularAjuste();
    const total = venta.calcularTotal();

    elemSubtotal.textContent = moneda(subtotal);
    elemAjuste.textContent = (ajuste > 0 ? '+' : '') + moneda(ajuste);
    elemTotal.textContent = moneda(total);

    const registro = repositorio.guardar(venta);

    elemMensaje.textContent = `¡Venta N.° ${registro.id} registrada con éxito para ${venta.cliente}! (${venta.obtenerTipo()})`;
    elemMensaje.className = 'small text-success fw-bold mb-0';

    dibujarTabla();
  } catch (error) {
    console.error(error);
    elemMensaje.textContent = `Error al procesar la venta: ${error.message}`;
    elemMensaje.className = 'small text-danger fw-bold mb-0';
  }
});

dibujarTabla();
