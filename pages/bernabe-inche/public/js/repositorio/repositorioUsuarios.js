
// CONTRATO  Interfaz de RepositorioUsuarios

export class RepositorioUsuarios {

    constructor() {
        if (this.constructor === RepositorioUsuarios) {
            throw new Error("No se puede instanciar la clase abstracta RepositorioUsuarios.");
        }   
    }

    guardarUsuario(usuario) {
        throw new Error("El método guardarUsuario() debe ser implementado en la subclase.");
    }   

    modificarUsuario(usuario) {
        throw new Error("El método modificarUsuario() debe ser implementado en la subclase.");
    }

    eliminarUsuario(usuario) {
        throw new Error("El método eliminarUsuario() debe ser implementado en la subclase.");
    }

    listarUsuarios() {
        throw new Error("El método listarUsuarios() debe ser implementado en la subclase.");
    }

}