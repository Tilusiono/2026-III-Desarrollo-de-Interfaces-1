//extends nos permite usar HERENCIA
import { Usuario } from "./Usuario.js";
export class Docente extends Usuario {

    //INJECCION SQL

    //Encapsulamiento # Privado
    #especialidad

    //POLIMORFISMO

    //mensaje por defecto
    constructor(nombre, apellido, correo, telefono, 
        fechaNacimiento,genero, especialidadDocente) {
        super(nombre, apellido, correo, telefono, 
            fechaNacimiento,genero, "Docente");
        this.#especialidad = especialidadDocente;
    }


     constructor(nombre, apellido, correo, telefono, 
        fechaNacimiento,genero, especialidadDocente, mensaje) {
        super(nombre, apellido, correo, telefono, 
            fechaNacimiento,genero,mensaje, "Docente");
        this.#especialidad = especialidadDocente;
    }
    

    get especialidadDocente() { return this.#especialidad; }
    set especialidadDocente(valor) {
        if (typeof valor !== "string" || !valor.trim()) {
            throw new Error("Debe indicar: Especialidad Docente.");
        }

        this.#especialidad = valor.trim();
    }

}