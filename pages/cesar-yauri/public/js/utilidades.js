// Revisa que los textos tengan un tamaño correcto
export function texto(valor, campo, minimo = 2, maximo = 100) {
    const resultado = String(valor ?? "").trim();
    if (resultado.length < minimo || resultado.length > maximo) {
        throw new Error(`${campo}: Use entre ${minimo} y ${maximo} caracteres.`);
    }
    return resultado;
}

// Revisa que los números de cantidad o frecuencia sean enteros correctos
export function entero(valor, campo, minimo, maximo) {
    const cadena = String(valor ?? "").trim();
    const numero = Number(cadena);
    if (!/^\d+$/.test(cadena) || !Number.isSafeInteger(numero) || numero < minimo || numero > maximo) {
        throw new Error(`${campo}: Use un número entero entre ${minimo} y ${maximo}.`);
    }
    return numero;
}

// Convierte los precios a centavos enteros (Ej: S/. 10.50 pasa a 1050) para evitar errores con decimales
export function centavos(valor, campo, minimo = 0) {
    const cadena = String(valor ?? "").trim();
    if (!/^\d+(\.\d{1,2})?$/.test(cadena)) {
        throw new Error(`${campo}: Ingrese un precio válido con hasta dos decimales.`);
    }
    const [soles, decimales = ""] = cadena.split(".");
    const resultado = Number(soles) * 100 + Number(decimales.padEnd(2, "0"));
    return resultado;
}

// Toma los centavos de la memoria y los vuelve a mostrar bonitos como dinero (S/.) en la pantalla
export function moneda(valorCentavos) {
    return new Intl.NumberFormat("es-PE", {
        style: "currency", currency: "PEN"
    }).format(valorCentavos / 100);
}
