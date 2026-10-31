import GimnasioRepo from './repository/gimnasioRepo.js';
import GimnasioFactory from './factory/gimnasioFactory.js';

const repo = new GimnasioRepo();

const form = document.getElementById('formReserva');
const cuerpoResultado = document.getElementById('tablaReservas');
const inputEditandoId = document.getElementById('editandoId');

function dibujarTabla() {
  cuerpoResultado.innerHTML = '';
  const registros = repo.listar();

  if (registros.length === 0) {
    cuerpoResultado.innerHTML = `
      <tr>
        <td colspan="6" class="text-center text-muted py-3">Aún no tienes reservas registradas.</td>
      </tr>
    `;
    return;
  }

  registros.forEach(item => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td><strong class="text-primary">${item.id}</strong></td>
      <td>${item.nombre} ${item.apellido}</td>
      <td>${item.correo}</td>
      <td>${item.telefono}</td>
      <td><span class="badge bg-dark">${item.clase}</span></td>
      <td>
        <button class="btn btn-sm btn-outline-warning me-1 btn-editar" data-id="${item.id}">
          Editar
        </button>
        <button class="btn btn-sm btn-outline-danger btn-eliminar" data-id="${item.id}">
          Eliminar
        </button>
      </td>
    `;
    cuerpoResultado.appendChild(fila);
  });

  document.querySelectorAll('.btn-editar').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      const registros = repo.listar();
      const reservaAEditar = registros.find(r => r.id === id);

      if (reservaAEditar) {
        document.getElementById('nombre').value = reservaAEditar.nombre;
        document.getElementById('apellido').value = reservaAEditar.apellido;
        document.getElementById('correo').value = reservaAEditar.correo;
        document.getElementById('telefono').value = reservaAEditar.telefono;
        document.getElementById('claseSelect').value = reservaAEditar.clase;
        
        inputEditandoId.value = reservaAEditar.id;

        document.getElementById('seccionFormulario').scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  document.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      repo.eliminar(id);
      dibujarTabla();
    });
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const idExistente = inputEditandoId.value;
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const correo = document.getElementById('correo').value;
  const telefono = document.getElementById('telefono').value;
  const clase = document.getElementById('claseSelect').value;

  try {
    let registros = repo.listar();

    if (idExistente) {
      registros = registros.map(r => {
        if (r.id === idExistente) {
          return { id: r.id, nombre, apellido, correo, telefono, clase };
        }
        return r;
      });
      localStorage.setItem(repo.storageKey, JSON.stringify(registros));
      inputEditandoId.value = '';
    } else {
      const nuevaReserva = GimnasioFactory.crearReserva(nombre, apellido, correo, telefono, clase);
      repo.guardar(nuevaReserva);
    }

    dibujarTabla();
    form.reset();
  } catch (error) {
    alert("Error al procesar la reserva: " + error.message);
  }
});

dibujarTabla();