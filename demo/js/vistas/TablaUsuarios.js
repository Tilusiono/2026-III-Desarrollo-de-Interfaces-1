export class TablaUsuarios {
    #cuerpo;
    #contador;

    constructor(cuerpo, contador) {
        this.#cuerpo = cuerpo;
        this.#contador = contador;
    }

    mostrar(usuarios) {
        const fragmento = document.createDocumentFragment();
        usuarios.forEach((usuario, indice) => {
            const fila = document.createElement("tr");
            const valores = [
                indice + 1,
                usuario.obtenerNombreCompleto(),
                usuario.correo,
                usuario.telefono,
                usuario.fechaNacimiento,
                usuario.genero,
                // Las mismas llamadas funcionan con todos los roles.
                usuario.obtenerRol(),
                usuario.obtenerDescripcion(),
                usuario.obtenerDetalles()
                    .map(([etiqueta, valor]) => `${etiqueta}: ${valor}`)
                    .join(" | "),
                usuario.mensaje
            ];
            valores.forEach(valor => {
                const celda = document.createElement("td");
                celda.textContent = String(valor);
                fila.appendChild(celda);
            });
            fragmento.appendChild(fila);
        });
        this.#cuerpo.replaceChildren(fragmento);
        this.#contador.textContent = String(usuarios.length);
    }
}
