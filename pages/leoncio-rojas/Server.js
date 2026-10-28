import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5056;

// Servir Bootstrap desde node_modules/bootstrap/dist en la ruta /assets/bootstrap
app.use('/assets/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')));

// Servir archivos estáticos desde public/
app.use(express.static(path.join(__dirname, 'public')));

// Ruta GET /ventas que sirve public/index.html
app.get('/ventas', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta raíz (/) para compatibilidad directa con el navegador/iframe
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado y escuchando en el puerto ${PORT}`);
  console.log(`Accede a la aplicación en: http://localhost:${PORT}/ventas`);
});
