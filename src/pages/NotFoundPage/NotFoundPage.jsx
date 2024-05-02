
import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={css.containerNotFoundPage }>
      <h1 className={css.title}>404 - Page Not Found</h1>
      <p className={css.text}>The page you are looking for does not exist.</p>
      <Link to="/" className={css.linkGoBack}>Go back to Home</Link>
    </div>
  );
}
