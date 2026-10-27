# Ventas de celulares — Fase 1 por hitos para clase

## Alcance de esta entrega

Construiremos un formulario con **Express, Bootstrap y JavaScript**. El trabajo avanzará en este orden: configurar, diseñar, dar funcionalidad al formulario, transformar la solución a POO y guardar las ventas en un arreglo del navegador.

**Express se usa desde el primer hito** para iniciar el servidor y servir HTML, CSS, JavaScript y Bootstrap. Las ventas se calculan y guardan directamente en JavaScript en el navegador. El arreglo se pierde al recargar. No se usa localStorage, archivos JSON, CSV ni base de datos.

**La API y la migración del arreglo al servidor pertenecen a una segunda fase.** Esta guía termina al completar el arreglo en el navegador. La ruta `/ventas` devuelve la página HTML; no es una API de ventas.

Cada hito deja un resultado que se puede ejecutar y revisar. No reemplaces todos los archivos al principio: avanza solo cuando hayas comprobado el hito anterior. El código de cada archivo indicado es completo; cuando diga “Reemplazar”, borra su contenido anterior y pega el nuevo.

## Mapa de hitos

| Hito | Trabajo de la clase | Evidencia para revisar |
| --- | --- | --- |
| 1 | Configuración con Express y Bootstrap | `/ventas` muestra el mensaje de inicio con estilos |
| 2 | Diseño del formulario | Campos comunes y estructura de los cuatro operadores |
| 3 | Funcionalidad sin clases | El selector cambia dos campos; el botón calcula una venta |
| 4 | POO | Misma funcionalidad mediante una clase base y cuatro subclases |
| 5 | Guardado en arreglo | Registrar, listar, eliminar y resumir varias ventas |

## Reglas del ejercicio

Los datos comerciales son inventados para la práctica. El precio es el importe por equipo; no se agregan impuestos ni mensualidades.

| Operador | Variable 1 | Variable 2 | Efecto |
| --- | --- | --- | --- |
| Movistar | Nombre del plan | Descuento fijo en soles | Resta una vez el descuento a la venta |
| Claro | Nombre del paquete | Porcentaje de descuento | Resta el porcentaje del subtotal |
| Entel | Meses de garantía | Costo de garantía | Suma una vez el costo a la venta |
| Bitel | GB de bono por equipo | Costo de activación | Suma una vez el costo a la venta |

El nombre, meses o GB se validan y se muestran en el detalle. La segunda variable de cada operador modifica el total. “Dos variables” significa dos campos específicos, además de los campos comunes de toda venta.

`subtotal = precio unitario × cantidad`; `total = subtotal + ajuste`. Un descuento es un ajuste negativo. Un cargo es un ajuste positivo. Los cálculos se harán en centavos enteros; el porcentaje de Claro se redondeará al centavo más cercano.

## Cómo usar el ZIP de apoyo

Contiene `hito-01` a `hito-05`, cada uno con el código completo hasta ese momento. Sirve para contrastar el avance o recuperar una clase. Para desarrollar paso a paso utiliza una sola carpeta `ventas-celulares` y sigue la guía. Si ejecutas un hito del ZIP, abre esa carpeta y ejecuta `npm install` y luego `npm start`, por separado. Detén el anterior con Ctrl+C antes de abrir otro: todos usan el puerto 18181.

## Hito 1 — Configurar Express

**Objetivo:** ejecutar un servidor real con Express y abrir la página desde una ruta del servidor.

### 1.1. Preparar herramientas

Usa VS Code, Node.js con soporte de módulos ES y npm. Para la clase se recomienda Node.js 22 o superior. Abre una terminal PowerShell y ejecuta los comandos por separado.

```powershell
node --version
```

```powershell
npm --version
```

### 1.2. Crear la carpeta

Ubícate en la carpeta que contendrá el proyecto.

```powershell
New-Item -ItemType Directory -Path .\ventas-celulares
```

```powershell
Set-Location .\ventas-celulares
```

```powershell
code .
```

Si ya estás dentro de tu carpeta de trabajo, omite crear y cambiar de carpeta. Los comandos siguientes se ejecutan desde la raíz del proyecto, donde estará `package.json`.

```powershell
npm init -y
```

```powershell
New-Item -ItemType Directory -Force -Path .\public
```

### 1.3. Configurar los archivos

`"type": "module"` permite escribir `import` en `server.js`. Mantendremos esa misma sintaxis al organizar las clases del navegador.

### Reemplazar `package.json`

```json
{
  "name": "ventas-celulares-hitos",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "5.2.1",
    "bootstrap": "5.3.8"
  }
}
```

Instala las dependencias declaradas. Este paso necesita acceso al registro de npm. Bootstrap quedará instalado en `node_modules` y Express lo servirá localmente.

```powershell
npm install
```

No es necesario agregar el JavaScript de Bootstrap para los controles usados aquí: el diseño utiliza su CSS y la interacción la escribiremos nosotros.

### Crear `server.js`

```javascript
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const carpeta = path.dirname(fileURLToPath(import.meta.url));
const puerto = Number(process.env.PORT || 18181);

app.use("/assets/bootstrap", express.static(
    path.join(carpeta, "node_modules/bootstrap/dist")
));
app.use(express.static(path.join(carpeta, "public")));

app.get("/ventas", (req, res) => {
    res.sendFile(path.join(carpeta, "public/index.html"));
});

app.listen(puerto, () => {
    console.log(`Abra http://localhost:${puerto}/ventas`);
});
```

**Qué hace cada parte:**

- `express()` crea la aplicación del servidor.
- `express.static(...)` publica los archivos de una carpeta.
- `/assets/bootstrap` publica solo la carpeta de distribución de Bootstrap.
- `app.get("/ventas", ...)` devuelve el archivo HTML.
- `app.listen(...)` inicia el servidor una sola vez.

`public` es la carpeta física; no se escribe en las URLs de sus archivos. Por eso usaremos `/js/app.js`, no `/public/js/app.js`.

### Crear `public/index.html`

```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Ventas de celulares</title>
  <link rel="stylesheet" href="/assets/bootstrap/css/bootstrap.min.css">
</head>
<body class="bg-light">
  <main class="container py-5">
    <h1>Ventas de celulares</h1>
    <p class="alert alert-success">Express está funcionando.</p>
  </main>
