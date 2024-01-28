import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './SearchMovie.module.css';

const SearchMovie = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = event => {
    setQuery(event.currentTarget.value.trim().toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(query);
    setQuery('');
  };
  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        onChange={handleChange}
        type="text"
        name="query"
        value={query}
        autoFocus
        placeholder="Search movie"
      ></input>
      <button className={css.button} type="submit">
        Search
      </button>
    </form>
  );
};

SearchMovie.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchMovie;
