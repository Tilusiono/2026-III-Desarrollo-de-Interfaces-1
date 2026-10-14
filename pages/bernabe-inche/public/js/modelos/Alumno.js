//extends nos permite usar HERENCIA
import { Usuario } from "./Usuario";
export class Alumno extends Usuario {

    //INJECCION SQL

    //Encapsulamiento # Privado
    #cicloActual

    //POLIMORFISMO

    //mensaje por defecto
    constructor(nombre, apellido, correo, telefono, 
        fechaNacimiento,genero, cicloActualAlumno) {
        super(nombre, apellido, correo, telefono, 
            fechaNacimiento,genero, "Alumno");
        this.#cicloActual = cicloActualAlumno;
    }

   constructor(nombre, apellido, correo, telefono, 
        fechaNacimiento,genero, cicloActualAlumno,mensaje) {
        super(nombre, apellido, correo, telefono, 
            fechaNacimiento,genero,mensaje, "Alumno");
        this.#cicloActual = cicloActualAlumno;
    }


    get cicloActualAlum() { return this.#cicloActual; }
    set cicloActualAlum(valor) {
        if (typeof valor !== "string" || !valor.trim()) {
            throw new Error("Debe indicar: Especialidad Docente.");
        }

        this.#cicloActual = valor.trim();
    }

}