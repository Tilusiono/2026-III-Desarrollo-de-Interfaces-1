import { RepositorioUsuarios } from "../contratos/RepositorioUsuarios.js";

export class RepositorioUsuariosMemoria extends RepositorioUsuarios {
    #usuarios = [];

    guardar(usuario) {
        this.#usuarios.push(usuario); // Agrega: no reemplaza registros anteriores.
    }

    listar() {
        return [...this.#usuarios]; // Copia para proteger el arreglo interno.
    }

    listar(genero) {
        return [...this.#usuarios]; // Copia para proteger el arreglo interno.
    }
}
