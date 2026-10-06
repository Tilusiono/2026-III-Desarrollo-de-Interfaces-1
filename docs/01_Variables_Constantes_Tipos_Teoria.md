# Teoría: Variables, constantes y tipos

## Propósito

Modelar información con declaraciones correctas, ámbitos claros y tipos coherentes.

## 1. Declaración, inicialización y reasignación

Declarar crea un identificador; inicializar asigna el primer valor; reasignar reemplaza el valor de una variable declarada con `let`.

~~~javascript
let saldo;
saldo = 1500;
saldo = 1320.50;
const moneda = "PEN";
~~~

## 2. `const`, `let` y `var`

`const` no permite reasignación y debe inicializarse. `let` permite reasignar. Ambas tienen ámbito de bloque. `var` tiene ámbito de función, admite redeclaración y debe evitarse en código moderno.

~~~javascript
const VERSION = "2.0.0";
let usuariosActivos = 0;
usuariosActivos += 1;
~~~

## 3. Ámbito léxico y sombreado

Un bloque interno puede acceder a identificadores externos y también declarar otro identificador con el mismo nombre. El sombreado excesivo dificulta seguir el origen de los datos.

~~~javascript
const entorno = "producción";
{
  const entorno = "pruebas";
  console.log(entorno);
}
console.log(entorno);
~~~

## 4. Temporal Dead Zone

`let` y `const` se registran al entrar en el ámbito, pero no pueden utilizarse antes de su inicialización. Acceder antes produce `ReferenceError`.

~~~javascript
// console.log(usuario); // ReferenceError
const usuario = "Andrea";
~~~

## 5. Nombres y convenciones

Use `camelCase`, nombres que expresen propósito, un solo idioma y constantes de configuración claramente identificables. Evite abreviaturas ambiguas, espacios, guiones y palabras reservadas.

~~~javascript
const correoInstitucional = "ana@idat.edu.pe";
let totalEstudiantes = 25;
const MAX_INTENTOS = 3;
~~~

## 6. Tipado dinámico

El tipo pertenece al valor. Una variable puede recibir valores de tipos diferentes, pero conservar un propósito estable reduce errores.

~~~javascript
let respuesta = 200;
respuesta = "Operación exitosa";
~~~

## 7. Tipos primitivos

JavaScript ofrece `string`, `number`, `boolean`, `undefined`, `null`, `bigint` y `symbol`. `NaN` e `Infinity` pertenecen a `number`.

~~~javascript
const nombre = "IDAT";
const promedio = 16.75;
const activo = true;
let turno;
const foto = null;
const correlativo = 9007199254740993n;
~~~

## 8. Referencias y `const`

Objetos y funciones son valores de referencia. `const` impide cambiar la referencia, pero no convierte automáticamente el contenido en inmutable.

~~~javascript
const configuracion = { tema: "claro" };
configuracion.tema = "oscuro";
// configuracion = {}; // Error
~~~

## 9. `typeof` y comprobaciones

`typeof` ayuda a inspeccionar valores. `typeof null` devuelve `"object"` por una particularidad histórica. Para null use igualdad estricta.

~~~javascript
typeof "IDAT"; // string
typeof 25; // number
typeof null; // object
const esNull = valor === null;
~~~

## 10. Igualdad de referencias

Dos objetos con el mismo contenido no son iguales si ocupan referencias distintas. Una copia de la referencia sí conserva identidad.

~~~javascript
const a = { id: 1 };
const b = { id: 1 };
const c = a;
console.log(a === b); // false
console.log(a === c); // true
~~~

## 11. Inmutabilidad superficial

`Object.freeze` bloquea cambios directos, pero no congela automáticamente objetos anidados.

~~~javascript
const usuario = Object.freeze({
  id: 10,
  perfil: { nombre: "Ana" }
});
usuario.perfil.nombre = "Lucía";
~~~

## 12. Caso complejo: configuración de una aplicación

~~~javascript
const APP_NAME = "Matrícula IDAT";
const VERSION = "2.0.0";
const entorno = "producción";
let usuariosActivos = 128;
let ultimoError = null;
const modoMantenimiento = false;

console.table({ APP_NAME, VERSION, entorno, usuariosActivos, ultimoError, modoMantenimiento });
console.log(typeof usuariosActivos);
console.log(ultimoError === null);
~~~

## Buenas prácticas

- Mantenga nombres descriptivos y responsabilidades claras.
- Valide datos en los límites del programa.
- Evite comportamientos implícitos difíciles de leer.
- Pruebe valores normales, límites y entradas inválidas.
- Comente decisiones, no instrucciones evidentes.

## Resumen

Modelar información con declaraciones correctas, ámbitos claros y tipos coherentes. Los ejemplos deben ejecutarse y modificarse para comprobar su comportamiento.

