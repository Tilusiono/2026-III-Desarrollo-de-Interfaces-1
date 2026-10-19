// Contrato abstracto en tiempo de ejecución. No es una interface nativa.
export class RolUsuario {
    constructor() {
        if (new.target === RolUsuario) {
            throw new Error("RolUsuario es abstracta.");
        }
    }

    obtenerRol() {
        throw new Error("Debe implementar obtenerRol().");
    }

    obtenerDescripcion() {
        throw new Error("Debe implementar obtenerDescripcion().");
    }
    obtenerDetalles() {
        throw new Error("Debe implementar obtenerDetalles().");
    }
}
