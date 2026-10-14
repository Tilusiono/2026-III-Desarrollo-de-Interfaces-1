import { Usuario } from "./Usuario.js";

export class Rrhh extends Usuario {

    #categoria; //Atributo privado
    area; // Atributo público 

    constructor(nombre, apellido, categoria, area) {
        super(nombre, apellido, "RRHH");

        this.#categoria = categoria;
        this.area = area.trim();
    }
    //CATEGORIA COMO OBLIGATORIO
    //AREA CAMPO OPCIONAL
    constructor(nombre, apellido, categoria) {
        super(nombre, apellido, "RRHH");

        this.#categoria = categoria;
        this.area = "Area Reusable";
    }
    get categoria() { return this.#categoria; }
    set categoria(valor) {
        if (typeof valor !== "string" || !valor.trim()) {
            throw new Error("Debe indicar: código del alumno.");
        }
        this.#categoria = valor.trim();
    }

    obtenerRol() { return this.rol; }

    obtenerDescripcion() {
        return `Estudia ${this.area}; código de alumno ${this.#categoria}.`;
    }

    obtenerDetalles() {
        return [
            ["Código del alumno", this.categoria],
            ["area", this.area]
        ];
    }
}
