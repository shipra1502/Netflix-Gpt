import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    gptMovies: null,
    movieNames: null,
    movieResults: null,
    loading: false,
    selectedMovie: null,
  },
  reducers: {
    toogleGptSearchView: (state, action) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMovieResults: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
    clearGptMovieResults: (state) => {
      state.movieNames = null;
      state.movieResults = null;
    },
  },
});

export const {
  toogleGptSearchView,
  addGptMovieResults,
  setLoading,
  setSelectedMovie,
  clearGptMovieResults,
} = gptSlice.actions;
export default gptSlice.reducer;
