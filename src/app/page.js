'use client';
import { useEffect, useState } from 'react';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'incomplete'

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/tasks'); // Cambiar la URL
        const data = await response.json();
        console.log('Tareas obtenidas:', data); // Agregar log para verificar datos
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!taskTitle.trim()) return;

    const newTask = { title: taskTitle, completed: false };

    try {
      const response = await fetch('http://localhost:3000/api/tasks', { // Cambiar la URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        setTaskTitle('');
        const updatedTasks = await response.json();
        setTasks(updatedTasks);
      } else {
        console.error('Error adding task');
      }
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  const handleDelete = async (taskId) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta tarea?')) return;

    try {
      const response = await fetch(`http://localhost:3000/api/tasks?id=${taskId}`, { method: 'DELETE' }); // Cambiar la URL

      if (response.ok) {
        const updatedTasks = await response.json();
        setTasks(updatedTasks);
      } else {
        console.error('Error deleting task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleToggleCompletion = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/tasks?id=${taskId}`, { method: 'PUT' }); // Cambiar la URL

      if (response.ok) {
        const updatedTasks = await response.json();
        setTasks(updatedTasks);
      } else {
        console.error('Error updating task');
      }
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <div>
      <h1>Lista de Tareas</h1>
      <div>
        <button onClick={() => setFilter('all')}>Todas</button>
        <button onClick={() => setFilter('completed')}>Completadas</button>
        <button onClick={() => setFilter('incomplete')}>Incompletas</button>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            {task.completed ? <s>{task.title}</s> : task.title}
            <button onClick={() => handleToggleCompletion(task.id)}>
              {task.completed ? 'Marcar como incompleta' : 'Marcar como completada'}
            </button>
            <button onClick={() => handleDelete(task.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Añadir una nueva tarea"
        />
        <button type="submit">Añadir Tarea</button>
      </form>
    </div>
  );
};

export default TaskPage;