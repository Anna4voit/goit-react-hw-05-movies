import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import { fetchCast } from 'service/api';
import css from './cast.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    if (!movieId) return;
    const fetchCastId = () => {
      setLoading(true);
      fetchCast(movieId)
        .then(data => {
          setCast(data);
        })
        .catch(error => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchCastId();
  }, [movieId]);

  const defaultImg =
    'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';

  const element = cast.map(({ id, profile_path, original_name, character }) => (
    <li className={css.list} key={id}>
      <div>
        <img
          width="200px"
          src={
            profile_path
              ? `https://image.tmdb.org/t/p/w500${profile_path}`
              : defaultImg
          }
          alt={original_name}
        />
      </div>
      <div>
        <h3>{original_name}</h3>
        <p>Character: {character}</p>
      </div>
    </li>
  ));
  return (
    <div>
      {error && <p>{error}</p>}
      {loading && <Loader />}
      <ul>{element}</ul>
    </div>
  );
};

export default Cast;
