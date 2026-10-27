import UsuarioFactory from '../factory/usuarioFactory.js';
import UsuarioRepo from '../repository/usuarioRepo.js';

const repo = new UsuarioRepo();

const form = document.getElementById('formularioRegistro');
const cuerpoResultado = document.getElementById('cuerpoResultado');
const totalUsuarios = document.getElementById('totalUsuarios');

function dibujarTabla() {
  cuerpoResultado.innerHTML = '';
  const registros = repo.listar();
  totalUsuarios.textContent = registros.length;

  if (registros.length === 0) {
    cuerpoResultado.innerHTML = `
      <tr>
        <td colspan="9" class="text-center text-muted py-3">No hay usuarios registrados aún.</td>
      </tr>
    `;
    return;
  }

  registros.forEach(item => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td><strong>${item.id}</strong></td>
      <td>${item.nombreCompleto}</td>
      <td>${item.correo}</td>
      <td>${item.telefono}</td>
      <td>${item.fechaNacimiento}</td>
      <td class="text-capitalize">${item.genero}</td>
      <td><span class="badge bg-secondary">${item.rol}</span></td>
      <td><small>${item.descripcionRol}</small></td>
      <td>
        ${item.mensaje} <br>
        <button class="btn btn-sm btn-outline-danger mt-1 btn-eliminar" data-id="${item.id}">Eliminar</button>
      </td>
    `;
    cuerpoResultado.appendChild(fila);
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

  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const correo = document.getElementById('correo').value;
  const telefono = document.getElementById('telefono').value;
  const fechaNacimiento = document.getElementById('fechaNacimiento').value;
  const genero = document.getElementById('genero').value;
  const tipoUsuario = document.getElementById('tipoUsuario').value;
  const mensaje = document.getElementById('mensaje').value;

  try {
    const nuevoUsuario = UsuarioFactory.crearUsuario(
      tipoUsuario, 
      nombre, 
      apellido, 
      correo, 
      telefono, 
      fechaNacimiento, 
      genero, 
      mensaje
    );

    repo.guardar(nuevoUsuario);
    dibujarTabla();
    form.reset();
  } catch (error) {
    alert("Error al registrar: " + error.message);
  }
});

dibujarTabla();
