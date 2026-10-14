import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, relative, extname, sep } from 'node:path';

const raiz = fileURLToPath(new URL('../../', import.meta.url));
const tipos = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8'
};

export async function servirArchivo(ruta, solicitud, respuesta) {
    let rutaDecodificada;
    try { rutaDecodificada = decodeURIComponent(ruta); }
    catch {
        respuesta.writeHead(400);
        respuesta.end('Ruta inválida.');
        return;
    }
    const archivo = resolve(raiz, `.${rutaDecodificada}`);
    const ubicacion = relative(raiz, archivo);
    const permitido = ubicacion === 'index.html' ||
        ubicacion.startsWith(`js${sep}`) || ubicacion.startsWith(`css${sep}`);
    if (!permitido || !tipos[extname(archivo)]) {
        respuesta.writeHead(404);
        respuesta.end('Archivo no encontrado.');
        return;
    }
    try {
        const contenido = await readFile(archivo);
        respuesta.writeHead(200, {
            'Content-Type': tipos[extname(archivo)],
            'X-Content-Type-Options': 'nosniff'
        });
        respuesta.end(solicitud.method === 'HEAD' ? undefined : contenido);
    } catch (error) {
        if (!['ENOENT', 'EISDIR', 'ENOTDIR'].includes(error.code)) throw error;
        respuesta.writeHead(404);
        respuesta.end('Archivo no encontrado.');
    }
}
