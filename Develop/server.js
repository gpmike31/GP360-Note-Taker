const express = require("express");
const path = require("path");
const Notes = require("./db/db.json");

const PORT = 3001;

const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "notes.html"));
});

// res.json() allows us to return JSON instead of a buffer, string, or static file
app.get("/api/notes", (req, res) => {
  res.json(Notes);
});

app.post("/api/notes", (req, res) => {
  // Inform the client that their POST request was received
  res.json(`${req.method} request received to add a new note`);

  // Log our request to the terminal
  console.info(`${req.method} request received to add a new note`);
});


app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
