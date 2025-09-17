const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());

const moviesFile = path.join(__dirname, "movies_metadata.json");

// Helper to load movies
function loadMovies() {
  const data = fs.readFileSync(moviesFile, "utf-8");
  return JSON.parse(data);
}

// List all movies
app.get("/api/movies", (req, res) => {
  try {
    const movies = loadMovies();
    const movieList = movies.map((m) => ({
      id: m.id,
      title: m.title,
      tagline: m.tagline,
      vote_average: m.vote_average,
    }));
    res.json(movieList);
  } catch (err) {
    res.status(500).json({ error: "Failed to load movies" });
  }
});

// Get movie by ID
app.get("/api/movies/:id", (req, res) => {
  try {
    const movies = loadMovies();
    const movie = movies.find((m) => String(m.id) === req.params.id);
    if (!movie) return res.status(404).json({ error: "Movie not found" });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: "Failed to load movie details" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
