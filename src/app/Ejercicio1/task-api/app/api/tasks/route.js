const express = require('express');
const router = express.Router();

// Simulación de una base de datos en memoria
let tasks = [
  { id: 1, title: 'Primera tarea', completed: false },
  { id: 2, title: 'Segunda tarea', completed: true },
];

// Endpoint para obtener todas las tareas
router.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Endpoint para añadir una nueva tarea
router.post('/tasks', (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'El título es obligatorio' });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(tasks);
});

// Endpoint para actualizar el estado de una tarea
router.put('/tasks', (req, res) => {
  const taskId = parseInt(req.query.id, 10);

  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  task.completed = !task.completed;
  res.json(tasks);
});

// Endpoint para eliminar una tarea por su ID
router.delete('/tasks', (req, res) => {
  const taskId = parseInt(req.query.id, 10);

  const taskIndex = tasks.findIndex((t) => t.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  tasks.splice(taskIndex, 1);
  res.json(tasks);
});


// Exportar las rutas
module.exports = router;