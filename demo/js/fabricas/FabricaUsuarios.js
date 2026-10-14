export class FabricaUsuarios {
    #constructores;

    constructor(constructores) {
        this.#constructores = new Map(Object.entries(constructores));
    }

    crear(tipo, nombre, apellido, correo, telefono, fechaNacimiento, genero, mensaje, parametro1, parametro2) {
        const ClaseUsuario = this.#constructores.get(tipo);
        if (!ClaseUsuario) throw new Error("Seleccione un tipo de usuario válido.");
        // Cada subclase interpreta sus dos parámetros propios.
        return new ClaseUsuario(
            nombre, apellido, correo, telefono, fechaNacimiento,
            genero, mensaje, parametro1, parametro2
        );
    }
}
