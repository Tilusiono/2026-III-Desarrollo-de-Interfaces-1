function obtenerValores(Formulario) {

    const datos = new FormData(Formulario);

    return Object.freeze({
        nombre: String(datos.get("nombre").trim().toUpperCase()),
        apellidos: String(datos.get("apellidos").trim().toUpperCase()),
        correo: String(datos.get("correo").trim().toUpperCase()),
        telefono: String(datos.get("telefono").trim().toUpperCase()),
        nacimiento: String(datos.get("nacimiento").trim().toUpperCase()),
        genero: String(datos.get("genero").trim().toUpperCase()),
        mensaje: String(datos.get("mensaje").trim().toUpperCase()),

    })
}