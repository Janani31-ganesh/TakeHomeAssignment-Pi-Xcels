import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("/api/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  const handleMovieClick = (id) => {
    fetch(`/api/movies/${id}`)
      .then((res) => res.json())
      .then((data) => setSelectedMovie(data))
      .catch((err) => console.error("Error fetching details:", err));
  };

  if (selectedMovie) {
    const releaseDate = new Date(selectedMovie.release_date).toLocaleDateString();
    return (
      <div className="detail-view">
        <button onClick={() => setSelectedMovie(null)}>← Back</button>
        <h1>{selectedMovie.title}</h1>
        <p><strong>Tagline:</strong> {selectedMovie.tagline}</p>
        <p><strong>Rating:</strong> {selectedMovie.vote_average}</p>
        <p><strong>Release Date:</strong> {releaseDate}</p>
        <p><strong>Runtime:</strong> {selectedMovie.runtime} minutes</p>
        <p><strong>Overview:</strong> {selectedMovie.overview}</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="movie-card"
          onClick={() => handleMovieClick(movie.id)}
        >
          <h2>{movie.title}</h2>
          <p>{movie.tagline}</p>
          <span>⭐ {movie.vote_average}</span>
        </div>
      ))}
    </div>
  );
}

export default App;