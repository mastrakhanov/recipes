import React, { ReactElement } from 'react';

import { IRecipesState } from '../store/slice';
import { useGetRecipesByIdsQuery } from '../store/api';
import { useAppSelector } from '../hooks/redux';
import RecipeCard from '../components/RecipeCard';
import Loading from '../components/Loading';

const FavouritesPage = (): ReactElement => {
  const { favourites } = useAppSelector<IRecipesState>(state => state.recipes);
  const { isLoading, isError, data } = useGetRecipesByIdsQuery(favourites);

  return (
    <div className={'mt-10'}>
      {!favourites.length && <p className={'text-center'}>No items.</p>}
      {isError && <p className={'text-center text-red-600'}>Something went wrong...</p>}
      {isLoading && <Loading />}

      <div className={'flex flex-wrap justify-center gap-3 m-3'}>
        {data?.map(({ recipe }) => <RecipeCard key={recipe.uri} recipe={recipe} />)}
      </div>
    </div>
  );
};

export default FavouritesPage;
