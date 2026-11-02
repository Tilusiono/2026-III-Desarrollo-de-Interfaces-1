// public/js/CLASE_01.js

// 1. Datos iniciales del Staff de la Clínica Odontológica (Arreglo directo para evitar errores de rutas)
const staffMedico = [
    { id: 101, nombre: "Dr. Jhan Castillo", correo: "jhan.castillo@dentalsalud.com", especialidad: "Ortodoncia", horario: "Mañana (08:00 - 13:00)" },
    { id: 102, nombre: "Dra. Ana Martínez", correo: "ana.martinez@dentalsalud.com", especialidad: "General", horario: "Tarde (14:00 - 19:00)" },
    { id: 103, nombre: "Dr. Carlos Vega", correo: "carlos.vega@dentalsalud.com", especialidad: "Pediatría", horario: "Mañana (08:00 - 13:00)" },
    { id: 104, nombre: "Dra. Elena Ríos", correo: "elena.rios@dentalsalud.com", especialidad: "Ortodoncia", horario: "Tarde (14:00 - 19:00)" }
];

// Arreglo en memoria para los pacientes registrados en el sistema
const listaPacientes = [];

// 2. Captura de Elementos de la Interfaz (DOM)
const formRegistro = document.getElementById('form-registro');
const contenedorAtenciones = document.getElementById('contenedor-atenciones');
const botonesFiltro = document.querySelectorAll('.btn-filtro');
const mensajeError = document.getElementById('mensaje-error');
const mensajeExito = document.getElementById('mensaje-exito');
const listaCitasDOM = document.getElementById('lista-citas');
const contadorCitasDOM = document.getElementById('contador-citas');

// 3. Función encargada de dibujar las tarjetas de los médicos a la derecha
function renderizarCatalogo(medicosFiltrados) {
    if (!contenedorAtenciones) return;
    contenedorAtenciones.innerHTML = ''; 

    if (medicosFiltrados.length === 0) {
        contenedorAtenciones.innerHTML = `<p style="color: #7f8c8d; text-align: center;">No hay especialistas disponibles.</p>`;
        return;
    }

    medicosFiltrados.forEach(medico => {
        const tarjeta = document.createElement('article');
        tarjeta.className = 'tarjeta-medica';
        tarjeta.style.border = "1px solid #e0e0e0";
        tarjeta.style.padding = "15px";
        tarjeta.style.borderRadius = "6px";
        tarjeta.style.backgroundColor = "#fff";
        tarjeta.style.marginBottom = "10px";
        
        tarjeta.innerHTML = `
            <h3 style="margin: 0 0 5px 0; color: #2c3e50;">${medico.nombre}</h3>
            <p style="margin: 5px 0; font-size: 0.95rem; color: #555;"><strong>Especialidad:</strong> ${medico.especialidad}</p>
            <p style="margin: 5px 0; font-size: 0.95rem; color: #555;"><strong>Turno:</strong> ${medico.horario}</p>
            <p style="margin: 5px 0; font-size: 0.85rem; color: #7f8c8d;">Contacto: ${medico.correo}</p>
        `;
        contenedorAtenciones.appendChild(tarjeta);
    });
}

// 4. Función para actualizar la lista de Pacientes Registrados e Inscritos
function actualizarHistorialCitas() {
    if (!listaCitasDOM) return;
    listaCitasDOM.innerHTML = '';
    let contadorCitas = 0;

    listaPacientes.forEach(paciente => {
        if (paciente.tieneCita) {
            contadorCitas++;
            const item = document.createElement('li');
            item.style.marginBottom = "10px";
            item.style.padding = "10px";
            item.style.backgroundColor = "#e8f4f8";
            item.style.borderLeft = "4px solid #3498db";
            item.style.borderRadius = "0 4px 4px 0";
            item.style.listStyle = "none";
            item.style.marginLeft = "-20px";
            
            item.innerHTML = `
                <strong style="color: #2c3e50;">${paciente.nombre}</strong><br>
                <span style="font-size: 0.85rem; color: #555;">Especialidad: ${paciente.especialidadRequerida}</span>
                <button class="btn-cancelar-cita" data-id="${paciente.id}" style="float: right; background: #e74c3c; color: white; border: none; padding: 4px 8px; border-radius: 3px; cursor: pointer; font-size: 0.75rem; font-weight: bold;">
                    Dar de Alta
                </button>
                <div style="clear: both;"></div>
            `;
            listaCitasDOM.appendChild(item);
        }
    });

    if (contadorCitas === 0) {
        listaCitasDOM.innerHTML = `<li id="ticket-vacio" class="vacio-texto">No hay pacientes citados en el sistema actualmente.</li>`;
    }

    if (contadorCitasDOM) contadorCitasDOM.textContent = contadorCitas;
}

// 5. Estructura de Control: Envío y Validación del Formulario de Admisión
if (formRegistro) {
    formRegistro.addEventListener('submit', (e) => {
        e.preventDefault(); 

        const nombre = document.getElementById('input-nombre').value.trim();
        const correo = document.getElementById('input-correo').value.trim();
        const especialidad = document.getElementById('select-servicio').value;
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (mensajeError) mensajeError.style.display = "none";
        if (mensajeExito) mensajeExito.style.display = "none";

        // Validaciones condicionales lógicas
        if (nombre === "" || correo === "") {
            mensajeError.textContent = "⚠️ Error: Todos los campos personales son obligatorios.";
            mensajeError.style.display = "block";
            return;
        }

        if (!regexCorreo.test(correo)) {
            mensajeError.textContent = "⚠️ Error: Ingrese un correo electrónico válido (ejemplo@dominio.com).";
            mensajeError.style.display = "block";
            return;
        }

        if (especialidad === "Todos") {
            mensajeError.textContent = "⚠️ Error: Debe seleccionar una especialidad específica para la cita médica.";
            mensajeError.style.display = "block";
            return;
        }

        // Si los datos son correctos, agregamos el paciente al listado dinámico
        const nuevoPaciente = {
            id: Date.now(),
            nombre: nombre,
            correo: correo,
            especialidadRequerida: especialidad,
            tieneCita: true
        };

        listaPacientes.push(nuevoPaciente);

        mensajeExito.textContent = `¡Éxito! El paciente ${nombre} ha sido asignado a la lista de espera de ${especialidad}.`;
        mensajeExito.style.display = "block";

        formRegistro.reset();
        actualizarHistorialCitas();
    });
}

// 6. Manejo del evento para dar de alta o retirar pacientes de la lista
if (listaCitasDOM) {
    listaCitasDOM.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-cancelar-cita')) {
            const idPaciente = parseInt(e.target.getAttribute('data-id'), 10);
            const pacienteEncontrado = listaPacientes.find(p => p.id === idPaciente);
            if (pacienteEncontrado) {
                pacienteEncontrado.tieneCita = false;
                actualizarHistorialCitas();
            }
        }
    });
}

// 7. Filtros superiores del Catálogo de Especialidades
botonesFiltro.forEach(boton => {
    boton.addEventListener('click', (e) => {
        botonesFiltro.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        const especialidadSeleccionada = e.target.getAttribute('data-categoria');

        if (especialidadSeleccionada === "Todos") {
            renderizarCatalogo(staffMedico);
        } else {
            const medicosFiltrados = staffMedico.filter(medico => medico.especialidad === especialidadSeleccionada);
            renderizarCatalogo(medicosFiltrados);
        }
    });
});

// 8. Carga inicial síncrona
document.addEventListener('DOMContentLoaded', () => {
    renderizarCatalogo(staffMedico);
    actualizarHistorialCitas();
});
