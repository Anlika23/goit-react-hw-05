import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCastById } from "../../movies-api";
import css from './MovieCast.module.css';

const defaultImg =
  'https://png.pngitem.com/pimgs/s/508-5087257_clip-art-hd-png-download.png';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
  async function fetchMovieCast() {
    try {
      setLoading(true);
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
  fetchMovieCast();
}, [movieId]);

  return (
    <div>
      {loading ? (
        <div>Loading cast...</div>
      ) : error ? (
        <div>Error fetching cast...</div>
      ) : (
        cast && cast.cast && (
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
        )
      )}
    </div>
  );
}
