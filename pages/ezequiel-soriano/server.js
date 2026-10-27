import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir la carpeta public como estática principal
app.use(express.static(path.join(__dirname, 'public')));

// IMPORTANTE: Exponer también estas carpetas para que los ES Modules del navegador los lean sin 404
app.use('/factory', express.static(path.join(__dirname, 'factory')));
app.use('/repository', express.static(path.join(__dirname, 'repository')));
app.use('/models', express.static(path.join(__dirname, 'models')));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});