import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';


export default function MovieList({ movies }) {
 const location = useLocation();

  return (
    <ul>
      {movies.map(({ id, title, release_date }) => (
        <li key={id} className={css.item}>
          <Link to={`/movies/${id}`} state={{ from: location }}>
            {title} ({release_date ? release_date.slice(0, 4) : 'Unknown'})
          </Link>
        </li>
      ))}
    </ul>
  );
}
