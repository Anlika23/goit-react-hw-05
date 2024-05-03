import { useState } from 'react';
import { CgSearch } from "react-icons/cg";
import css from './MovieSearchForm.module.css';

export default function MovieSearchForm({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      alert("Please enter text to search");
      return;
    }
    onSubmit(query.trim());
    setQuery('');
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />
      <button className={css.btnSearch} type="submit">
        <CgSearch />Search
      </button>
    </form>
  );
}
