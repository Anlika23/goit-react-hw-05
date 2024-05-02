import { Suspense, useEffect, useState, useRef } from "react";
import { Outlet, useParams, Link, useLocation } from "react-router-dom";
import { gethMovieDetailsById } from "../../movies-api";
import MovieCard from "../../components/MovieCard/MovieCard";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movie, setMovie] = useState(null);

  const location = useLocation();
  const backLinkURLRef = useRef(location.state ?? "/movies");

  useEffect(() => {
    async function fetchMovieInfo() {
      try {
        setIsLoading(true);
        const data = await gethMovieDetailsById(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieInfo();
  }, [movieId]);

  return (
      <div>
        
        <Link className={css.btnGoBack} to={backLinkURLRef.current}>
          Go back
        </Link>

        {isLoading && <p>Loading...</p>}
        {error && <p>Error...</p>}

        {movie && <MovieCard movie={movie} />}

        <hr />

        <div>
          <h2 className={css.title}>Additional Information</h2>
          <Link to="cast" className={css.linkCast}>Cast</Link>
          <Link to="reviews" className={css.linkReview}>Reviews</Link>
        
          <Suspense fallback={<p>Loading additional information...</p>}>
          <Outlet />
          </Suspense>
        </div>
    </div>
  );
}
