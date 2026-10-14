import { Alumno } from "./modelos/Alumno.js";
import { Maestro } from "./modelos/Maestro.js";
import { PersonalAseo } from "./modelos/PersonalAseo.js";
import { FabricaUsuarios } from "./fabricas/FabricaUsuarios.js";
import { RepositorioUsuariosMemoria } from "./repositorios/RepositorioUsuariosMemoria.js";
import { RegistroUsuarios } from "./servicios/RegistroUsuarios.js";
import { TablaUsuarios } from "./vistas/TablaUsuarios.js";
import { CamposRol } from "./vistas/CamposRol.js";
import { FormularioRegistro } from "./controladores/FormularioRegistro.js";

// Entrada propia del formulario: conecta las dependencias.
const fabrica = new FabricaUsuarios({
    alumno: Alumno,
    maestro: Maestro,
    personalAseo: PersonalAseo
});
const repositorio = new RepositorioUsuariosMemoria();
const servicio = new RegistroUsuarios(repositorio);

const vista = new TablaUsuarios(
    document.getElementById("cuerpoResultado"),
    document.getElementById("totalUsuarios")
);

const camposRol = new CamposRol(
    document.getElementById("tipoUsuario"),
    document.querySelectorAll("[data-rol]")
);
const hoy = new Date();
document.getElementById("fechaNacimiento").max =
    `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, "0")}-${String(hoy.getDate()).padStart(2, "0")}`;

new FormularioRegistro(
    document.getElementById("formularioRegistro"),
    fabrica,
    servicio,
    vista,
    document.getElementById("estadoRegistro"),
    camposRol
).iniciar();
