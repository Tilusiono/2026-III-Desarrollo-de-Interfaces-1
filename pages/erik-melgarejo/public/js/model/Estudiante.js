import { Rol } from "./Rol.js";

export class Estudiante extends Rol {
    constructor(datos) {
        super("Estudiante", [
            ["Código de estudiante", datos.codigoEstudiante],
            ["Carrera", datos.carrera]
        ]);
    }
}