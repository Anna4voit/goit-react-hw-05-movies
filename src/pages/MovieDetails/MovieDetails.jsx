import React, { useEffect, useState, useRef } from 'react';
import {
  useParams,
  Outlet,
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import { fetchMovieDetails } from 'service/api';
import css from './MovieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);

  const navigate = useNavigate();
  const goBack = () => navigate(backLinkRef.current);

  useEffect(() => {
    if (!movieId) return;
    const fetchMovieDetailsId = () => {
      setLoading(true);
      fetchMovieDetails(movieId)
        .then(data => {
          setMovieDetails(data);
        })
        .catch(error => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchMovieDetailsId();
  }, [movieId]);

  const { title, overview, release_date, popularity, genres, poster_path } =
    movieDetails || {};

  const defaultImg =
    'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';

  return (
    <div className={css.container}>
      {error && <p>{error}</p>}
      {loading && <Loader />}
      {/* <Link to={backLinkRef.current}>Go to back</Link> */}

      <button className={css.button} type="button" onClick={goBack}>
        Go to back
      </button>
      {movieDetails && (
        <div className={css.box_movie}>
          <img
            width="300px"
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : defaultImg
            }
            alt="poster"
          />
          <div>
            <h1>
              {title} ({release_date.slice(0, 4)})
            </h1>
            <p>User score: {popularity}</p>
            <h2>Overview</h2>
            <p>{overview}</p>
            <h2>Genres</h2>
            <ul className={css.genres_list}>
              {genres.map(genre => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div>
        <h3>Additional information</h3>
        <ul className={css.box_details}>
          <li>
            <Link className={css.link} to="cast">
              Cast
            </Link>
          </li>
          <li>
            <Link className={css.link} to="reviews">
              Reviews
            </Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </div>
  );
};

export default MovieDetails;
