import { Usuario } from "./Usuario.js";

export class RecursosHumanos extends Usuario {
    #areaAsignada;
    categoria;
    cargo; // Atributo público propio de este rol.

    constructor(nombre, apellido, correo, telefono, fechaNacimiento, genero, mensaje, ...datosEspecificos) {
        super(nombre, apellido, correo, telefono, fechaNacimiento, genero, mensaje, "Personal de aseo");

        let areaAsignada;
        let categoria;
        let cargo;
        if (datosEspecificos.length === 2) {
            [categoria, cargo] = datosEspecificos;
        } else if (datosEspecificos.length === 3) {
            [areaAsignada, categoria, cargo] = datosEspecificos;
        } else {
            throw new Error("Indique categoría y cargo, con área asignada opcional.");
        }

        this.areaAsignada = areaAsignada;
        if (typeof categoria !== "string" || !categoria.trim()) {
            throw new Error("Debe indicar: categoría.");
        }
        if (typeof cargo !== "string" || !cargo.trim()) {
            throw new Error("Debe indicar: cargo.");
        }
        this.categoria = categoria.trim();
        this.cargo = cargo.trim();
    }

    get areaAsignada() { return this.#areaAsignada; }
    set areaAsignada(valor) {
        if (valor === undefined || valor === null || (typeof valor === "string" && !valor.trim())) {
            this.#areaAsignada = null;
            return;
        }
        if (typeof valor !== "string") {
            throw new Error("Debe indicar: área asignada.");
        }
        this.#areaAsignada = valor.trim();
    }

    obtenerRol() { return this.rol; }

    obtenerDescripcion() {
        const area = this.#areaAsignada
            ? `Realiza la limpieza de ${this.#areaAsignada}`
            : "Realiza sus funciones";
        return `${area} en la categoría ${this.categoria} y el cargo ${this.cargo}.`;
    }

    obtenerDetalles() {
        const detalles = [["Categoría", this.categoria]];
        if (this.areaAsignada) {
            detalles.push(["Área asignada", this.areaAsignada]);
        }
        detalles.push(["Cargo", this.cargo]);
        return detalles;
    }
}
