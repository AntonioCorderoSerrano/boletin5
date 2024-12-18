const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./Ejercicio1/task-api/route');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Rutas
app.use('/api', taskRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

