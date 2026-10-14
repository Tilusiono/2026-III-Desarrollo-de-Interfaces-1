export class RegistroUsuarios {
    #repositorio;

    constructor(repositorio) {
        this.#repositorio = repositorio;
    }

    registrar(usuario) {
        // Recibe el objeto completo, con todos sus atributos y métodos.
        this.#repositorio.guardar(usuario);
        return usuario;
    }

    listar() {
        return this.#repositorio.listar();
    }

     listar(genero) {
        return this.#repositorio.listar(genero);
    }
}
