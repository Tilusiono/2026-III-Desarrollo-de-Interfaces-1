export function moneda(valorCentavos) {
  return (valorCentavos / 100).toLocaleString("es-PE", {
    style: "currency",
    currency: "PEN"
  });
}

export function centavos(importe) {
  return Math.round(Number(importe || 0) * 100);
}

export function entero(valor) {
  return parseInt(valor || 0, 10);
}