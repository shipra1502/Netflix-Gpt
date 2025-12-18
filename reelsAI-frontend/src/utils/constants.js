export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_MOVIE_API_KEY}`,
  },
};

export const IMAGE_CDN_URL = "https://image.tmdb.org/t/p/w780";

export const LANGUAGE_MAP = {
  en: "English",
  hi: "Hindi",
  fr: "French",
  es: "Spanish",
  de: "German",
  ja: "Japanese",
  ko: "Korean",
  zh: "Chinese",
  ru: "Russian",
  ar: "Arabic",
};
