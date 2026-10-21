import { RepositorioUsuariosImp } from "../repositorio/repositorioUsuarioImp.js";

export class ServicioUsuarios {
    #repositorio;


    constructor(repo) {
        this.#repositorio =  new RepositorioUsuariosImp();
    }

    registrar(usuario){
        this.#repositorio.guardarUsuario(usuario);
        return usuario;
    }

    listar(){
        return this.#repositorio.listarUsuarios();
    }
}