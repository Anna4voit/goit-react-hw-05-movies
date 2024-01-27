import React, { useEffect, useState } from 'react';
import {
  useParams,
  Outlet,
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import { fetchMovieDetails } from 'service/api';

const MovieDetails = () => {
  const { movieId } = useParams();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);

  const from = location.state?.from || '/';
  const navigate = useNavigate();

  const goBack = () => navigate(from);

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

  // if (!movieDetails) {
  //   return;
  // }
  const { title, overview, release_date, popularity, genres, poster_path } =
    movieDetails || {};

  const defaultImg =
    'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';

  return (
    <>
      {error && <p>{error}</p>}
      {loading && <Loader />}
      <button type="button" onClick={goBack}>
        Go to back
      </button>
      {movieDetails && (
        <div>
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
            <ul>
              {genres.map(genre => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {/* <hr /> */}
      <div>
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </>
  );
};

export default MovieDetails;
