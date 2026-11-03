import { Rol } from "./Rol.js";

export class Profesor extends Rol {
    constructor(datos) {
        super("Profesor", [
            ["Especialidad", datos.especialidad],
            ["Grado académico", datos.gradoAcademico]
        ]);
    }
}