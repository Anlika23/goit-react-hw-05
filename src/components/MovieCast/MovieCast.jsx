import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCastById } from "../../movies-api";
import css from './MovieCast.module.css';

const defaultImg =
  'https://png.pngitem.com/pimgs/s/508-5087257_clip-art-hd-png-download.png';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovieCast() {
      try {
        if (movieId) {
          const data = await getCastById(movieId);
          setCast(data);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (movieId) {
      fetchMovieCast();
    }
  }, [movieId]);

  if (!movieId) {
    return <p>Loading cast...</p>;
  }

  return (
    <div>
      {loading && <p>Loading cast...</p>}
      {error && <p>Error fetching cast...</p>}

      {cast && cast.cast && cast.cast.length > 0 ? (
        <ul className={css.list}>
          {cast.cast.map((item) => (
            <li className={css.item} key={item.id}>
              <img
                className={css.imgActor}
                src={item.profile_path ? `https://image.tmdb.org/t/p/w500/${item.profile_path}` : defaultImg}
                alt={`photo ${item.name}`}
              />
              <p className={css.text}><span className={css.span}> Actor: </span> {item.name}</p>
              <p className={css.text}><span className={css.span}> Character: </span> {item.character}</p>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p className={css.textNoReviews}>No cast available</p>
      )}
    </div>
  );
}
