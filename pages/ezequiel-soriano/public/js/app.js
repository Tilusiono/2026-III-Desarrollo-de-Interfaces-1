import MatriculaTechFactory from '/factory/matriculaTechFactory.js';
import MatriculaTechRepo from '/repository/matriculaTechRepo.js';

const repo = new MatriculaTechRepo();

const form = document.getElementById('formularioRegistro');
const cuerpoResultado = document.getElementById('cuerpoResultado');
const totalUsuarios = document.getElementById('totalUsuarios');

function dibujarTabla() {
  cuerpoResultado.innerHTML = '';
  const registros = repo.listar();
  if (totalUsuarios) totalUsuarios.textContent = registros.length;

  if (registros.length === 0) {
    cuerpoResultado.innerHTML = `
      <tr>
        <td colspan="8" class="text-center text-muted py-3">No hay matrículas tecnológicas registradas aún.</td>
      </tr>
    `;
    return;
  }

  registros.forEach(item => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td><strong class="text-primary">${item.id}</strong></td>
      <td>
        <div class="fw-bold">${item.estudiante}</div>
        <small class="text-muted">${item.correo}</small>
      </td>
      <td>${item.telefono}</td>
      <td>${item.fechaNacimiento}</td>
      <td><span class="badge bg-dark">${item.especialidad}</span></td>
      <td><small class="text-secondary">${item.duracion}</small></td>
      <td class="fw-bold text-success">S/ ${item.costo.toFixed(2)}</td>
      <td>
        <small class="d-block mb-1">${item.observaciones}</small>
        <button class="btn btn-sm btn-outline-danger btn-eliminar" data-id="${item.id}">
          <i class="bi bi-trash-fill"></i> Anular
        </button>
      </td>
    `;
    cuerpoResultado.appendChild(fila);
  });

  document.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id') || e.target.parentElement.getAttribute('data-id');
      repo.eliminar(id);
      dibujarTabla();
    });
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const estudianteCompleto = `${nombre} ${apellido}`;
  const correo = document.getElementById('correo').value;
  const telefono = document.getElementById('telefono').value;
  const fechaNacimiento = document.getElementById('fechaNacimiento').value;
  const genero = document.getElementById('genero').value;
  const tipoEspecialidad = document.getElementById('tipoUsuario').value;
  const observaciones = document.getElementById('mensaje').value;

  try {
    const nuevaMatricula = MatriculaTechFactory.crearMatricula(
      tipoEspecialidad, 
      estudianteCompleto, 
      correo, 
      telefono, 
      fechaNacimiento, 
      genero, 
      observaciones
    );

    repo.guardar(nuevaMatricula);
    dibujarTabla();
    form.reset();
  } catch (error) {
    alert("Error al procesar la matrícula tecnológica: " + error.message);
  }
});

dibujarTabla();
