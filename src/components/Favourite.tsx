import React, { memo, ReactElement, useCallback, useState } from 'react';

import { IRecipesState } from '../store/slice';
import { useActions } from '../hooks/actions';
import { useAppSelector } from '../hooks/redux';

interface IFavouriteProps {
  recipeId: string;
}

const Favourite = memo(({ recipeId }: IFavouriteProps): ReactElement => {
  const { addFavourite, removeFavourite } = useActions();
  const { favourites } = useAppSelector<IRecipesState>(state => state.recipes);
  const [isFav, setIsFav] = useState<boolean>(favourites.includes(recipeId));

  const toggleFavourite = useCallback(
    (event: React.MouseEvent<SVGSVGElement, MouseEvent>): void => {
      event.preventDefault();
      event.stopPropagation();

      if (isFav) {
        setIsFav(false);
        removeFavourite(recipeId);
      } else {
        setIsFav(true);
        addFavourite(recipeId);
      }
    },
    [addFavourite, isFav, recipeId, removeFavourite]
  );

  return (
    <svg
      onClick={toggleFavourite}
      fill={isFav ? 'red' : 'none'}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 cursor-pointer"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      />
    </svg>
  );
});

export default Favourite;
