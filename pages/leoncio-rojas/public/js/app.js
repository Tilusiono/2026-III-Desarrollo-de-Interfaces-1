import { crearVenta } from './fabrica/fabrica.js';
import RepositorioVentas from './repositorio/RepositorioVentas.js';
import { moneda } from './utilidades.js';

// Instancia única del repositorio en memoria (Hito 5)
const repositorio = new RepositorioVentas();

// Elementos del DOM
const formulario = document.getElementById('formularioVenta');
const selectCategoria = document.getElementById('categoria');
const fieldsets = document.querySelectorAll('fieldset[data-categoria]');

const elemSubtotal = document.getElementById('subtotal');
const elemAjuste = document.getElementById('ajuste');
const elemTotal = document.getElementById('total');
const elemMensaje = document.getElementById('mensaje');

const cuerpoVentas = document.getElementById('cuerpoVentas');
const elemResumen = document.getElementById('resumen');

/**
 * Escucha cambios en el selector de categoría (Hito 2 y 3)
 * Muestra y habilita únicamente el fieldset de la opción seleccionada; oculta y deshabilita los otros tres.
 */
selectCategoria.addEventListener('change', () => {
  const categoriaSeleccionada = selectCategoria.value;

  fieldsets.forEach((fieldset) => {
    const corresponde = fieldset.dataset.categoria === categoriaSeleccionada;
    fieldset.hidden = !corresponde;
    fieldset.disabled = !corresponde;
  });
});

/**
 * Escucha el evento reset del formulario para restablecer fieldsets y totales (Hito 2 y 3)
 */
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

/**
 * Renderiza dinámicamente la tabla de historial de ventas y actualiza el resumen (Hito 5)
 */
function dibujarTabla() {
  const lista = repositorio.listar();
  cuerpoVentas.innerHTML = '';

  // Si no hay ventas, muestra fila con colSpan="9" y texto "Todavía no hay ventas."
  if (lista.length === 0) {
    const trVacio = document.createElement('tr');
    const tdVacio = document.createElement('td');
    tdVacio.colSpan = 9;
    tdVacio.className = 'text-center text-muted py-4';
    tdVacio.textContent = 'Todavía no hay ventas.';
    trVacio.appendChild(tdVacio);
    cuerpoVentas.appendChild(trVacio);

    elemResumen.textContent = '0 ventas | 0 equipos | S/ 0.00';
    return;
  }

  let totalEquipos = 0;
  let totalCentavosAcumulado = 0;

  lista.forEach((reg) => {
    const { id, venta } = reg;
    const totalVenta = venta.calcularTotal();

    totalEquipos += venta.cantidad;
    totalCentavosAcumulado += totalVenta;

    const fila = document.createElement('tr');

    // 1. N.°
    const tdId = document.createElement('td');
    tdId.className = 'fw-bold text-secondary';
    tdId.textContent = id;
    fila.appendChild(tdId);

    // 2. Cliente
    const tdCliente = document.createElement('td');
    tdCliente.className = 'fw-semibold';
    tdCliente.textContent = venta.cliente;
    fila.appendChild(tdCliente);

    // 3. DNI
    const tdDni = document.createElement('td');
    tdDni.textContent = venta.dni;
    fila.appendChild(tdDni);

    // 4. Modelo
    const tdModelo = document.createElement('td');
    tdModelo.textContent = venta.modelo;
    fila.appendChild(tdModelo);

    // 5. Cantidad
    const tdCantidad = document.createElement('td');
    tdCantidad.className = 'text-center';
    tdCantidad.textContent = venta.cantidad;
    fila.appendChild(tdCantidad);

    // 6. Tipo/Marca
    const tdTipo = document.createElement('td');
    tdTipo.innerHTML = `<span class="badge bg-primary-subtle text-primary border border-primary-subtle badge-tipo">${venta.obtenerTipo()}</span>`;
    fila.appendChild(tdTipo);

    // 7. Detalle
    const tdDetalle = document.createElement('td');
    tdDetalle.className = 'small text-muted';
    tdDetalle.textContent = venta.obtenerDetalle();
    fila.appendChild(tdDetalle);

    // 8. Total
    const tdTotal = document.createElement('td');
    tdTotal.className = 'fw-bold text-success';
    tdTotal.textContent = moneda(totalVenta);
    fila.appendChild(tdTotal);

    // 9. Acción con botón Eliminar
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
    fila.appendChild(tdAccion);

    cuerpoVentas.appendChild(fila);
  });

  // Actualiza el párrafo de resumen reactivo al final
  elemResumen.textContent = `${lista.length} ventas | ${totalEquipos} equipos | ${moneda(totalCentavosAcumulado)}`;
}

/**
 * Escucha el submit del formulario (Hito 5)
 */
formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  // Validación de formulario nativo HTML5
  if (!formulario.reportValidity()) {
    return;
  }

  // Extraer datos con FormData
  const formData = new FormData(formulario);
  const datos = Object.fromEntries(formData.entries());

  try {
    // Instanciar con la fábrica polimórfica (Hito 4)
    const venta = crearVenta(datos);

    // Calcular y mostrar totales en el panel superior
    const subtotal = venta.calcularSubtotal();
    const ajuste = venta.calcularAjuste();
    const total = venta.calcularTotal();

    elemSubtotal.textContent = moneda(subtotal);
    elemAjuste.textContent = (ajuste > 0 ? '+' : '') + moneda(ajuste);
    elemTotal.textContent = moneda(total);

    // Guardar en el repositorio (Hito 5)
    const registro = repositorio.guardar(venta);

    // Mostrar mensaje de confirmación
    elemMensaje.textContent = `¡Venta N.° ${registro.id} registrada con éxito para ${venta.cliente}! (${venta.obtenerTipo()})`;
    elemMensaje.className = 'small text-success fw-bold mb-0';

    // Redibujar la tabla de historial
    dibujarTabla();
  } catch (error) {
    console.error(error);
    elemMensaje.textContent = `Error al procesar la venta: ${error.message}`;
    elemMensaje.className = 'small text-danger fw-bold mb-0';
  }
});

// Renderizado inicial al cargar la página
dibujarTabla();
