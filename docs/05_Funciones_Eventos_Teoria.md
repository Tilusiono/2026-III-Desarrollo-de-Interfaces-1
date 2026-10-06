# Teoría: Funciones y eventos

## Propósito

Diseñar funciones reutilizables y coordinar interacciones del navegador mediante eventos.

## 1. Responsabilidad única

Una función debe tener propósito claro, entradas identificables, resultado predecible y pocos efectos secundarios.

~~~javascript
function calcularSubtotal(precio, cantidad) {
  return precio * cantidad;
}
~~~

## 2. Declaración y expresión

Las declaraciones tienen hoisting; las expresiones dependen de la inicialización de su variable.

~~~javascript
function saludar(nombre) {
  return "Hola " + nombre;
}
const despedir = function (nombre) {
  return "Adiós " + nombre;
};
~~~

## 3. Funciones flecha

Son compactas y no crean su propio `this` ni `arguments`.

~~~javascript
const duplicar = numero => numero * 2;
const total = (a, b) => {
  return a + b;
};
~~~

## 4. Parámetros predeterminados

Se aplican cuando el argumento es `undefined`.

~~~javascript
function crearMensaje(nombre = "Invitado") {
  return `Hola, ${nombre}`;
}
~~~

## 5. Parámetros rest

Agrupan argumentos adicionales en un arreglo.

~~~javascript
function sumar(...valores) {
  let total = 0;
  for (const valor of valores) total += valor;
  return total;
}
~~~

## 6. Funciones puras

Producen el mismo resultado para las mismas entradas y no modifican estado externo.

~~~javascript
function aplicarDescuento(monto, porcentaje) {
  return monto - monto * porcentaje;
}
~~~

## 7. Closure

Una función interna conserva acceso al entorno donde fue creada.

~~~javascript
function crearContador() {
  let valor = 0;
  return () => ++valor;
}
const siguiente = crearContador();
~~~

## 8. Orden superior y callbacks

Una función de orden superior recibe o devuelve funciones.

~~~javascript
function ejecutar(a, b, operacion) {
  return operacion(a, b);
}
const r = ejecutar(8, 3, (x, y) => x * y);
~~~

## 9. Contratos y errores

Valide argumentos y lance errores específicos cuando el contrato no se cumple.

~~~javascript
if (!Number.isFinite(a)) {
  throw new TypeError("Número inválido");
}
if (b === 0) {
  throw new RangeError("División entre cero");
}
~~~

## 10. Eventos del navegador

`addEventListener` separa marcado y comportamiento.

~~~javascript
const boton = document.querySelector("#guardar");
boton.addEventListener("click", manejarGuardado);
~~~

## 11. Objeto `Event`

`target` identifica el origen; `currentTarget`, el elemento del listener; `preventDefault` cancela la acción predeterminada.

~~~javascript
function manejar(evento) {
  evento.preventDefault();
  console.log(evento.target, evento.currentTarget);
}
~~~

## 12. Delegación

Un listener en un contenedor controla elementos actuales y futuros mediante `closest`.

~~~javascript
lista.addEventListener("click", evento => {
  const boton = evento.target.closest("[data-accion]");
  if (!boton) return;
  console.log(boton.dataset.accion);
});
~~~

## 13. Debounce

Retrasa una acción frecuente hasta que transcurre un periodo sin nuevas llamadas.

~~~javascript
function debounce(fn, espera) {
  let id;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => fn(...args), espera);
  };
}
~~~

## 14. Caso complejo: formulario robusto

~~~javascript
formulario.addEventListener("submit", evento => {
  evento.preventDefault();
  const datos = leerFormulario(formulario);
  const normalizados = normalizarDatos(datos);
  const errores = validarDatos(normalizados);

  renderizarErrores(errores);
  if (Object.keys(errores).length > 0) return;

  const estudiante = crearEstudiante(normalizados);
  renderizarEstudiante(estudiante);
  formulario.reset();
});
~~~

## Buenas prácticas

- Mantenga nombres descriptivos y responsabilidades claras.
- Valide datos en los límites del programa.
- Evite comportamientos implícitos difíciles de leer.
- Pruebe valores normales, límites y entradas inválidas.
- Comente decisiones, no instrucciones evidentes.

## Resumen

Diseñar funciones reutilizables y coordinar interacciones del navegador mediante eventos. Los ejemplos deben ejecutarse y modificarse para comprobar su comportamiento.

