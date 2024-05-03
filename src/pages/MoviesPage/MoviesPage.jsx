import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getMoviesBySearch } from '../../movies-api';
import MovieList from '../../components/MovieList/MovieList';
import MovieSearchForm from '../../components/MovieSearchForm/MovieSearchForm';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const changeQuery = (newFilter) => {
    setSearchParams({ query: newFilter });
  };

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }

    async function fetchMoviesPage() {
      try {
        setLoading(true);
        const data = await getMoviesBySearch(query);
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMoviesPage();
  }, [query, setSearchParams]);

  return (
    <>
      <MovieSearchForm value={query} onSubmit={changeQuery} />
      {loading ? <p>Loading...</p> : movies.length > 0 && <MovieList movies={movies} />}
      {error && <p>Error fetching movies. Please try again later.</p>}
    </>
  );
}
