import css from './MovieCard.module.css';

export default function MovieCard({ movie }) {
  const defaultImg = "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  const getYear = () => (movie && movie.release_date ? new Date(movie.release_date).getFullYear() : '');

  const userScorePercentage = movie ? Math.round((movie.vote_average / 10) * 100) : 'Unknown';

  return (
    <div className={css.details}>
      {movie && (
        <>
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : defaultImg}
            alt={movie.title || ''}
            className={css.imgDetalis} 
          />
          <div>
            <h2 className={css.title}>{`${movie.title} (${getYear()})`}</h2>
            <p className={css.text}>User Score: {userScorePercentage}% </p>
            <h3 className={css.overview}>Overview</h3>
            <p className={css.text}>{movie.overview}</p>
          </div>
        </>
      )}
    </div>
  );
}
