# Teoría: Conversión de variables

## Propósito

Transformar y validar datos externos mediante conversiones explícitas y control de coerción.

## 1. Conversión y coerción

La conversión explícita se solicita con funciones como `Number` o `String`. La coerción ocurre automáticamente durante una operación.

~~~javascript
Number("25"); // 25
"25" + 5; // "255"
~~~

## 2. Conversión a texto

`String(valor)` funciona con todos los primitivos. `toString()` no debe invocarse sobre `null` o `undefined`.

~~~javascript
String(25);
String(true);
String(null);
(25).toString();
~~~

## 3. Conversión con `Number`

`Number` exige que la cadena completa represente un número. Las cadenas vacías y `null` se convierten en cero; `undefined` y texto inválido producen `NaN`.

~~~javascript
Number(" 42 "); // 42
Number(""); // 0
Number("12px"); // NaN
Number(null); // 0
~~~

## 4. `parseInt` y `parseFloat`

Estas funciones leen desde el inicio hasta encontrar un carácter inválido. `parseInt` admite una base numérica.

~~~javascript
parseInt("120px", 10); // 120
parseFloat("18.75 kg"); // 18.75
parseInt("101", 2); // 5
~~~

## 5. Validación de `NaN`

`Number.isNaN` no realiza coerción previa y es más seguro que `isNaN`. `Number.isFinite` comprueba números finitos.

~~~javascript
const monto = Number("cien");
Number.isNaN(monto); // true
Number.isFinite(monto); // false
~~~

## 6. Conversión a boolean

Son falsy: `false`, cero, cadena vacía, `null`, `undefined` y `NaN`. Los demás valores son truthy, incluso `"false"`, `"0"`, `[]` y `{}`.

~~~javascript
Boolean(""); // false
Boolean("false"); // true
Boolean([]); // true
~~~

## 7. Coerción con suma

El operador `+` suma números o concatena si un operando se convierte a texto.

~~~javascript
10 + 5; // 15
"10" + 5; // "105"
true + 1; // 2
~~~

## 8. Coerción con otros operadores

Resta, multiplicación y división intentan convertir los operandos a número.

~~~javascript
"10" - 3; // 7
"10" * 3; // 30
"10a" * 2; // NaN
~~~

## 9. Igualdad estricta

`==` permite coerción; `===` compara valor y tipo. Se recomienda igualdad estricta.

~~~javascript
5 == "5"; // true
5 === "5"; // false
0 == false; // true
~~~

## 10. Entradas de formularios

Los valores de controles HTML suelen ser texto. Valide primero el vacío, luego convierta y compruebe rango y formato.

~~~javascript
const entrada = "   ";
const tieneContenido = entrada.trim() !== "";
const numero = tieneContenido ? Number(entrada) : NaN;
~~~

## 11. Normalización

La normalización elimina diferencias accidentales antes de guardar o comparar.

~~~javascript
const original = "  ANA@IDAT.EDU.PE ";
const normalizado = original.trim().toLowerCase();
~~~

## 12. Precisión monetaria

Los decimales binarios pueden producir imprecisiones. Para dinero sencillo, calcule en unidades mínimas.

~~~javascript
0.1 + 0.2; // 0.30000000000000004
const precioCentimos = 1050;
const totalCentimos = precioCentimos * 3;
~~~

## 13. Caso complejo: normalización monetaria

~~~javascript
const entrada = " 1,250.50 ";
const normalizada = entrada.trim().replaceAll(",", "");
const monto = Number(normalizada);
const esValido =
  normalizada !== "" &&
  Number.isFinite(monto) &&
  monto >= 0;

console.log({ entrada, normalizada, monto, esValido });
~~~

## Buenas prácticas

- Mantenga nombres descriptivos y responsabilidades claras.
- Valide datos en los límites del programa.
- Evite comportamientos implícitos difíciles de leer.
- Pruebe valores normales, límites y entradas inválidas.
- Comente decisiones, no instrucciones evidentes.

## Resumen

Transformar y validar datos externos mediante conversiones explícitas y control de coerción. Los ejemplos deben ejecutarse y modificarse para comprobar su comportamiento.

