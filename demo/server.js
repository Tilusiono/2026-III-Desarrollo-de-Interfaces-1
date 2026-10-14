import { createServer } from 'node:http';
import { rutasFormulario } from './server/rutas/formulario.routes.js';

const puerto = Number(process.env.PORT ?? 4848);

const servidor = createServer(async (solicitud, respuesta) => {
    try {
        const atendida = await rutasFormulario(solicitud, respuesta);
        if (!atendida) {
            respuesta.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            respuesta.end('Ruta no encontrada.');
        }
    } catch (error) {
        console.error(error);
        if (!respuesta.headersSent) respuesta.writeHead(500);
        respuesta.end('No se pudo procesar la solicitud.');
    }
});

servidor.listen(puerto, '127.0.0.1', () => {
    console.log(`Formulario disponible en http://localhost:${puerto}/formulario`);
});
