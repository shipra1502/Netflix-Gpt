import React, { useState } from "react";
import MovieCard from "./MovieCard";
import MovieDetailsModal from "./MovieDetailsModal";

const MovieList = ({ title, movies }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  if (!movies || movies.length === 0) return null;

  return (
    <div className="px-6">
      <h1 className="text-lg md:text-3xl py-2 text-white">{title}</h1>
      <div
        className="
    flex overflow-x-auto
    touch-pan-x touch-pan-y
    md:touch-auto
  "
      >
        <div className="flex">
          {movies?.map((movie) => {
            return (
              <MovieCard
                key={movie.id}
                posterPath={movie.poster_path}
                onClick={() => setSelectedMovie(movie)}
              />
            );
          })}
        </div>
      </div>
      {/* Modal appears only when movie selected */}
      <MovieDetailsModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
};

export default MovieList;
