import { RepositorioUsuarios } from "./repositorioUsuarios.js";

export class RepositorioUsuariosImp extends RepositorioUsuarios {

    #usuarios = [];

    guardarUsuario(usuario) {
        this.#usuarios.push(usuario);
    }

    listarUsuarios(){
        return [...this.#usuarios];
    }
}