import { useState, useEffect } from 'react';
import { CgSearch } from "react-icons/cg";
import MovieList from '../../components/MovieList/MovieList';
import { getMoviesBySearch } from '../../movies-api'; 
import { useSearchParams } from 'react-router-dom'; // Додали імпорт для useSearchParams

import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const [query, setQuery] = useState('');
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams(); 

  useEffect(() => {
    const handleSearch = async () => {
      try {
        setLoading(true);
        const response = await getMoviesBySearch(query); 
        setSearchedMovies(response.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    if (query !== '') {
      handleSearch();
    }
  }, [query]);

  useEffect(() => {
    if (searchParams.has('query')) {
      setQuery(searchParams.get('query'));
    }
  }, [searchParams]);

  const handleSubmit = e => {
    e.preventDefault();
    setSearchParams({ query });
  };

  const handleInputChange = e => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className={css.form}
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter movie title"
          autoFocus
        />
        <button className={css.btmSearch} type="submit"><CgSearch />Search</button>
      </form>
      {loading ? ( 
        <b>Loading...</b>
      ) : (
        searchedMovies.length > 0 && <MovieList movies={searchedMovies} />
      )}
    </div>
  );
}


