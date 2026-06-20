// server.js
// The WhoDis backend: a small Express server that saves tickets to Postgres and lists them.

const express = require('express');
const { Pool } = require('pg');

// --- Database connection ---
// A Pool manages a set of reusable connections to Postgres.
// These values match the Postgres container from earlier.
// host is "db", the name of the database service we'll define in docker-compose next.
const pool = new Pool({
  host: 'db',
  port: 5432,
  user: 'postgres',
  password: 'whodis',
  database: 'whodis',
});

// --- App setup ---
const app = express();
app.use(express.json()); // parse incoming JSON bodies into req.body

// --- Routes ---

// Save a new ticket. Expects JSON like: { "body": "I was charged twice" }
app.post('/tickets', async (req, res) => {
  const { body } = req.body;

  if (!body) {
    return res.status(400).json({ error: 'body is required' });
  }

  // The classifier is hardcoded for now. Real classification comes later.
  const category = 'unsorted';
  const priority = 'normal';
  const confidence = 0.0;

  const result = await pool.query(
    'INSERT INTO tickets (body, category, priority, confidence) VALUES ($1, $2, $3, $4) RETURNING *',
    [body, category, priority, confidence]
  );

  res.status(201).json(result.rows[0]);
});

// List all tickets, newest first.
app.get('/tickets', async (req, res) => {
  const result = await pool.query('SELECT * FROM tickets ORDER BY created_at DESC');
  res.json(result.rows);
});

// --- Start the server ---
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});