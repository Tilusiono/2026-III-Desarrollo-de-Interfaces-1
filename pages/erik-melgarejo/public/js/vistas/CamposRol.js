export class CamposRol {
    #selector;
    #paneles;
    #contenedor;
    #panelActivo = null;

    constructor(selector, paneles, contenedor) {
        this.#selector = selector;
        this.#paneles = [...paneles];
        this.#contenedor = contenedor;
    }

    iniciar() {
        this.#selector.addEventListener("change", () => this.actualizar());
        this.actualizar();
    }

    actualizar() {
        const panelSeleccionado = this.#paneles.find(
            panel => panel.dataset.rol === this.#selector.value
        ) ?? null;
        const rolSeleccionado = panelSeleccionado !== null;

        this.#contenedor.hidden = !rolSeleccionado;
        this.#contenedor.disabled = !rolSeleccionado;

        if (this.#panelActivo && this.#panelActivo !== panelSeleccionado) {
            this.#panelActivo.querySelectorAll("[data-campo-rol]").forEach(campo => {
                campo.value = "";
            });
        }

        this.#paneles.forEach(panel => {
            const activo = panel === panelSeleccionado;
            panel.hidden = !activo;
            panel.disabled = !activo;
        });

        this.#panelActivo = panelSeleccionado;
    }

    obtenerValores() {
        if (!this.#panelActivo) {
            throw new Error("Selecciona un rol para continuar.");
        }

        return Object.fromEntries(
            [...this.#panelActivo.querySelectorAll("[data-campo-rol]")]
                .map(campo => [campo.name, campo.value.trim()])
        );
    }
}