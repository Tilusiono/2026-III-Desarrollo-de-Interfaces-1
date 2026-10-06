function obtenerValores(Nombreformulario) {

    const datosObtenidos = new FormData(Nombreformulario)

    return Object.freeze({
        nombre: string(datosObtenidos.get("nombre").trim().toUpperCase()),
        apellidos: string(datosObtenidos.get("apellido").trim().toUpperCase()),
        correoElectronico: string(datosObtenidos.get("correo").trim().toUpperCase()),
        telefono: string(datosObtenidos.get("telefono").trim().toUpperCase()),
        fechaNacimiento: string(datosObtenidos.get("fechaNacimiento").trim().toUpperCase()),
        genero: string(datosObtenidos.get("genero").trim().toUpperCase()),
        mensaje: string(datosObtenidos.get("mensaje").trim().toUpperCase())
    })
}