</body>
</html>
```

### Crear `.gitignore`

```text
node_modules/
```

### 1.4. Ejecutar

```powershell
npm start
```

Abre **http://localhost:18181/ventas**. Deja la terminal abierta. Para detener el servidor usa **Ctrl+C**. Si cambias `server.js`, detén y vuelve a ejecutar `npm start`. Si cambias HTML, CSS o JavaScript del navegador, guarda y recarga la página.

### Comprobación del hito 1

- [ ] La terminal muestra la URL y permanece ejecutándose.
- [ ] La ruta `/ventas` muestra “Express está funcionando”.
- [ ] El aviso tiene color y espaciado de Bootstrap.
- [ ] http://localhost:18181/assets/bootstrap/css/bootstrap.min.css devuelve CSS.

**Pregunta de revisión:** ¿qué diferencia hay entre iniciar Express y abrir el HTML con doble clic? Aquí Express atiende la solicitud HTTP y entrega los recursos desde las rutas configuradas.

## Hito 2 — Diseñar el formulario

**Objetivo:** construir la interfaz antes de programar la interacción.

### 2.1. Crear carpetas

```powershell
New-Item -ItemType Directory -Force -Path .\public\css
```

```powershell
New-Item -ItemType Directory -Force -Path .\public\js
```

### 2.2. Construir la página

Los cuatro grupos específicos quedan preparados como `fieldset`. En este hito están ocultos y deshabilitados. El selector todavía no los mostrará: lo programaremos en el hito 3. El botón de cálculo también queda deshabilitado hasta entonces.

### Reemplazar `public/index.html`

```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Ventas de celulares</title>
  <link rel="stylesheet" href="/assets/bootstrap/css/bootstrap.min.css">
  <link rel="stylesheet" href="/css/estilos.css">
</head>
<body>
  <header class="py-4"><div class="container">
    <h1 class="h2">Ventas de celulares</h1>
    <p class="mb-0">Formulario académico: Movistar, Claro, Entel y Bitel.</p>
  </div></header>
  <main class="container py-4">
    <section class="card p-4">
      <h2 class="h4 mb-3">Datos de la venta</h2>
      <form id="formularioVenta">
        <div class="row g-3 mb-4">
        <div class="col-md-6">
          <label for="cliente" class="form-label">Cliente</label>
          <input id="cliente" name="cliente" type="text" class="form-control" minlength="3" maxlength="100" required>
        </div>
        <div class="col-md-6">
          <label for="dni" class="form-label">DNI</label>
          <input id="dni" name="dni" type="text" class="form-control" inputmode="numeric" pattern="[0-9]{8}" maxlength="8" title="Ingrese ocho dígitos" required>
        </div>
        <div class="col-md-6">
          <label for="modelo" class="form-label">Modelo del celular</label>
          <input id="modelo" name="modelo" type="text" class="form-control" minlength="2" maxlength="80" required>
        </div>
        <div class="col-md-6">
          <label for="precioUnitario" class="form-label">Precio unitario (S/)</label>
          <input id="precioUnitario" name="precioUnitario" type="number" class="form-control" min="0.01" max="999999.99" step="0.01" required>
        </div>
        <div class="col-md-6">
          <label for="cantidad" class="form-label">Cantidad</label>
          <input id="cantidad" name="cantidad" type="number" class="form-control" min="1" max="100" step="1" value="1" required>
        </div>
        <div class="col-md-6">
          <label for="operador" class="form-label">Operador móvil</label>
          <select id="operador" name="operador" class="form-select" required>
            <option value="">Seleccione un operador</option>
            <option value="movistar">Movistar</option>
            <option value="claro">Claro</option>
            <option value="entel">Entel</option>
            <option value="bitel">Bitel</option>
          </select>
        </div>
        </div>
      <fieldset data-operador="movistar" class="p-3 mb-3" hidden disabled>
        <legend>Movistar: datos específicos</legend>
        <div class="row g-3">
        <div class="col-md-6">
          <label for="planMovistar" class="form-label">Nombre del plan</label>
          <input id="planMovistar" name="planMovistar" type="text" class="form-control" minlength="2" maxlength="80" required>
        </div>
        <div class="col-md-6">
          <label for="descuentoMovistar" class="form-label">Descuento fijo por venta (S/)</label>
          <input id="descuentoMovistar" name="descuentoMovistar" type="number" class="form-control" min="0" max="999999.99" step="0.01" value="0" required>
        </div>
        </div>
      </fieldset>
      <fieldset data-operador="claro" class="p-3 mb-3" hidden disabled>
        <legend>Claro: datos específicos</legend>
        <div class="row g-3">
        <div class="col-md-6">
          <label for="paqueteClaro" class="form-label">Nombre del paquete</label>
          <input id="paqueteClaro" name="paqueteClaro" type="text" class="form-control" minlength="2" maxlength="80" required>
        </div>
        <div class="col-md-6">
          <label for="descuentoClaro" class="form-label">Descuento sobre el subtotal (%)</label>
          <input id="descuentoClaro" name="descuentoClaro" type="number" class="form-control" min="0" max="100" step="1" value="0" required>
        </div>
        </div>
      </fieldset>
      <fieldset data-operador="entel" class="p-3 mb-3" hidden disabled>
        <legend>Entel: datos específicos</legend>
        <div class="row g-3">
        <div class="col-md-6">
          <label for="mesesGarantiaEntel" class="form-label">Meses de garantía</label>
          <input id="mesesGarantiaEntel" name="mesesGarantiaEntel" type="number" class="form-control" min="1" max="36" step="1" value="12" required>
        </div>
        <div class="col-md-6">
          <label for="costoGarantiaEntel" class="form-label">Garantía por venta (S/)</label>
          <input id="costoGarantiaEntel" name="costoGarantiaEntel" type="number" class="form-control" min="0" max="999999.99" step="0.01" value="0" required>
        </div>
        </div>
      </fieldset>
      <fieldset data-operador="bitel" class="p-3 mb-3" hidden disabled>
        <legend>Bitel: datos específicos</legend>
        <div class="row g-3">
        <div class="col-md-6">
          <label for="gbBonoBitel" class="form-label">GB de bono por equipo</label>
          <input id="gbBonoBitel" name="gbBonoBitel" type="number" class="form-control" min="1" max="1000" step="1" value="10" required>
        </div>
        <div class="col-md-6">
          <label for="costoActivacionBitel" class="form-label">Activación por venta (S/)</label>
          <input id="costoActivacionBitel" name="costoActivacionBitel" type="number" class="form-control" min="0" max="999999.99" step="0.01" value="0" required>
        </div>
        </div>
      </fieldset>
        <p class="small text-secondary">Descuentos y cargos se aplican una vez por venta.</p>
        <button class="btn btn-primary" type="button" disabled>Calcular venta</button>
        <button class="btn btn-outline-secondary" type="reset">Limpiar formulario</button>
      </form>
      <p id="mensaje" class="mt-3" role="status" aria-live="polite"></p>
      <dl class="row mb-0">
        <dt class="col-6">Subtotal</dt><dd id="subtotal" class="col-6">—</dd>
        <dt class="col-6">Ajuste</dt><dd id="ajuste" class="col-6">—</dd>
        <dt class="col-6">Total</dt><dd id="total" class="col-6">—</dd>
      </dl>
    </section>
  </main>

