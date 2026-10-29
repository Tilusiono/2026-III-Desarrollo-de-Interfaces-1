export class Rol {
    constructor(nombre, detalles) {
        this.nombre = nombre;
        this.detalles = Object.freeze(detalles.map(([campo, valor]) =>
            Object.freeze([campo, valor])
        ));
        Object.freeze(this);
    }

    obtenerDetalles() {
        return this.detalles;
    }
}