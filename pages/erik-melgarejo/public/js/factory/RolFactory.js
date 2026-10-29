import { Rol } from "../model/Rol.js";
import { Estudiante } from "../model/Estudiante.js";
import { Profesor } from "../model/Profesor.js";
import { RecursosHumanos } from "../model/RecursosHumanos.js";
import { Otro } from "../model/Otro.js";

const roles = new Map([
    ["estudiante", Estudiante],
    ["profesor", Profesor],
    ["recursos-humanos", RecursosHumanos],
    ["otro", Otro]
]);

export class RolFactory {
    static crear(tipo, datos) {
        const ClaseRol = roles.get(tipo);
        if (!ClaseRol) {
            throw new Error("Selecciona un rol válido.");
        }
        return new ClaseRol(datos);
    }
}