// Contrato pequeño: el servicio solo necesita guardar y listar.
export class RepositorioUsuarios {
    constructor() {
        if (new.target === RepositorioUsuarios) {
            throw new Error("RepositorioUsuarios es abstracto.");
        }
    }

    guardar(usuario) {
        throw new Error("Debe implementar guardar(usuario).");
    }

    listar() {
        throw new Error("Debe implementar listar().");
    }
    
    listar(genero) {
        throw new Error("Debe implementar listar().");
    }
}
