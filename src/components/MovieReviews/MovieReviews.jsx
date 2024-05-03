import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewsById } from "../../movies-api";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovieReviews() {
      try {
        setLoading(true);
        const data = await getReviewsById(movieId);
        setReviews(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovieReviews();
  }, [movieId]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error...</p>}

      {reviews && reviews.results.length > 0 ? (
        <ul className={css.listReviews}>
          {reviews.results.map((item) => (
            <li className={css.itemReviews} key={item.id}>
              <p ><span className={css.spanReviews}>Author:</span> {item.author}</p>
              <p className={css.text}>{item.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.textNoReviews}>No reviews available</p>
      )}
    </>
  );
}
