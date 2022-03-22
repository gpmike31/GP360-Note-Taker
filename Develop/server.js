const express = require("express");
const path = require("path");
const notes = require("./db/db.json");

const PORT = process.env.PORT || 3001;

const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// res.json() allows us to return JSON instead of a buffer, string, or static file
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  // Inform the client that their POST request was received
  res.json(`${req.method} request received to add a new note`);

  // Log our request to the terminal
  console.info(`${req.method} request received to add a new note`);
});


app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
