export function moneda(cents) {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2
  }).format(cents / 100);
}

export function convertirCentavos(valor, nombre) {
  const numero = Number(valor);
  if (!Number.isFinite(numero) || numero < 0) {
    throw new Error(`${nombre} debe ser un número válido.`);
  }
  return Math.round(numero * 100);
}

export function convertirEntero(valor, nombre, minimo, maximo) {
  const numero = Number(valor);
  if (!Number.isInteger(numero) || numero < minimo || numero > maximo) {
    throw new Error(`${nombre} debe estar entre ${minimo} y ${maximo}.`);
  }
  return numero;
}