</body>
</html>
```

### Crear `public/css/estilos.css`

```css
body { background: #f4f3f8; }
header { background: #472080; color: white; }
.card { border: 0; box-shadow: 0 3px 14px #0000000d; }
fieldset[data-operador] { border: 1px solid #d8cce9; border-radius: 8px; }
fieldset legend { font-size: 1rem; font-weight: 600; }
#total { color: #472080; font-weight: 700; }
```

### Comprobación del hito 2

- [ ] Se muestran cliente, DNI, modelo, precio, cantidad y selector.
- [ ] El selector contiene Movistar, Claro, Entel y Bitel.
- [ ] Los controles se acomodan en dos columnas en una ventana amplia y una en una ventana estrecha.
- [ ] El botón Calcular venta permanece deshabilitado.

**Revisión visual de los paneles:** para inspeccionar el diseño de uno, quita temporalmente `hidden` y `disabled` de su `fieldset`, recarga, revisa sus dos campos y después restaura ambos atributos.

**Conceptos:** `id` enlaza etiquetas y permite buscar elementos; `name` identifica los datos que leerá `FormData`; `required`, `min`, `max`, `step` y `pattern` expresan validaciones HTML. Ocultar un campo no lo deshabilita: usaremos ambas propiedades para evitar que un panel inactivo participe en el formulario.

## Hito 3 — Dar funcionalidad al formulario, todavía sin POO

**Objetivo:** seleccionar operador, mostrar sus dos campos, validar y calcular una sola venta mediante funciones. Aún no habrá arreglo ni historial.

### 3.1. Activar el botón y enlazar el módulo

En `public/index.html`, reemplaza solo el botón Calcular venta por este:

```html
<button class="btn btn-primary" type="submit">Calcular venta</button>
```

Antes de `</body>`, agrega:

```html
<script type="module" src="/js/app.js"></script>
```

El atributo `type="module"` permite usar `import` y `export`. El módulo se ejecuta después de analizar el HTML.

### 3.2. Crear utilidades

Estas funciones se reutilizarán al introducir las clases. `centavos("10.50", "Precio")` devuelve `1050`; `moneda(1050)` muestra el importe en soles. Los límites monetarios se validan en centavos.

### Crear `public/js/utilidades.js`

```javascript
export function texto(valor, campo, minimo = 2, maximo = 100) {
    const resultado = String(valor ?? "").trim();
    if (resultado.length < minimo || resultado.length > maximo) {
        throw new Error(`${campo}: use entre ${minimo} y ${maximo} caracteres.`);
    }
    return resultado;
}

export function entero(valor, campo, minimo, maximo) {
    const cadena = String(valor ?? "").trim();
    const numero = Number(cadena);
    if (!/^\d+$/.test(cadena) || !Number.isSafeInteger(numero)
        || numero < minimo || numero > maximo) {
        throw new Error(`${campo}: use un entero entre ${minimo} y ${maximo}.`);
    }
    return numero;
}

export function centavos(valor, campo, minimo = 0) {
    const cadena = String(valor ?? "").trim();
    if (!/^\d+(\.\d{1,2})?$/.test(cadena)) {
        throw new Error(`${campo}: ingrese un importe con hasta dos decimales.`);
    }
    const [soles, decimales = ""] = cadena.split(".");
    const resultado = Number(soles) * 100 + Number(decimales.padEnd(2, "0"));
    if (!Number.isSafeInteger(resultado) || resultado < minimo || resultado > 99999999) {
        throw new Error(`${campo}: importe fuera del rango permitido.`);
    }
    return resultado;
}

export function moneda(valorCentavos) {
    return new Intl.NumberFormat("es-PE", {
        style: "currency", currency: "PEN"
    }).format(valorCentavos / 100);
}
```

### Crear `public/js/calculos.js`

```javascript
import { texto, entero, centavos } from "./utilidades.js";

export function calcularVenta(datos) {
    texto(datos.cliente, "Cliente", 3);
    if (!/^\d{8}$/.test(datos.dni ?? "")) throw new Error("DNI: ingrese ocho dígitos.");
    texto(datos.modelo, "Modelo", 2, 80);
    const cantidad = entero(datos.cantidad, "Cantidad", 1, 100);
    const subtotal = centavos(datos.precioUnitario, "Precio", 1) * cantidad;
    let ajuste;

    switch (datos.operador) {
        case "movistar":
            texto(datos.planMovistar, "Plan Movistar", 2, 80);
            ajuste = -centavos(datos.descuentoMovistar, "Descuento Movistar");
            if (-ajuste > subtotal) throw new Error("El descuento supera el subtotal.");
            break;
        case "claro":
            texto(datos.paqueteClaro, "Paquete Claro", 2, 80);
            ajuste = -Math.round(subtotal * entero(datos.descuentoClaro, "Porcentaje", 0, 100) / 100);
            break;
        case "entel":
            entero(datos.mesesGarantiaEntel, "Meses de garantía", 1, 36);
            ajuste = centavos(datos.costoGarantiaEntel, "Costo de garantía");
            break;
        case "bitel":
            entero(datos.gbBonoBitel, "GB de bono", 1, 1000);
            ajuste = centavos(datos.costoActivacionBitel, "Costo de activación");
            break;
        default:
            throw new Error("Seleccione un operador válido.");
    }
    return { subtotal, ajuste, total: subtotal + ajuste };
}
```

### Crear `public/js/app.js`

```javascript
import { moneda } from "./utilidades.js";
import { calcularVenta } from "./calculos.js";

const formulario = document.querySelector("#formularioVenta");
const operador = document.querySelector("#operador");
const paneles = document.querySelectorAll("[data-operador]");
const mensaje = document.querySelector("#mensaje");

function limpiarResultado() {
    for (const id of ["subtotal", "ajuste", "total"]) {
        document.getElementById(id).textContent = "—";
    }
    mensaje.textContent = "";
}

function actualizarCampos() {
    for (const panel of paneles) {
        const activo = panel.dataset.operador === operador.value;
        panel.hidden = !activo;
        panel.disabled = !activo;
    }
    limpiarResultado();
}

function mostrarResultado(subtotal, ajuste, total) {
    document.querySelector("#subtotal").textContent = moneda(subtotal);
    document.querySelector("#ajuste").textContent = moneda(ajuste);
    document.querySelector("#total").textContent = moneda(total);
}

operador.addEventListener("change", actualizarCampos);
formulario.addEventListener("input", limpiarResultado);
formulario.addEventListener("reset", () => {
    // El evento reset ocurre antes de que los campos recuperen sus valores iniciales.
    setTimeout(actualizarCampos, 0);
});
actualizarCampos();

formulario.addEventListener("submit", evento => {
    evento.preventDefault();
    if (!formulario.reportValidity()) return;
    try {
        // Los fieldset deshabilitados no se incluyen en FormData.
        const datos = Object.fromEntries(new FormData(formulario));
        const resultado = calcularVenta(datos);
        mostrarResultado(resultado.subtotal, resultado.ajuste, resultado.total);
        mensaje.textContent = "Venta calculada correctamente.";
    } catch (error) {
        limpiarResultado();
        mensaje.textContent = error.message;
    }
});
```

### Cómo funciona

1. `change` del selector muestra y habilita únicamente el `fieldset` del operador elegido.
2. Al enviar, `preventDefault()` evita la navegación del formulario.
3. Las restricciones HTML y las funciones de validación revisan los datos.
4. `FormData` lee los controles con `name`; excluye los que estén deshabilitados.
5. `calcularVenta` utiliza `switch` para aplicar la regla del operador.
6. `textContent` muestra los resultados. No se registra ninguna venta.

Al modificar un dato se borra el resultado anterior para evitar mostrar un total que ya no corresponde. Limpiar formulario devuelve el selector a su estado inicial.

### Comprobación del hito 3

Usa cliente `Ana Torres`, DNI `01234567`, modelo `Celular de prueba`, precio `1000` y cantidad `2`. Prueba cada operador por separado:

| Operador | Datos específicos | Subtotal | Ajuste | Total esperado |
| --- | --- | --- | --- | --- |
| Movistar | Plan Aula; descuento 100 | S/ 2000.00 | −S/ 100.00 | S/ 1900.00 |
| Claro | Paquete Aula; descuento 10% | S/ 2000.00 | −S/ 200.00 | S/ 1800.00 |
| Entel | 12 meses; garantía 80 | S/ 2000.00 | +S/ 80.00 | S/ 2080.00 |
| Bitel | 20 GB; activación 15 | S/ 2000.00 | +S/ 15.00 | S/ 2015.00 |

- [ ] Cada operador muestra exactamente dos campos específicos.
- [ ] Al cambiar de operador, los otros campos dejan de ser obligatorios porque su grupo queda deshabilitado.
- [ ] El DNI conserva un cero inicial porque es texto.
- [ ] Un DNI incompleto, un precio no positivo o cantidad decimal impiden calcular.
- [ ] Movistar rechaza un descuento mayor al subtotal.
- [ ] Claro rechaza porcentajes mayores a 100.
- [ ] Limpiar borra el resultado y oculta los paneles.

**Pregunta de revisión:** ¿qué ocurriría si todos los paneles estuvieran ocultos pero continuaran habilitados y con `required`? El formulario podría quedar bloqueado por campos invisibles.

## Hito 4 — Transformar la solución a POO

**Objetivo:** conservar el comportamiento del hito 3, trasladando las reglas a objetos. Todavía calcularemos una venta sin almacenarla.

### 4.1. Crear carpeta de modelos

```powershell
New-Item -ItemType Directory -Force -Path .\public\js\modelos
```

### 4.2. Crear la clase base

`Venta` reúne los datos comunes. Los campos con `#` son privados. Los `get` permiten leer sin exponer una asignación directa. `calcularTotal()` llama a `calcularAjuste()`, cuya implementación depende de la subclase.

JavaScript no tiene la palabra `abstract` para clases. Aquí impedimos `new Venta(...)` mediante `new.target` y dejamos métodos que lanzan un error si la subclase no los implementa.

### Crear `public/js/modelos/Venta.js`

```javascript
import { texto, entero, centavos } from "../utilidades.js";

export class Venta {
    #cliente;
    #dni;
    #modelo;
    #cantidad;
    #precio;

    constructor(datos) {
        if (new.target === Venta) throw new Error("Cree una venta de un operador.");
        this.#cliente = texto(datos.cliente, "Cliente", 3);
        if (!/^\d{8}$/.test(datos.dni ?? "")) throw new Error("DNI: ingrese ocho dígitos.");
        this.#dni = datos.dni;
        this.#modelo = texto(datos.modelo, "Modelo", 2, 80);
        this.#cantidad = entero(datos.cantidad, "Cantidad", 1, 100);
        this.#precio = centavos(datos.precioUnitario, "Precio", 1);
    }

    get cliente() { return this.#cliente; }
    get dni() { return this.#dni; }
    get modelo() { return this.#modelo; }
    get cantidad() { return this.#cantidad; }
    calcularSubtotal() { return this.#cantidad * this.#precio; }
    calcularTotal() { return this.calcularSubtotal() + this.calcularAjuste(); }
    calcularAjuste() { throw new Error("Implemente el ajuste del operador."); }
    obtenerOperador() { throw new Error("Implemente el nombre del operador."); }
    obtenerDetalle() { throw new Error("Implemente los datos del operador."); }
}
```

### 4.3. Crear los cuatro tipos de venta

Cada subclase declara sus dos atributos específicos. `extends` establece la herencia; `super(datos)` inicializa los datos comunes antes de usar `this`.

### Crear `public/js/modelos/VentaMovistar.js`

```javascript
import { Venta } from "./Venta.js";
import { texto, centavos, moneda } from "../utilidades.js";

export class VentaMovistar extends Venta {
    #plan;
    #descuento;
    constructor(datos) {
        super(datos);
        this.#plan = texto(datos.planMovistar, "Plan Movistar", 2, 80);
        this.#descuento = centavos(datos.descuentoMovistar, "Descuento Movistar");
        if (this.#descuento > this.calcularSubtotal()) {
            throw new Error("El descuento supera el subtotal.");
        }
    }
    obtenerOperador() { return "Movistar"; }
    obtenerDetalle() { return `Plan: ${this.#plan}. Descuento: ${moneda(this.#descuento)}.`; }
    calcularAjuste() { return -this.#descuento; }
}
```

### Crear `public/js/modelos/VentaClaro.js`

```javascript
import { Venta } from "./Venta.js";
import { texto, entero } from "../utilidades.js";

export class VentaClaro extends Venta {
    #paquete;
    #porcentaje;
    constructor(datos) {
        super(datos);
        this.#paquete = texto(datos.paqueteClaro, "Paquete Claro", 2, 80);
        this.#porcentaje = entero(datos.descuentoClaro, "Porcentaje", 0, 100);
    }
    obtenerOperador() { return "Claro"; }
    obtenerDetalle() { return `Paquete: ${this.#paquete}. Descuento: ${this.#porcentaje}%.`; }
    calcularAjuste() { return -Math.round(this.calcularSubtotal() * this.#porcentaje / 100); }
}
```

### Crear `public/js/modelos/VentaEntel.js`

```javascript
import { Venta } from "./Venta.js";
import { entero, centavos, moneda } from "../utilidades.js";

export class VentaEntel extends Venta {
    #meses;
    #costo;
    constructor(datos) {
        super(datos);
        this.#meses = entero(datos.mesesGarantiaEntel, "Meses de garantía", 1, 36);
        this.#costo = centavos(datos.costoGarantiaEntel, "Costo de garantía");
    }
    obtenerOperador() { return "Entel"; }
    obtenerDetalle() { return `Garantía: ${this.#meses} meses. Costo: ${moneda(this.#costo)}.`; }
    calcularAjuste() { return this.#costo; }
}
```

### Crear `public/js/modelos/VentaBitel.js`

```javascript
import { Venta } from "./Venta.js";
import { entero, centavos, moneda } from "../utilidades.js";

export class VentaBitel extends Venta {
    #gb;
    #activacion;
    constructor(datos) {
        super(datos);
        this.#gb = entero(datos.gbBonoBitel, "GB de bono", 1, 1000);
        this.#activacion = centavos(datos.costoActivacionBitel, "Costo de activación");
    }
    obtenerOperador() { return "Bitel"; }
    obtenerDetalle() { return `Bono: ${this.#gb} GB por equipo. Activación: ${moneda(this.#activacion)}.`; }
    calcularAjuste() { return this.#activacion; }
}
```

### 4.4. Elegir la clase según el selector

La función fábrica concentra la selección. El formulario no necesita conocer la fórmula de cada operador: recibe una venta y llama a sus métodos comunes.

### Crear `public/js/fabrica.js`

```javascript
import { VentaMovistar } from "./modelos/VentaMovistar.js";
import { VentaClaro } from "./modelos/VentaClaro.js";
import { VentaEntel } from "./modelos/VentaEntel.js";
import { VentaBitel } from "./modelos/VentaBitel.js";

export function crearVenta(datos) {
    switch (datos.operador) {
        case "movistar": return new VentaMovistar(datos);
        case "claro": return new VentaClaro(datos);
        case "entel": return new VentaEntel(datos);
        case "bitel": return new VentaBitel(datos);
        default: throw new Error("Seleccione un operador válido.");
    }
}
```

### 4.5. Conectar la interfaz con los objetos

Reemplaza `app.js` completo. El manejo del selector permanece; la diferencia principal está en el evento `submit`, que ahora crea una instancia y consulta sus métodos.

### Reemplazar `public/js/app.js`

```javascript
import { moneda } from "./utilidades.js";
import { crearVenta } from "./fabrica.js";

const formulario = document.querySelector("#formularioVenta");
const operador = document.querySelector("#operador");
const paneles = document.querySelectorAll("[data-operador]");
const mensaje = document.querySelector("#mensaje");

function limpiarResultado() {
    for (const id of ["subtotal", "ajuste", "total"]) {
        document.getElementById(id).textContent = "—";
    }
    mensaje.textContent = "";
}

function actualizarCampos() {
    for (const panel of paneles) {
        const activo = panel.dataset.operador === operador.value;
        panel.hidden = !activo;
        panel.disabled = !activo;
    }
    limpiarResultado();
}

function mostrarResultado(subtotal, ajuste, total) {
    document.querySelector("#subtotal").textContent = moneda(subtotal);
    document.querySelector("#ajuste").textContent = moneda(ajuste);
    document.querySelector("#total").textContent = moneda(total);
}

operador.addEventListener("change", actualizarCampos);
formulario.addEventListener("input", limpiarResultado);
formulario.addEventListener("reset", () => {
    // El evento reset ocurre antes de que los campos recuperen sus valores iniciales.
    setTimeout(actualizarCampos, 0);
});
actualizarCampos();

formulario.addEventListener("submit", evento => {
    evento.preventDefault();
    if (!formulario.reportValidity()) return;
    try {
        // Los fieldset deshabilitados no se incluyen en FormData.
        const datos = Object.fromEntries(new FormData(formulario));
        const venta = crearVenta(datos);
        mostrarResultado(venta.calcularSubtotal(), venta.calcularAjuste(), venta.calcularTotal());
        mensaje.textContent = `${venta.obtenerOperador()}: ${venta.obtenerDetalle()}`;
    } catch (error) {
        limpiarResultado();
        mensaje.textContent = error.message;
    }
});
```

### 4.6. Retirar el cálculo anterior

El archivo `calculos.js` ya no se importa. Elimínalo para mantener una sola implementación de las reglas.

```powershell
Remove-Item .\public\js\calculos.js
```

`utilidades.js`, `index.html`, `estilos.css`, `server.js` y `package.json` se conservan como quedaron en el hito anterior.

### Qué conceptos aplicamos

| Concepto | Dónde aparece | Explicación para exponer |
| --- | --- | --- |
| Clase | `VentaClaro` | Define los datos y el comportamiento de las ventas Claro |
| Objeto | `new VentaClaro(datos)` | Representa una venta concreta |
| Constructor | `constructor(datos)` | Inicializa y valida un objeto |
| Encapsulamiento | `#cliente`, `#porcentaje` | Controla el acceso al estado interno |
| Herencia | `VentaClaro extends Venta` | Reutiliza los datos y métodos comunes |
| Polimorfismo | `venta.calcularAjuste()` | El mismo mensaje aplica reglas diferentes según el objeto |
| Abstracción | Contrato de métodos en `Venta` | La interfaz utiliza operaciones sin conocer sus fórmulas |
| Fábrica simple | `crearVenta(datos)` | Selecciona y crea el tipo de objeto |

Un `switch` por sí solo no es polimorfismo. Aquí el `switch` crea el objeto; las diferencias de comportamiento se encuentran en las subclases.

### Comprobación del hito 4

- [ ] Se repiten los cuatro casos del hito 3 y los totales coinciden.
- [ ] También aparece el detalle del operador: plan, paquete, meses o GB.
- [ ] Las validaciones siguen funcionando.
- [ ] En el código de envío del formulario no hay fórmulas por operador.
- [ ] En DevTools → Consola no hay errores de importación.

**Ejercicio de revisión:** explica cómo `Venta.calcularTotal()` usa la implementación de `calcularAjuste()` de `VentaClaro` al trabajar con una venta Claro. Luego cambia el descuento de 10% a 20%: para dos equipos de S/ 1000 el total debe ser S/ 1600.

## Hito 5 — Guardar las ventas en un arreglo del navegador

**Objetivo:** conservar varias instancias mientras la página esté abierta y mostrarlas en una tabla. Este es el cierre de la fase 1.

### 5.1. Crear el repositorio del arreglo

`RepositorioVentas` mantiene `#ventas = []`. Cada registro contiene un ID y el objeto de venta. `push` agrega, `findIndex` busca, `splice` elimina y `listar()` devuelve una copia del arreglo para no exponer directamente su estructura.

La copia es superficial: sus registros contienen los mismos objetos Venta. En este ejercicio sus datos no tienen setters y sus atributos son privados. El ID aumenta durante la sesión; al eliminar una venta, las otras conservan su ID.

### Crear `public/js/RepositorioVentas.js`

```javascript
import { Venta } from "./modelos/Venta.js";

export class RepositorioVentas {
    #ventas = [];
    #siguienteId = 1;

    guardar(venta) {
        if (!(venta instanceof Venta)) throw new Error("Se esperaba un objeto Venta.");
        const registro = Object.freeze({ id: this.#siguienteId++, venta });
        this.#ventas.push(registro);
        return registro;
    }

    listar() {
        return [...this.#ventas];
    }

    eliminar(id) {
        const indice = this.#ventas.findIndex(registro => registro.id === id);
        if (indice === -1) throw new Error("La venta no existe.");
        this.#ventas.splice(indice, 1);
    }
}
```

### 5.2. Agregar la tabla y cambiar el botón

Reemplaza `index.html` completo. Los campos del formulario se conservan; se añade el historial y el botón pasa a llamarse Registrar venta.

### Reemplazar `public/index.html`

```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Ventas de celulares</title>
  <link rel="stylesheet" href="/assets/bootstrap/css/bootstrap.min.css">
  <link rel="stylesheet" href="/css/estilos.css">
</head>
<body>
  <header class="py-4"><div class="container">
    <h1 class="h2">Ventas de celulares</h1>
    <p class="mb-0">Formulario académico: Movistar, Claro, Entel y Bitel.</p>
  </div></header>
  <main class="container py-4">
    <section class="card p-4">
      <h2 class="h4 mb-3">Datos de la venta</h2>
      <form id="formularioVenta">
        <div class="row g-3 mb-4">
        <div class="col-md-6">
          <label for="cliente" class="form-label">Cliente</label>
          <input id="cliente" name="cliente" type="text" class="form-control" minlength="3" maxlength="100" required>
        </div>
        <div class="col-md-6">
          <label for="dni" class="form-label">DNI</label>
          <input id="dni" name="dni" type="text" class="form-control" inputmode="numeric" pattern="[0-9]{8}" maxlength="8" title="Ingrese ocho dígitos" required>
        </div>
        <div class="col-md-6">
          <label for="modelo" class="form-label">Modelo del celular</label>
          <input id="modelo" name="modelo" type="text" class="form-control" minlength="2" maxlength="80" required>
        </div>
        <div class="col-md-6">
          <label for="precioUnitario" class="form-label">Precio unitario (S/)</label>
          <input id="precioUnitario" name="precioUnitario" type="number" class="form-control" min="0.01" max="999999.99" step="0.01" required>
        </div>
        <div class="col-md-6">
          <label for="cantidad" class="form-label">Cantidad</label>
          <input id="cantidad" name="cantidad" type="number" class="form-control" min="1" max="100" step="1" value="1" required>
        </div>
        <div class="col-md-6">
          <label for="operador" class="form-label">Operador móvil</label>
          <select id="operador" name="operador" class="form-select" required>
            <option value="">Seleccione un operador</option>
            <option value="movistar">Movistar</option>
            <option value="claro">Claro</option>
            <option value="entel">Entel</option>
            <option value="bitel">Bitel</option>
          </select>
        </div>
        </div>
      <fieldset data-operador="movistar" class="p-3 mb-3" hidden disabled>
        <legend>Movistar: datos específicos</legend>
        <div class="row g-3">
        <div class="col-md-6">
          <label for="planMovistar" class="form-label">Nombre del plan</label>
          <input id="planMovistar" name="planMovistar" type="text" class="form-control" minlength="2" maxlength="80" required>
        </div>
        <div class="col-md-6">
          <label for="descuentoMovistar" class="form-label">Descuento fijo por venta (S/)</label>
          <input id="descuentoMovistar" name="descuentoMovistar" type="number" class="form-control" min="0" max="999999.99" step="0.01" value="0" required>
        </div>
        </div>
      </fieldset>
      <fieldset data-operador="claro" class="p-3 mb-3" hidden disabled>
        <legend>Claro: datos específicos</legend>
        <div class="row g-3">
        <div class="col-md-6">
          <label for="paqueteClaro" class="form-label">Nombre del paquete</label>
          <input id="paqueteClaro" name="paqueteClaro" type="text" class="form-control" minlength="2" maxlength="80" required>
        </div>
        <div class="col-md-6">
          <label for="descuentoClaro" class="form-label">Descuento sobre el subtotal (%)</label>
          <input id="descuentoClaro" name="descuentoClaro" type="number" class="form-control" min="0" max="100" step="1" value="0" required>
        </div>
        </div>
      </fieldset>
      <fieldset data-operador="entel" class="p-3 mb-3" hidden disabled>
        <legend>Entel: datos específicos</legend>
        <div class="row g-3">
        <div class="col-md-6">
          <label for="mesesGarantiaEntel" class="form-label">Meses de garantía</label>
          <input id="mesesGarantiaEntel" name="mesesGarantiaEntel" type="number" class="form-control" min="1" max="36" step="1" value="12" required>
        </div>
        <div class="col-md-6">
          <label for="costoGarantiaEntel" class="form-label">Garantía por venta (S/)</label>
          <input id="costoGarantiaEntel" name="costoGarantiaEntel" type="number" class="form-control" min="0" max="999999.99" step="0.01" value="0" required>
        </div>
        </div>
      </fieldset>
      <fieldset data-operador="bitel" class="p-3 mb-3" hidden disabled>
        <legend>Bitel: datos específicos</legend>
        <div class="row g-3">
        <div class="col-md-6">
          <label for="gbBonoBitel" class="form-label">GB de bono por equipo</label>
          <input id="gbBonoBitel" name="gbBonoBitel" type="number" class="form-control" min="1" max="1000" step="1" value="10" required>
        </div>
        <div class="col-md-6">
          <label for="costoActivacionBitel" class="form-label">Activación por venta (S/)</label>
          <input id="costoActivacionBitel" name="costoActivacionBitel" type="number" class="form-control" min="0" max="999999.99" step="0.01" value="0" required>
        </div>
        </div>
      </fieldset>
        <p class="small text-secondary">Descuentos y cargos se aplican una vez por venta.</p>
        <button class="btn btn-primary" type="submit">Registrar venta</button>
        <button class="btn btn-outline-secondary" type="reset">Limpiar formulario</button>
      </form>
      <p id="mensaje" class="mt-3" role="status" aria-live="polite"></p>
      <dl class="row mb-0">
        <dt class="col-6">Subtotal</dt><dd id="subtotal" class="col-6">—</dd>
        <dt class="col-6">Ajuste</dt><dd id="ajuste" class="col-6">—</dd>
        <dt class="col-6">Total</dt><dd id="total" class="col-6">—</dd>
      </dl>
    </section>
    <section class="card p-4 mt-4">
      <h2 class="h4">Ventas guardadas en el arreglo</h2>
      <p id="resumen">0 ventas | 0 equipos | S/ 0.00</p>
      <div class="table-responsive">
        <table class="table table-striped align-middle">
          <caption>El historial se vacía al recargar la página.</caption>
          <thead><tr><th>N.º</th><th>Cliente</th><th>DNI</th><th>Modelo</th>
            <th>Cantidad</th><th>Operador</th><th>Detalle</th><th>Total</th><th>Acción</th>
          </tr></thead>
          <tbody id="cuerpoVentas"></tbody>
        </table>
      </div>
    </section>
  </main>
  <script type="module" src="/js/app.js"></script>
</body>
</html>
```

### 5.3. Registrar y mostrar los objetos

Reemplaza `app.js` completo. Se crea **un solo repositorio fuera del evento `submit`**. Si lo crearas dentro del evento, cada envío comenzaría con un arreglo vacío.

La tabla se construye con `createElement` y `textContent`, para mostrar los datos del usuario como texto. Al guardar o eliminar, `dibujarTabla()` vuelve a leer el arreglo y actualiza filas y resumen. Limpiar formulario no elimina ventas. El botón Eliminar actúa sobre un ID, no sobre la posición visible de una fila.

### Reemplazar `public/js/app.js`

```javascript
import { moneda } from "./utilidades.js";
import { crearVenta } from "./fabrica.js";
import { RepositorioVentas } from "./RepositorioVentas.js";

const formulario = document.querySelector("#formularioVenta");
const operador = document.querySelector("#operador");
const paneles = document.querySelectorAll("[data-operador]");
const mensaje = document.querySelector("#mensaje");

function limpiarResultado() {
    for (const id of ["subtotal", "ajuste", "total"]) {
        document.getElementById(id).textContent = "—";
    }
    mensaje.textContent = "";
}

function actualizarCampos() {
    for (const panel of paneles) {
        const activo = panel.dataset.operador === operador.value;
        panel.hidden = !activo;
        panel.disabled = !activo;
    }
    limpiarResultado();
}

function mostrarResultado(subtotal, ajuste, total) {
    document.querySelector("#subtotal").textContent = moneda(subtotal);
    document.querySelector("#ajuste").textContent = moneda(ajuste);
    document.querySelector("#total").textContent = moneda(total);
}

operador.addEventListener("change", actualizarCampos);
formulario.addEventListener("input", limpiarResultado);
formulario.addEventListener("reset", () => {
    // El evento reset ocurre antes de que los campos recuperen sus valores iniciales.
    setTimeout(actualizarCampos, 0);
});
actualizarCampos();

const repositorio = new RepositorioVentas();
const cuerpo = document.querySelector("#cuerpoVentas");

function dibujarTabla() {
    const registros = repositorio.listar();
    cuerpo.replaceChildren();
    let equipos = 0;
    let importe = 0;
    for (const { id, venta } of registros) {
        equipos += venta.cantidad;
        importe += venta.calcularTotal();
        const fila = document.createElement("tr");
        const valores = [id, venta.cliente, venta.dni, venta.modelo, venta.cantidad,
            venta.obtenerOperador(), venta.obtenerDetalle(), moneda(venta.calcularTotal())];
        for (const valor of valores) {
            const celda = document.createElement("td");
            celda.textContent = String(valor);
            fila.append(celda);
        }
        const celdaAccion = document.createElement("td");
        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "btn btn-sm btn-outline-danger";
        boton.textContent = "Eliminar";
        boton.addEventListener("click", () => {
            repositorio.eliminar(id);
            dibujarTabla();
            mensaje.textContent = `Venta ${id} eliminada.`;
        });
        celdaAccion.append(boton);
        fila.append(celdaAccion);
        cuerpo.append(fila);
    }
    if (registros.length === 0) {
        const fila = cuerpo.insertRow();
        const celda = fila.insertCell();
        celda.colSpan = 9;
        celda.textContent = "Todavía no hay ventas.";
    }
    document.querySelector("#resumen").textContent =
        `${registros.length} ventas | ${equipos} equipos | ${moneda(importe)}`;
}
dibujarTabla();

formulario.addEventListener("submit", evento => {
    evento.preventDefault();
    if (!formulario.reportValidity()) return;
    try {
        // Los fieldset deshabilitados no se incluyen en FormData.
        const datos = Object.fromEntries(new FormData(formulario));
        const venta = crearVenta(datos);
        const registro = repositorio.guardar(venta);
        mostrarResultado(venta.calcularSubtotal(), venta.calcularAjuste(), venta.calcularTotal());
        dibujarTabla();
        mensaje.textContent = `Venta ${registro.id} registrada: ${venta.obtenerOperador()}.`;
        // Se conservan los campos para poder revisar los datos de la venta registrada.
    } catch (error) {
        limpiarResultado();
        mensaje.textContent = error.message;
    }
});
```

### Flujo completo de esta fase

1. El navegador solicita `/ventas` a Express.
2. Express entrega el HTML, CSS y módulos JavaScript.
3. El selector activa dos campos específicos.
4. El formulario produce los datos con `FormData`.
5. `crearVenta(datos)` construye la subclase correspondiente.
6. La instancia valida y calcula con sus métodos.
7. El repositorio hace `push` en el arreglo del navegador.
8. La tabla lee los objetos y muestra sus resultados.

No hay petición al servidor para registrar ni eliminar: esos eventos operan sobre el arreglo de la página. Otra pestaña tiene su propia instancia y su propio arreglo.

### Comprobación del hito 5

- [ ] Al inicio aparece “Todavía no hay ventas”.
- [ ] Registra las cuatro ventas de la tabla de pruebas del hito 3.
- [ ] La tabla muestra cuatro IDs distintos y los detalles de cada operador.
- [ ] El resumen muestra **4 ventas, 8 equipos y S/ 7795.00**.
- [ ] Elimina la venta Claro: quedan **3 ventas, 6 equipos y S/ 5995.00**.
- [ ] La siguiente venta usa un ID nuevo; no reutiliza el de la eliminada.
- [ ] Limpiar formulario conserva el historial.
- [ ] Un intento con datos inválidos no agrega ninguna fila.
- [ ] Recarga la página: el historial queda vacío. Este resultado es el esperado para un arreglo en memoria del navegador.

**Pregunta de revisión:** ¿por qué el arreglo se pierde al recargar aunque Express continúe funcionando? Porque el estado pertenece a una instancia de JavaScript de esa página; recargar crea otra instancia.

## Rúbrica breve para revisar en clase

| Hito | Demostración | Pregunta clave | Puntos sugeridos |
| --- | --- | --- | --- |
| 1 | Inicia Express y abre `/ventas` | ¿Qué publica `express.static`? | 4 |
| 2 | Presenta el formulario adaptable | ¿Para qué sirven `id` y `name`? | 4 |
| 3 | Calcula con los cuatro operadores | ¿Por qué deshabilitar campos ocultos? | 4 |
| 4 | Muestra clases y totales correctos | ¿Dónde hay herencia y polimorfismo? | 4 |
| 5 | Registra y elimina varias ventas | ¿Dónde vive el arreglo y cuánto dura? | 4 |
| **Total** | | | **20** |

## Problemas frecuentes

| Problema | Revisión |
| --- | --- |
| `Cannot find package 'express'` | Ejecuta `npm install` desde la carpeta de ese hito, donde está `package.json` |
| `Cannot use import statement outside a module` en el servidor | Revisa `"type": "module"` en `package.json` |
| `Cannot use import statement outside a module` en el navegador | Revisa `<script type="module" src="/js/app.js"></script>` |
| `EADDRINUSE` | Detén el proyecto anterior con Ctrl+C o utiliza otro puerto |
| No carga Bootstrap | Comprueba su ruta `/assets/bootstrap/css/bootstrap.min.css` y la instalación |
| No carga un módulo | Comprueba mayúsculas, ruta y extensión `.js`; revisa la pestaña Red de DevTools |
| El formulario no envía | Comprueba los campos requeridos del panel activo y que los otros estén deshabilitados |
| Solo permanece una venta | Instancia el repositorio una vez fuera del evento de envío |
| La tabla se vacía al recargar | Es el comportamiento previsto de esta fase |

Para usar otro puerto temporalmente en PowerShell, detén el servidor y ejecuta por separado:

```powershell
$env:PORT = "18182"
```

```powershell
npm start
```

Abre entonces http://localhost:18182/ventas. No abras el HTML con `file://` ni uses Live Server para este proyecto; las rutas y dependencias se sirven desde Express.

## Cierre de la fase 1 y límite de la siguiente fase

Al terminar tienes Express configurado, un formulario Bootstrap, dos campos por operador, validación, clases con herencia y polimorfismo, cálculo y un repositorio que guarda en arreglo dentro del navegador.

La **fase 2 de migración** abordará por separado una API Express y el traslado del arreglo al servidor. No se implementa ni es requisito para aprobar ninguno de los cinco hitos de esta guía.

## Referencias de consulta

- [Express: servir archivos estáticos](https://expressjs.com/en/starter/static-files/).
- [Bootstrap: descarga e instalación](https://getbootstrap.com/docs/5.3/getting-started/download/).

El ejemplo fija versiones para que todos los estudiantes partan de las mismas dependencias. No depende de que sean las versiones más recientes.

