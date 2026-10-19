export class CamposRol {
    #selector;
    #paneles;

    constructor(selector, paneles) {
        this.#selector = selector;
        this.#paneles = [...paneles];
    }

    iniciar() {
        this.#selector.addEventListener("change", () => this.actualizar());
        this.actualizar();
    }

    actualizar() {
        this.#paneles.forEach(panel => {
            const activo = panel.dataset.rol === this.#selector.value;
            panel.hidden = !activo;
            // Un fieldset deshabilitado no participa en la validación HTML.
            panel.disabled = !activo;
        });
    }

    obtenerValores() {
        const panel = this.#paneles.find(
            elemento => elemento.dataset.rol === this.#selector.value
        );
        if (!panel) throw new Error("Seleccione un tipo de usuario.");
        return [...panel.querySelectorAll("[data-especifico]")]
            .map(campo => campo.value.trim());
    }
}
