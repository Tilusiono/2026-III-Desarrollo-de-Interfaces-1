const express = require('express');
const path = require('node:path');
const app = express();
const PORT = process.env.PORT || 3000;




app.use('/assets/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')));
app.use('/assets/bootstrap-icons', express.static(path.join(__dirname, 'node_modules', 'bootstrap-icons', 'font')));

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

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

app.listen(PORT, ()=>{
     console.log(`Abre http://localhost:${PORT}`);
});