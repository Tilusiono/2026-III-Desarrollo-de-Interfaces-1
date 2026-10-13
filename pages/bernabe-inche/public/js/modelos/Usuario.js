export class Usuario {

    //INJECCION SQL

    //Encapsulamiento # Privado
    #id
    #nombre
    #apellido

    //Publicos
    correoElectrico // -> correo (MAPEO DE DATOS)
    telefono
    fechaNacimiento
    genero
    tipoUsuario
    mensaje

    //POLIMORFISMO
    //mensaje por defecto
    constructor(nombre, apellido, correo, telefono,
         fechaNacimiento, genero,tipoUsuario) {
        this.mensaje="Mensaje por defecto";
        super(nombre, apellido, correo, telefono, 
            fechaNacimiento, genero, mensaje,tipoUsuario);
    }

    
    constructor(nombre, apellido, correo, telefono,
         fechaNacimiento, genero, tipoUsuario,mensaje) {
        super(nombre, apellido, correo, telefono, 
            fechaNacimiento, genero, mensaje,tipoUsuario);
    }

    
    get codigoUsuario() { return this.#id; }
    set codigoUsuario(valor) {
        if (typeof valor !== "string" || !valor.trim()) {
            throw new Error("Debe indicar: código del alumno.");
        }

        this.#id = valor.trim();
    }

    get NombresUsuario() { return this.#nombre; }
    set NombresUsuario(valor) {
        if (typeof valor !== "string" || !valor.trim()) {
            throw new Error("Debe indicar: Nombre del alumno.");
        }

        this.#nombre = valor.trim();
    }

    get ApellidosUsuario() { return this.#apellido; }
    set ApellidosUsuario(valor) {
        if (typeof valor !== "string" || !valor.trim()) {
            throw new Error("Debe indicar: Apellido del alumno.");
        }

        this.#apellido = valor.trim();
    }

}