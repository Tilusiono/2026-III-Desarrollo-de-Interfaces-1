

class FrmRegistro {

    #formulario;
    #camposRol;

    constructor(camposRol,formulario) {
        this.#camposRol = camposRol;
        this.#formulario = formulario;
    }

    iniciar() {
        this.#camposRol.iniciar();
        this.#formulario.addEventListener("submit", this.enviarDatos());
    }


    enviarDatos(){
        console.log("Datos enviados")
    }

}
export default FrmRegistro;