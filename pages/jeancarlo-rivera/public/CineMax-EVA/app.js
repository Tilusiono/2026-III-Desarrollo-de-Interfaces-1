
 // CineMax: gestión de eventos
class Evento {
  constructor(id, nombre, fecha, lugar, categoria, modalidad, descripcion) {
    Object.assign(this, { id, nombre, fecha, lugar, categoria, modalidad, descripcion });
    this.inscritos = [];
  }

  inscribir(correo) {
    if (this.inscritos.includes(correo)) return false;
    this.inscritos.push(correo);
    return true;
  }

  cancelar(correo) {
    this.inscritos = this.inscritos.filter(c => c !== correo);
  }
}

class EventoPresencial extends Evento {}
class EventoVirtual extends Evento {}

const eventos = [
  new EventoPresencial(1, "Festival de Cine", "15/11/2026", "Auditorio Central", "cine", "Presencial", "Proyección y conversación sobre cine."),
  new EventoVirtual(2, "Taller de Guion", "18/11/2026", "En línea", "taller", "Virtual", "Aprende las bases para escribir historias."),
  new EventoPresencial(3, "Charla de Animación", "22/11/2026", "Sala 2", "charla", "Presencial", "Conoce cómo se crean mundos animados.")
];

const $ = id => document.getElementById(id);
const lista = $("listaEventos");
const selector = $("evento");
const formulario = $("formInscripcion");
const misInscripciones = $("misInscripciones");
const mensaje = $("mensaje");

let inscripciones = JSON.parse(localStorage.getItem("cinemaxInscripciones") || "[]");

inscripciones.forEach(i => {
  const evento = eventos.find(e => e.id === i.eventoId);
  if (evento) evento.inscribir(i.correo);
});

function guardar() {
  localStorage.setItem("cinemaxInscripciones", JSON.stringify(inscripciones));
}

function mostrarEventos() {
  const texto = $("buscar").value.toLowerCase();
  const categoria = $("categoria").value;

  lista.innerHTML = eventos
    .filter(e => e.nombre.toLowerCase().includes(texto) &&
      (categoria === "todos" || e.categoria === categoria))
    .map(e => `
      <div class="col-md-6 col-lg-4">
        <article class="event-card h-100">
          <div class="event-top">${e.categoria.toUpperCase()} · ${e.modalidad.toUpperCase()}</div>
          <div class="p-3">
            <h3>${e.nombre}</h3>
            <p>${e.descripcion}</p>
            <p class="details"><strong>Fecha:</strong> ${e.fecha}<br>
            <strong>Lugar:</strong> ${e.lugar}</p>
            <button class="btn btn-outline-light btn-sm" data-detalle="${e.id}">Ver detalles</button>
            <button class="btn btn-cine btn-sm" data-elegir="${e.id}">Inscribirme</button>
          </div>
        </article>
      </div>`).join("");

  selector.innerHTML = '<option value="">Selecciona un evento</option>' +
    eventos.map(e => `<option value="${e.id}">${e.nombre}</option>`).join("");
}

function verDetalle(id) {
  const e = eventos.find(e => e.id === id);
  if (e) alert(`${e.nombre}\nFecha: ${e.fecha}\nLugar: ${e.lugar}\nModalidad: ${e.modalidad}\n\n${e.descripcion}`);
}

function elegirEvento(id) {
  selector.value = id;
  $("formulario").scrollIntoView({ behavior: "smooth" });
  $("nombre").focus();
}

function mostrarInscripciones() {
  misInscripciones.innerHTML = inscripciones.length
    ? inscripciones.map((i, n) => `
      <div class="registration">
        <div><strong>${i.nombre} ${i.apellido}</strong><br>
        <span>${i.eventoNombre} · ${i.correo}</span></div>
        <button class="btn btn-sm btn-outline-danger" data-cancelar="${n}">Cancelar</button>
      </div>`).join("")
    : '<p class="muted">Aún no tienes inscripciones.</p>';
}

lista.addEventListener("click", e => {
  const detalle = e.target.closest("[data-detalle]");
  const elegir = e.target.closest("[data-elegir]");
  if (detalle) verDetalle(Number(detalle.dataset.detalle));
  if (elegir) elegirEvento(Number(elegir.dataset.elegir));
});

misInscripciones.addEventListener("click", e => {
  const boton = e.target.closest("[data-cancelar]");
  if (!boton) return;

  const i = inscripciones[Number(boton.dataset.cancelar)];
  if (!i || !confirm(`¿Cancelar tu inscripción a ${i.eventoNombre}?`)) return;

  eventos.find(e => e.id === i.eventoId)?.cancelar(i.correo);
  inscripciones.splice(Number(boton.dataset.cancelar), 1);
  guardar();
  mostrarInscripciones();
  mostrarEventos();
  mensaje.textContent = "Inscripción cancelada correctamente.";
});

formulario.addEventListener("submit", e => {
  e.preventDefault();

  const datos = {
    nombre: $("nombre").value.trim(),
    apellido: $("apellido").value.trim(),
    correo: $("correo").value.trim().toLowerCase(),
    telefono: $("telefono").value.trim(),
    eventoId: Number(selector.value)
  };

  const evento = eventos.find(e => e.id === datos.eventoId);

  if (!datos.nombre || !datos.apellido || !datos.correo || !datos.telefono) {
    mensaje.textContent = "Completa todos los campos.";
    return;
  }
  if (!evento) {
    mensaje.textContent = "Selecciona un evento válido.";
    return;
  }
  if (!evento.inscribir(datos.correo)) {
    mensaje.textContent = "Este correo ya está inscrito en ese evento.";
    return;
  }

  inscripciones.push({ ...datos, eventoNombre: evento.nombre });
  guardar();
  formulario.reset();
  mensaje.textContent = "¡Inscripción registrada correctamente!";
  mostrarInscripciones();
});

$("buscar").addEventListener("input", mostrarEventos);
$("categoria").addEventListener("change", mostrarEventos);

mostrarEventos();
mostrarInscripciones();
