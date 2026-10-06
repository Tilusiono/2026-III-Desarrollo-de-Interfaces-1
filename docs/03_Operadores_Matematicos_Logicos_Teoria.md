# Teoría: Operadores matemáticos y lógicos

## Propósito

Construir expresiones matemáticas y booleanas precisas, legibles y seguras.

## 1. Operadores aritméticos

Los operadores `+`, `-`, `*`, `/`, `%` y `**` producen cálculos numéricos.

~~~javascript
const subtotal = precio * cantidad;
const residuo = 17 % 5;
const potencia = 2 ** 10;
~~~

## 2. Precedencia

Multiplicación, división y residuo se evalúan antes que suma y resta. Los paréntesis comunican intención.

~~~javascript
10 + 5 * 2; // 20
(10 + 5) * 2; // 30
~~~

## 3. Asignación compuesta

Combina operación y asignación. Debe utilizarse cuando mantiene claridad.

~~~javascript
let saldo = 1000;
saldo += 250;
saldo -= 100;
saldo *= 1.05;
~~~

## 4. Comparación

`>`, `<`, `>=`, `<=`, `===` y `!==` producen booleanos.

~~~javascript
const aprobado = nota >= 13;
const mismoTipo = codigo === "A01";
~~~

## 5. AND lógico

`&&` requiere que todas las condiciones sean truthy y devuelve el primer falsy o el último truthy.

~~~javascript
const puedeIngresar = cuentaActiva && tienePermiso;
~~~

## 6. OR lógico

`||` devuelve el primer valor truthy. Puede reemplazar valores válidos como cero o cadena vacía.

~~~javascript
const nombreVisible = alias || nombre || "Invitado";
~~~

## 7. NOT lógico

`!` invierte la verdad lógica. Doble negación convierte a boolean.

~~~javascript
const bloqueado = !cuentaActiva;
const existe = !!valor;
~~~

## 8. Coalescencia nula

`??` usa el valor alternativo solo ante `null` o `undefined`, preservando cero, false y cadena vacía.

~~~javascript
0 || 10; // 10
0 ?? 10; // 0
null ?? 10; // 10
~~~

## 9. Encadenamiento opcional

`?.` detiene una ruta si encuentra `null` o `undefined`.

~~~javascript
const ciudad = usuario?.direccion?.ciudad;
~~~

## 10. Operador ternario

Selecciona entre dos valores. Evite ternarios profundamente anidados.

~~~javascript
const estado = nota >= 13 ? "Aprobado" : "Desaprobado";
~~~

## 11. Asignación lógica

`??=`, `||=` y `&&=` combinan evaluación y asignación.

~~~javascript
config.tema ??= "claro";
cache.valor ||= calcularValor();
sesion.activa &&= verificarSesion();
~~~

## 12. Incremento

Postincremento retorna el valor anterior; preincremento retorna el nuevo. Evite usarlos dentro de expresiones complejas.

~~~javascript
let contador = 5;
const antes = contador++;
const despues = ++contador;
~~~

## 13. Caso complejo: precio final y elegibilidad

~~~javascript
const subtotal = precioBase * cantidad;
const descuento = subtotal * porcentajeDescuento;
const base = subtotal - descuento;
const envio = base >= envioGratisDesde ? 0 : costoEnvio;
const total = base + envio;

const compraValida =
  Number.isFinite(total) &&
  cantidad > 0 &&
  precioBase >= 0;
~~~

## Buenas prácticas

- Mantenga nombres descriptivos y responsabilidades claras.
- Valide datos en los límites del programa.
- Evite comportamientos implícitos difíciles de leer.
- Pruebe valores normales, límites y entradas inválidas.
- Comente decisiones, no instrucciones evidentes.

## Resumen

Construir expresiones matemáticas y booleanas precisas, legibles y seguras. Los ejemplos deben ejecutarse y modificarse para comprobar su comportamiento.

