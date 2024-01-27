import React, { useEffect, useState } from 'react';
import { fetchTrending } from 'service/api';
import Loader from 'components/Loader/Loader';
import MoviesList from 'components/MoviesList/MoviesList';
import css from './homePage.module.css';

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = () => {
      setLoading(true);
      fetchTrending()
        .then(films => {
          setMovies(films);
        })
        .catch(error => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchTrendingMovies();
  }, []);

  return (
    <div className={css.container}>
      {error && <p>{error}</p>}
      {loading && <Loader />}
      <h1 className={css.title}>Tranding today</h1>
      <MoviesList movies={movies} />
    </div>
  );
};

export default HomePage;
