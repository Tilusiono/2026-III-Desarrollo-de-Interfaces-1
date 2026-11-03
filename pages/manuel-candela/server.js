import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const carpeta = path.dirname(fileURLToPath(import.meta.url));
const puerto = Number(process.env.PORT || 18181);

app.use("/assets/bootstrap", express.static(
    path.join(carpeta, "node_modules/bootstrap/dist")
));
app.use("/assets/bootstrap-icons", express.static(
    path.join(carpeta, "node_modules/bootstrap-icons")
));
app.use(express.static(path.join(carpeta, "public")));

app.get("/ventas", (req, res) => {
    res.sendFile(path.join(carpeta, "public/index.html"));
});

app.listen(puerto, () => {
    console.log(`Abra http://localhost:${puerto}/ventas`);
});