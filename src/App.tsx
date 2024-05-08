import React, { lazy, ReactElement, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Navigation from './components/Navigation';
import Loading from './components/Loading';

const HomePage = lazy(() => import('./pages/HomePage'));
const FavouritesPage = lazy(() => import('./pages/FavouritesPage'));
const RecipeDetails = lazy(() => import('./components/RecipeDetails'));

const App = (): ReactElement => (
  <>
    <Navigation />
    <Routes>
      <Route
        path={'/'}
        element={
          <Suspense fallback={<Loading />}>
            <HomePage />
          </Suspense>
        }
      />
      <Route
        path={'/favourites'}
        element={
          <Suspense fallback={<Loading />}>
            <FavouritesPage />
          </Suspense>
        }
      />
      <Route
        path={'/:id'}
        element={
          <Suspense fallback={<Loading />}>
            <RecipeDetails />
          </Suspense>
        }
      />
      <Route path={'*'} element={<div>Page not found.</div>} />
    </Routes>
  </>
);

export default App;
