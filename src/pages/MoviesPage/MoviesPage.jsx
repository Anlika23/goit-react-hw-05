import { useState, useEffect } from 'react';
import { CgSearch } from "react-icons/cg";
import MovieList from '../../components/MovieList/MovieList';
import { getMoviesBySearch } from '../../movies-api'; 

import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedMovies = localStorage.getItem('searchedMovies');
    if (storedMovies) {
      setSearchedMovies(JSON.parse(storedMovies));
    }
  }, []); 

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.clear();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const saveToLocalStorage = movies => {
    localStorage.setItem('searchedMovies', JSON.stringify(movies));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await getMoviesBySearch(query); 
      setSearchedMovies(response.results);
      saveToLocalStorage(response.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = e => {
    setQuery(e.target.value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
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
};

export default MoviesPage;
