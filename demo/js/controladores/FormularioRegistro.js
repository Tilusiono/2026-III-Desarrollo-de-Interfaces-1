export class FormularioRegistro {
    #formulario;
    #fabrica;
    #servicio;
    #vista;
    #estado;
    #camposRol;

    constructor(formulario, fabrica, servicio, vista, estado, camposRol) {
        this.#formulario = formulario;
        this.#fabrica = fabrica;
        this.#servicio = servicio;
        this.#vista = vista;
        this.#estado = estado;
        this.#camposRol = camposRol;
    }

    iniciar() {
        this.#camposRol.iniciar();
        this.#vista.mostrar(this.#servicio.listar());
        this.#formulario.addEventListener("submit", evento => {
            evento.preventDefault();
            if (!this.#formulario.reportValidity()) return;
            const campos = this.#formulario.elements;
            try {
                const [parametro1, parametro2] = this.#camposRol.obtenerValores();
                const usuario = this.#fabrica.crear(
                    campos.namedItem("tipoUsuario").value,
                    campos.namedItem("nombre").value.trim(),
                    campos.namedItem("apellido").value.trim(),
                    campos.namedItem("correo").value.trim(),
                    campos.namedItem("telefono").value,
                    campos.namedItem("fechaNacimiento").value,
                    campos.namedItem("genero").value,
                    campos.namedItem("mensaje").value.trim(),
                    parametro1,
                    parametro2
                );
                this.#servicio.registrar(usuario);
                this.#vista.mostrar(this.#servicio.listar());
                this.#estado.textContent =
                    `${usuario.obtenerNombreCompleto()} registrado como ${usuario.obtenerRol()}.`;
            } catch (error) {
                this.#estado.textContent = error.message;
            }
        });
        this.#formulario.addEventListener("reset", () => {
            // El evento ocurre antes de restaurar los controles.
            queueMicrotask(() => this.#camposRol.actualizar());
            this.#estado.textContent = "Formulario restaurado. Los usuarios permanecen en la tabla.";
        });
    }
}
