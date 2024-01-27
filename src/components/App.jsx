import { Routes, Route } from 'react-router-dom';
import HomePage from 'pages/HomePage/HomePage';
import Movies from 'pages/Movies/Movies';
import Layout from '../components/Layout/Layout';
import MovieDetails from 'pages/MovieDetails/MovieDetails';
import Cast from './Cast/Cast';
import Reviews from './Reviews/Reviews';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:movieId" element={<MovieDetails />}>
            <Route path="/movie/:movieId/cast" element={<Cast />} />
            <Route path="/movie/:movieId/reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
