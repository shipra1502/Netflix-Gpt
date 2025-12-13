import { useEffect, useState } from "react";
import { API_OPTIONS, TMDB_MOVIE_DETAILS_URL } from "../utils/constants";

const useMovieDetails = (movieId) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const controller = new AbortController();

    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = TMDB_MOVIE_DETAILS_URL(movieId);
        const res = await fetch(url, {
          ...API_OPTIONS,
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch details: ${res.status}`);
        }

        const data = await res.json();
        setDetails(data);
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();

    return () => controller.abort();
  }, [movieId]);

  return { details, loading, error };
};

export default useMovieDetails;
