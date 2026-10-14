# Teoría: Arreglos y Programación Orientada a Objetos

## Propósito

Procesar colecciones y modelar un dominio con encapsulación, polimorfismo y composición.

## 1. Arreglos y mutación

Un arreglo es una colección ordenada. `push`, `pop`, `splice`, `sort` y `reverse` modifican el arreglo.

~~~javascript
const original = [3, 1, 2];
const ordenada = [...original].sort((a, b) => a - b);
~~~

## 2. `map`

Transforma cada elemento y produce un nuevo arreglo con la misma longitud.

~~~javascript
const nombres = productos.map(producto => producto.nombre);
~~~

## 3. `filter`

Conserva elementos que cumplen una condición.

~~~javascript
const disponibles = productos.filter(producto => producto.stock > 0);
~~~

## 4. `find`, `some`, `every`

`find` retorna un elemento; `some` comprueba al menos uno; `every`, todos.

~~~javascript
productos.find(p => p.id === 10);
productos.some(p => p.stock === 0);
productos.every(p => p.precio > 0);
~~~

## 5. `reduce`

Combina una colección en un resultado acumulado.

~~~javascript
const total = items.reduce(
  (suma, item) => suma + item.precio * item.cantidad,
  0
);
~~~

## 6. Agrupación

`reduce` puede construir índices y grupos. El acumulador debe ser explícito.

~~~javascript
const grupos = productos.reduce((acc, p) => {
  acc[p.categoria] ??= [];
  acc[p.categoria].push(p);
  return acc;
}, {});
~~~

## 7. Desestructuración y copias

La expansión crea copias superficiales; los objetos anidados siguen compartiendo referencia.

~~~javascript
const [primero, segundo, ...resto] = notas;
const copia = productos.map(p => ({ ...p }));
~~~

## 8. Clase y constructor

Una clase define estado inicial y comportamiento compartido.

~~~javascript
class Producto {
  constructor(codigo, nombre, precio) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.precio = precio;
  }
}
~~~

## 9. Encapsulación

Los campos privados protegen invariantes internas.

~~~javascript
class Cuenta {
  #saldo = 0;
  depositar(monto) {
    if (monto <= 0) throw new RangeError();
    this.#saldo += monto;
  }
}
~~~

## 10. Getters, setters y estáticos

Los accesores controlan lectura y escritura; los miembros estáticos pertenecen a la clase.

~~~javascript
class Estudiante {
  static total = 0;
  #nombre;
  set nombre(valor) {
    if (!String(valor).trim()) throw new Error();
    this.#nombre = String(valor).trim();
  }
}
~~~

## 11. Herencia y polimorfismo

Una subclase puede sobrescribir un método y responder al mismo mensaje de forma distinta.

~~~javascript
class Persona { describir() { return "Persona"; } }
class Docente extends Persona {
  describir() { return "Docente"; }
}
~~~

## 12. Composición

La composición inyecta colaboradores especializados y suele ser más flexible que una jerarquía profunda.

~~~javascript
class Carrito {
  constructor(calculadorDescuento) {
    this.calculadorDescuento = calculadorDescuento;
  }
}
~~~

## 13. Colecciones de objetos

Los métodos de arreglos encadenan consultas y transformaciones sobre entidades.

~~~javascript
const total = productos
  .filter(p => p.precio > 0)
  .map(p => p.precio)
  .reduce((suma, precio) => suma + precio, 0);
~~~

## 14. Caso complejo: carrito encapsulado

~~~javascript
class ItemCarrito {
  #cantidad;
  constructor(producto, cantidad) {
    this.producto = producto;
    this.cantidad = cantidad;
  }
  set cantidad(valor) {
    if (!Number.isInteger(valor) || valor <= 0) throw new RangeError();
    this.#cantidad = valor;
  }
  get cantidad() { return this.#cantidad; }
  get subtotal() { return this.producto.precio * this.#cantidad; }
}

class Carrito {
  #items = [];
  agregar(producto, cantidad) { this.#items.push(new ItemCarrito(producto, cantidad)); }
  get total() { return this.#items.reduce((s, i) => s + i.subtotal, 0); }
}
~~~

## Buenas prácticas

- Mantenga nombres descriptivos y responsabilidades claras.
- Valide datos en los límites del programa.
- Evite comportamientos implícitos difíciles de leer.
- Pruebe valores normales, límites y entradas inválidas.
- Comente decisiones, no instrucciones evidentes.

## Resumen

Procesar colecciones y modelar un dominio con encapsulación, polimorfismo y composición. Los ejemplos deben ejecutarse y modificarse para comprobar su comportamiento.

