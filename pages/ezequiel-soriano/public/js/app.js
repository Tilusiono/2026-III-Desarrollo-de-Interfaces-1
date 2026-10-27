import MatriculaFactory from '../../factory/matriculaFactory.js';
import MatriculaRepo from '../../repository/matriculaRepo.js';

const repo = new MatriculaRepo();

const form = document.getElementById('formMatricula');
const tablaCuerpo = document.getElementById('tablaCuerpo');

function dibujarTabla() {
  tablaCuerpo.innerHTML = '';
  const registros = repo.listar();

  if (registros.length === 0) {
    tablaCuerpo.innerHTML = `
      <tr>
        <td colspan="6" class="text-center text-muted py-3">No hay matrículas registradas aún.</td>
      </tr>
    `;
    return;
  }

  registros.forEach(item => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td><strong>${item.id}</strong></td>
      <td>
        <div>${item.estudiante}</div>
        <small class="text-muted">DNI: ${item.dni}</small>
      </td>
      <td>${item.programa} <br><small class="badge bg-secondary">${item.creditos} crd.</small></td>
      <td><small class="text-dark">${item.detalle}</small></td>
      <td><span class="text-success fw-bold">S/ ${item.total.toFixed(2)}</span></td>
      <td>
        <button class="btn btn-sm btn-outline-danger btn-eliminar" data-id="${item.id}">Eliminar</button>
      </td>
    `;
    tablaCuerpo.appendChild(fila);
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

  const dni = document.getElementById('dni').value;
  const estudiante = document.getElementById('estudiante').value;
  const programa = document.getElementById('programa').value;
  const creditos = document.getElementById('creditos').value;
  const modalidad = document.getElementById('modalidad').value;

  try {
    const nuevaMatricula = MatriculaFactory.crearMatricula(
      modalidad, 
      dni, 
      estudiante, 
      programa, 
      creditos, 
      30
    );

    repo.guardar(nuevaMatricula);
    dibujarTabla();
    form.reset();
  } catch (error) {
    alert("Error: " + error.message);
  }
});

dibujarTabla();