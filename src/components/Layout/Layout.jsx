import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import css from './layout.module.css';

const Layout = () => {
  return (
    <div className={css.container}>
      <header className={css.header}>
        <nav>
          <ul className={css.list}>
            <li>
              <NavLink className={css.link} to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className={css.link} to="/movies">
                Movies
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};
export default Layout;

// export default Layout;
