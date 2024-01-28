import { Link, useLocation } from 'react-router-dom';
import css from './movieList.module.css';

const MoviesList = ({ movies }) => {
  const location = useLocation();
  const elements = movies.map(({ id, title }) => (
    <li className={css.list_item} key={id}>
      <Link className={css.link} to={`/movie/${id}`} state={{ from: location }}>
        {title}
      </Link>
    </li>
  ));

  return <ul className={css.list}>{elements}</ul>;
};

export default MoviesList;
