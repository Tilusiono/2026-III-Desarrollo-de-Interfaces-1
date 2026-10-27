import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 5040;

// 1. Descomentar Bootstrap para que cargue el CSS del formulario
app.use('/assets/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')));
app.use('/assets/bootstrap-icons', express.static(path.join(__dirname, 'node_modules', 'bootstrap-icons', 'font')));

// 2. Carpeta pública
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// 3. Ruta solicitada por el ejercicio / evaluación
app.get('/ventas', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Tus rutas anteriores (se mantienen)
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/inicio', (req, res) => {
  res.sendFile(path.join(publicPath, 'pages/inicio.html'));
});

app.get('/tema1', (req, res) => {
  res.sendFile(path.join(publicPath, 'pages/tema1.html'));
});

app.get('/tema2', (req, res) => {
  res.sendFile(path.join(publicPath, 'pages/tema2.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor activo en: http://localhost:${PORT}/ventas`);
});