
export class FabricaUsuarios {
    #constructores

    constructor(constructores) {
        this.#constructores = new Map(Object.entries(constructores));
    }


    crearUsuario(nombre, apellido, correo, telefono,fechaNacimiento,
         genero,mensaje,tipoUsuario,parametroExtra1,parametroExtra2) {
            const ClaseUsuario = this.#constructores.get(tipoUsuario);
            if(!ClaseUsuario) {
                throw new Error(`No se encontró un constructor para el tipo de usuario: ${tipoUsuario}`);
            }

            return new ClaseUsuario(nombre, apellido, correo, telefono,fechaNacimiento, 
                genero, mensaje, tipoUsuario,parametroExtra1,parametroExtra2); 

    } 
}