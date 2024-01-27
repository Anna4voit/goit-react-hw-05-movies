import { Link } from 'react-router-dom';
import css from './movieList.module.css';

const MoviesList = ({ movies }) => {
  const elements = movies.map(({ id, title }) => (
    <li className={css.list_item} key={id}>
      <Link className={css.link} to={`/movie/${id}`}>
        {title}
      </Link>
    </li>
  ));

  return <ul className={css.list}>{elements}</ul>;
};

export default MoviesList;
