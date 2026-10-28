import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 5056;

// Servir Bootstrap desde node_modules
app.use(
  "/assets/bootstrap",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist"))
);

// Servir la carpeta pública
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

// Ruta principal para ventas
app.get("/ventas", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// Redirección de raíz
app.get("/", (req, res) => {
  res.redirect("/ventas");
});

app.listen(PORT, () => {
  console.log(`Servidor activo en: http://localhost:${PORT}/ventas`);
});