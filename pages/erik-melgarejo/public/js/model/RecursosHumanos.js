import { Rol } from "./Rol.js";

export class RecursosHumanos extends Rol {
    constructor(datos) {
        super("Recursos Humanos", [
            ["Departamento", datos.departamento],
            ["Cargo", datos.cargo]
        ]);
    }
}