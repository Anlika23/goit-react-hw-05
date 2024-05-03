import  { useState, useEffect } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { getTrendingMovies } from '../../movies-api'; 

import css from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMoviesData = async () => {
      setLoading(true);
      try {
        const trendingMoviesData = await getTrendingMovies(); 
        setMovies(trendingMoviesData.results);
      } catch (error) {
    
        setError('Error fetching trending movies');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMoviesData();
  }, []);

  return (
    <div>
      <h1 className={css.title}>Trending today</h1>
      {loading ? (
        <b>Loading...</b>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <MovieList movies={movies} />
      )}
    </div>
  );
}
