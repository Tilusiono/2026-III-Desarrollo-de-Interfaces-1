/**
 * Utilidades matemáticas y de formateo de moneda para el sistema de ventas.
 */

/**
 * Convierte un importe en soles (decimal) a centavos enteros para evitar errores de precisión flotante.
 * @param {number|string} importe 
 * @returns {number}
 */
export function centavos(importe) {
  return Math.round(Number(importe || 0) * 100);
}

/**
 * Convierte un valor a número entero.
 * @param {number|string} valor 
 * @returns {number}
 */
export function entero(valor) {
  return parseInt(valor || 0, 10);
}

/**
 * Convierte un valor en centavos a formato de moneda peruana (PEN S/).
 * @param {number} valorCentavos 
 * @returns {string}
 */
export function moneda(valorCentavos) {
  const soles = Number(valorCentavos || 0) / 100;
  return `S/ ${soles.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
