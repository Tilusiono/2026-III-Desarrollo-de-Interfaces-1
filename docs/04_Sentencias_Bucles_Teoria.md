# Teoría: Sentencias y bucles

## Propósito

Controlar decisiones e iteraciones con límites, acumuladores y salidas anticipadas.

## 1. Bloques y sentencias

Una sentencia realiza una acción; un bloque agrupa sentencias y crea ámbito para `let` y `const`.

~~~javascript
{
  const mensaje = "bloque";
  console.log(mensaje);
}
~~~

## 2. `if`, `else if`, `else`

Evalúan condiciones en orden. Coloque primero los casos más específicos.

~~~javascript
if (promedio >= 18) {
  console.log("Destacado");
} else if (promedio >= 13) {
  console.log("Aprobado");
} else {
  console.log("Desaprobado");
}
~~~

## 3. Guard clauses

Las salidas tempranas reducen anidamiento y separan errores del camino principal.

~~~javascript
if (valor === null) return "Falta el valor";
if (typeof valor !== "number") return "Tipo inválido";
return "Válido";
~~~

## 4. `switch`

Es útil cuando una expresión se compara con varios valores exactos. `break` evita el fall-through.

~~~javascript
switch (estado) {
  case "APROBADO":
    console.log("Continuar");
    break;
  default:
    console.log("Desconocido");
}
~~~

## 5. `while`

Se usa cuando la cantidad de iteraciones depende de una condición cambiante.

~~~javascript
let saldo = 100;
while (saldo > 0) {
  saldo -= 25;
}
~~~

## 6. `do...while`

Ejecuta el bloque al menos una vez.

~~~javascript
let intentos = 0;
do {
  intentos++;
} while (intentos < 3);
~~~

## 7. `for`

Reúne inicialización, condición y actualización.

~~~javascript
for (let indice = 0; indice < 10; indice++) {
  console.log(indice);
}
~~~

## 8. `for...of`

Recorre valores de un iterable y comunica mejor la intención que controlar índices manuales.

~~~javascript
for (const nota of notas) {
  console.log(nota);
}
~~~

## 9. `for...in`

Recorre claves enumerables de un objeto. No se recomienda para arreglos.

~~~javascript
for (const propiedad in estudiante) {
  console.log(propiedad, estudiante[propiedad]);
}
~~~

## 10. `break` y `continue`

`continue` salta a la siguiente iteración; `break` termina el bucle actual.

~~~javascript
for (let i = 1; i <= 100; i++) {
  if (i % 2 !== 0) continue;
  if (i > 20) break;
  console.log(i);
}
~~~

## 11. Acumuladores

Un acumulador conserva un resultado parcial; un contador registra ocurrencias.

~~~javascript
let suma = 0;
let aprobados = 0;
for (const nota of notas) {
  suma += nota;
  if (nota >= 13) aprobados++;
}
~~~

## 12. Complejidad

Dos bucles de tamaño `n` anidados realizan aproximadamente `n²` operaciones. En datos grandes, la estructura importa.

~~~javascript
for (const fila of matriz) {
  for (const celda of fila) {
    procesar(celda);
  }
}
~~~

## 13. Caso complejo: conciliación de movimientos

~~~javascript
let saldo = 0;
let procesados = 0;
let rechazados = 0;

for (const monto of movimientos) {
  if (!Number.isFinite(monto) || monto === 0) {
    rechazados++;
    continue;
  }
  if (saldo + monto < 0) {
    rechazados++;
    continue;
  }
  saldo += monto;
  procesados++;
  if (saldo >= 250) break;
}
~~~

## Buenas prácticas

- Mantenga nombres descriptivos y responsabilidades claras.
- Valide datos en los límites del programa.
- Evite comportamientos implícitos difíciles de leer.
- Pruebe valores normales, límites y entradas inválidas.
- Comente decisiones, no instrucciones evidentes.

## Resumen

Controlar decisiones e iteraciones con límites, acumuladores y salidas anticipadas. Los ejemplos deben ejecutarse y modificarse para comprobar su comportamiento.

