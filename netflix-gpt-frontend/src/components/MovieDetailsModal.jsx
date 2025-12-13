import React, { useEffect } from "react";
import { LANGUAGE_MAP } from "../utils/constants";

const TMDB_IMG_BASE = "https://image.tmdb.org/t/p/w500";
const MovieDetailsModal = ({ movie, onClose }) => {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!movie) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onMouseDown={(e) => {
        // close when clicking the backdrop (but not when clicking inside the modal)
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        // main modal container
        className="relative bg-gray-900 text-white rounded-lg shadow-xl w-full max-w-3xl"
        // limit modal height to viewport minus some spacing so it's always closable
        style={{ maxHeight: "calc(100vh - 3rem)" }}
      >
        {/* Close button (inside modal so always reachable) */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-20 bg-gray-800/60 hover:bg-gray-800 px-2 py-1 rounded-md text-lg"
        >
          ✕
        </button>

        {/* content area: two-column on md+, stacked on small screens */}
        <div className="flex flex-col md:flex-row">
          {/* Poster column */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            {movie.poster_path ? (
              <img
                src={TMDB_IMG_BASE + movie.poster_path}
                alt={movie.title ?? movie.name}
                // cap image size so it doesn't expand modal
                style={{ display: "block" }}
                className="w-46 md:w-56 object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none max-h-72"
              />
            ) : (
              <div className="w-36 md:w-56 h-40 md:h-72 bg-gray-700 flex items-center justify-center rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
                <span className="text-gray-300">No image</span>
              </div>
            )}
          </div>

          {/* Details column (scrollable if content is too tall) */}
          <div
            className="p-4 overflow-x-auto"
            // ensure this column scrolls instead of making the modal taller
            style={{ maxHeight: "calc(100vh - 6rem)" }}
          >
            <h2 className="text-lg md:text-2xl font-bold mb-2">
              {movie.title ?? movie.name}
            </h2>

            {movie.release_date && (
              <div className="text-sm text-gray-400 mb-2">
                Release: {movie.release_date}
              </div>
            )}

            <p className="text-gray-300 mb-4 text-sm md:text-base">
              {movie.overview || "No description available."}
            </p>

            <div className="text-gray-400 text-sm space-y-1">
              {movie.vote_average !== undefined && (
                <div>⭐ Rating: {movie.vote_average} / 10</div>
              )}
              {movie.popularity !== undefined && (
                <div>📈 Popularity: {Math.round(movie.popularity)}</div>
              )}
              {movie.runtime !== undefined && (
                <div>⏱ Runtime: {movie.runtime} min</div>
              )}
              {movie.original_language && (
                <div>
                  🌐 Language:{" "}
                  {LANGUAGE_MAP[movie.original_language] || "Unknown"} (
                  {movie.original_language})
                </div>
              )}
              {/* Add any other fields (genres, homepage, etc.) here */}
            </div>

            {/* optional actions */}
            <div className="mt-4 flex gap-2">
              {movie.homepage && (
                <a
                  href={movie.homepage}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm px-3 py-1 border border-gray-700 rounded hover:bg-gray-800"
                >
                  Visit site
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsModal;
