function obtenerValores(NombreFormulario) {
    const datosObtenidos = new FormData(NombreFormulario);

    return Object.freeze({
        
        nombre: String(datosObtenidos.get("nombre").trim().toUpperCase()),
        apellido: String(datosObtenidos.get("apellido").trim().toUpperCase()),
        correoElectronico: String(datosObtenidos.get("correoElectronico").trim().toUpperCase()),
        nroContacto: Number(datosObtenidos.get("telefono").trim()),
        fechaNacimiento: Date(datosObtenidos.get("fechaNacimiento").trim()),
        genero: String(datosObtenidos.get("genero").trim()),
        mensaje: String(datosObtenidos.get("mensaje").trim()),
    });
}

    
