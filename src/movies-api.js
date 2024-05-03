import axios from 'axios';

const apiToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTAzZDBmYzA1NThjNTEyYmI5MjQwZTE0MTAzZGE0NiIsInN1YiI6IjY2Mjc3NWZhY2I2ZGI1MDE2M2FmOTE0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6IiLU4H7aKc-COxZsmwXNxIT6GQfi45XPSUBziM603c";

const apiKey = '46593013ac7f9dfdde2938bab4d5bba8';
axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${apiToken}`;
  return config;
});

export const getTrendingMovies = async () => {
  const response = await axios.get("/trending/movie/day?language=en-US");
  return response.data;
};

export const gethMovieDetailsById = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}`, {
    params: {
      api_key: apiKey,
      language: "en-US",
    },
  });

  return response.data;
};


export const getCastById = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/credits`, {
    params: {
      api_key: apiKey,
      language: "en-US",
    },
  });
  return response.data;
};

export const getReviewsById = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/reviews`, {
    params: {
      api_key: apiKey,
      language: "en-US",
    },
  });
  return response.data;
};

export const getMoviesBySearch = async (searchQuery) => {
  const response = await axios.get("/search/movie", {
    params: {
      // api_key: apiKey,
      query: searchQuery,
      language: "en-US",
    },
  });
  return response.data.results;
};
