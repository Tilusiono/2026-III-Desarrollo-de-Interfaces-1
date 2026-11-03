import CamposRol from "./vistas/CamposRol.js";
import FrmRegistro from "./vistas/FrmRegistro.js";



const camposRol = new CamposRol(
    document.getElementById("tipoUsuario"),
    document.querySelectorAll("[data-rol]")
);

const formulario = document.getElementById("formulario");

new FrmRegistro(
    camposRol,
    formulario
).iniciar();