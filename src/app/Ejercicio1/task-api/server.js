const express = require('express');
const cors = require('cors');
const app = express();

// Allow requests from localhost:3001
app.use(cors({
  origin: 'http://localhost:3001', // or '*' to allow all origins
  methods: ['GET', 'POST'], // specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'] // specify allowed headers
}));

// Your other routes and middleware
app.get('/api/tasks', (req, res) => {
  // Your logic to fetch tasks
  res.json([...]);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});