function obtenerValores(NombreFormulario){
    const datosObtenidos = new FormData(NombreFormulario);

    return Object.freeze({
        nombre:String(datosObtenidos.get("nombre").trim().toupperCase()),
        apellido:String(datosObtenidos.get("apellidos").trim().toupperCase()),
        correoElectronico:String(datosObtenidos.get("correo").trim().toupperCase()),
        nroContacto:String(datosObtenidos.get("telefono").trim().toupperCase()),
        fechaNacimiento:String(datosObtenidos.get("fechaNacimiento").trim().toupperCase()),
        Genero:String(datosObtenidos.get("genero").trim().toupperCase()),
        mensaje:String(datosObtenidos.get("mensaje").trim().toupperCase())
    })
}