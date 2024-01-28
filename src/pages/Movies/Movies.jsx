import React, { useEffect, useState } from 'react';
import { fetchSearchMovie } from 'service/api';
import Loader from 'components/Loader/Loader';
import MoviesList from 'components/MoviesList/MoviesList';
import SearchMovie from 'components/SearchMovie/SearchMovie';
import { useSearchParams } from 'react-router-dom';
import css from './Movies.module.css';

const Movies = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [noMovies, setNoMovies] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (query === '') {
      return;
    }

    const fetchMovieSearch = () => {
      setLoading(true);
      fetchSearchMovie(query)
        .then(films => {
          setMovies(films);
          setNoMovies(films.length === 0);
        })
        .catch(error => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    if (query) {
      fetchMovieSearch();
    }
  }, [query]);

  const handleSubmit = value => {
    setSearchParams({ query: value });
  };

  return (
    <div>
      <SearchMovie onSubmit={handleSubmit} />
      {error && <p>{error}</p>}
      {loading && <Loader />}
      {noMovies && (
        <p className={css.text}>
          There is no movies with this request. Please, try again
        </p>
      )}
      <MoviesList movies={movies} />
    </div>
  );
};

export default Movies;
