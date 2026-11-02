// public/js/modelos/Odontologo.js
import { Usuario } from './Usuario.js';

export class Odontologo extends Usuario {
    #especialidad;
    #horario;

    constructor(id, nombre, correo, especialidad, horario) {
        // super() inicializa los atributos de la clase padre
        super(id, nombre, correo, "Odontólogo"); 
        this.#especialidad = especialidad;
        this.#horario = horario;
    }

    get Blackespecialidad() { return this.#especialidad; } // Corrección semántica interna para el gestor
    get especialidad() { return this.#especialidad; }
    get horario() { return this.#horario; }

    // Aplicación de Polimorfismo: Sobrescribimos el método del padre
    obtenerPresentacion() {
        return `${super.obtenerPresentacion()} | Especialidad: ${this.#especialidad} | Turno: ${this.#horario}`;
    }
}
