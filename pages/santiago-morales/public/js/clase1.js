function obtenerValores(NombreFormulario) {

    const datosObtenidos = new FormData(NombreFormulario);

    return Object.freeze({
        nombre: String(datosObtenidos.get("nombre").trim().toUpperCase()),
        apellidos: String(datosObtenidos.get("apellido").trim().toUpperCase()),
        correoElectronico: String(datosObtenidos.get("correo").trim().toUpperCase()),
        nroContacto: Number(datosObtenidos.get("telefono").trim()),
        fechaNacimiento: new Date(datosObtenidos.get("fechaNacimiento")),
        genero: String(datosObtenidos.get("genero").trim()),
        mensaje: String(datosObtenidos.get("mensaje").trim()),
    })
}

function procesarFormulario(evento) {
    evento.preventDefault();

    // Mostrar las validaciones HTML.
    if (!formularioRegistro.reportValidity()) { return; }

    // Utilizar nuestra función con FormData.
    const valoresObtenidos = obtenerValores(formularioRegistro);
    imprimirDatosConsola(valoresObtenidos);  
    imprimirDatosHTML(valoresObtenidos);
}


function imprimirDatosConsola(valores) {
    console.log("Datos del Formulario Obtenidos:");

    console.table({
        nombre: typeof valores.nombre,
        apellidos: typeof valores.apellidos,
        correoElectronico:typeof valores.correoElectronico,
        nroContacto: typeof valores.nroContacto,
        fechaNacimiento: typeof valores.fechaNacimiento,
        genero: typeof valores.genero,
        mensaje: typeof valores.mensaje
    });
}


function limpiarFormulario() {
    console.log("El formulario será restablecido.");
}

// Buscar el formulario en el DOM.
const formularioRegistro = document.querySelector("#formularioRegistro");

if (!formularioRegistro) {
    throw new Error("No se encontró el formulario #formularioRegistro");
}

// Escuchar el envío del formulario.
formularioRegistro.addEventListener("submit", procesarFormulario);
// Escuchar la limpieza del formulario.
formularioRegistro.addEventListener("reset", limpiarFormulario);


function imprimirDatosHTML(valores) {
    const seccionResultado = document.querySelector("#resultadoFormulario" );
    const cuerpoResultado = document.querySelector( "#cuerpoResultado");

 

    const datosParaMostrar = [
        {
            campo: "Nombre",
            valor: valores.nombre,
            tipo: typeof valores.nombre
        },
        {
            campo: "Apellidos",
            valor: valores.apellidos,
            tipo: typeof valores.apellidos
        },
        {
            campo: "Correo electrónico",
            valor: valores.correoElectronico,
            tipo: typeof valores.correoElectronico
        },
        {
            campo: "Número de contacto",
            valor: valores.nroContacto,
            tipo: typeof valores.nroContacto
        },
        {
            campo: "Fecha de nacimiento",
            valor: valores.fechaNacimiento.toLocaleDateString( "es-PE"),
            tipo: typeof valores.fechaNacimiento
        },
        {
            campo: "Género",
            valor: valores.genero,
            tipo: typeof valores.genero
        },
        {
            campo: "Mensaje",
            valor: valores.mensaje,
            tipo: typeof valores.mensaje
        }
    ];
    const fragmento = document.createDocumentFragment();

    for (const dato of datosParaMostrar) {
        const fila = document.createElement("tr");

        const celdaCampo = document.createElement("td");
        const celdaValor = document.createElement("td");
        const celdaTipo = document.createElement("td");

        celdaCampo.textContent = dato.campo;
        celdaValor.textContent = String(dato.valor);
        celdaTipo.textContent = dato.tipo;

        fila.append(
            celdaCampo,
            celdaValor,
            celdaTipo
        );

        fragmento.append(fila);
    }

    cuerpoResultado.replaceChildren(fragmento);
    seccionResultado.hidden = false;
}


