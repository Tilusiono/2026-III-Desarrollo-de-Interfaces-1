function obtenerValores(NombreFormulario) {
    const datosObtenidos = new FormData(NombreFormulario)
    return Object.freeze({
        nombre: String(datosObtenidos.get("nombre").trim().toUpperCase()),
        apellidos: String(datosObtenidos.get("apellidos").trim().toUpperCase()),
        correoElectronico: String(datosObtenidos.get("correo").trim().toUpperCase()),
        nroContacto: String(datosObtenidos.get("telefono").trim().toUpperCase()),
        fechaNacimiento: String(datosObtenidos.get("fechaNacimiento").trim().toUpperCase()),
        genero: String(datosObtenidos.get("genero").trim().toUpperCase()),
        mensaje: String(datosObtenidos.get("mensaje").trim().toUpperCase()),
    })
}