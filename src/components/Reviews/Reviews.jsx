import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import { fetchReviews } from 'service/api';

const Reviews = () => {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!movieId) return;
    const fetchReviewsId = () => {
      setLoading(true);
      fetchReviews(movieId)
        .then(data => {
          setReviews(data);
        })
        .catch(error => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchReviewsId();
  }, [movieId]);

  const element = reviews.map(({ id, author, content }) => (
    <li key={id}>
      <h3>Author: {author}</h3>
      <p>{content}</p>
    </li>
  ));

  return (
    <div>
      {error && <p>{error}</p>}
      {loading && <Loader />}
      {reviews.length === 0 ? (
        <div>We don't have any reviews for this movie</div>
      ) : (
        <div>
          <ul>{element}</ul>
        </div>
      )}
    </div>
  );
};

export default Reviews;
