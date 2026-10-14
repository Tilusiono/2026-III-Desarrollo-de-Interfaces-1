import { servirArchivo } from '../utilidades/servirArchivo.js';

// Rutas HTTP propias del formulario. El servidor principal solo las delega.
export async function rutasFormulario(solicitud, respuesta) {
    const ruta = new URL(solicitud.url, 'http://localhost').pathname;
    let archivo;

    if (ruta === '/' || ruta === '/formulario') {
        archivo = '/index.html';
    } else if (ruta === '/formulario/') {
        respuesta.writeHead(302, { Location: '/formulario' });
        respuesta.end();
        return true;
    } else if (ruta.startsWith('/js/') || ruta.startsWith('/css/')) {
        archivo = ruta;
    } else {
        return false;
    }

    if (!['GET', 'HEAD'].includes(solicitud.method)) {
        respuesta.writeHead(405, { Allow: 'GET, HEAD' });
        respuesta.end('Método no permitido.');
        return true;
    }

    await servirArchivo(archivo, solicitud, respuesta);
    return true;
}
