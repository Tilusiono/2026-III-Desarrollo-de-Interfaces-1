import { Rol } from "./Rol.js";

export class Otro extends Rol {
    constructor(datos) {
        super("Otro", [
            ["Rol especificado", datos.rolEspecifico],
            ["Datos adicionales", datos.datosAdicionales]
        ]);
    }
}