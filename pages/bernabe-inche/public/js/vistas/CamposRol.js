
class CamposRol {
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
        const valorSeleccionado = this.#selector.value;
        this.#paneles.forEach(panel => {
            if (panel.dataset.rol === valorSeleccionado) {
                panel.hidden = false;
                panel.disabled = false;
            } else {
                panel.hidden = true;
                panel.disabled = true;
            }
        });
    }
}
export default CamposRol;