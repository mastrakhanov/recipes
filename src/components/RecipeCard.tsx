import React, { memo, ReactElement } from 'react';

import { IRecipe } from '../models';
import Favourite from '../components/Favourite';

interface IRecipeCardProps {
  recipe: IRecipe;
}

const RecipeCard = memo(
  ({ recipe }: IRecipeCardProps): ReactElement => (
    <article className={'border p-3 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all w-[270px] h-[450px]'}>
      <a href={recipe.id} rel="noopener noreferrer">
        <img src={recipe.image} alt="food" />

        <h2 className={'text-md my-1 hover:text-green-500 font-[500] h-[94px] overflow-y-hidden'}>{recipe.label}</h2>
      </a>

      <div className={'flex justify-center border-y-[1px] p-2 text-xs font-thin'}>
        <span className={'pe-3 border-e-[1px]'}>{recipe.calories.toFixed()} CALORIES</span>
        <span className={'ps-3'}>{recipe.ingredients.length} INGREDIENTS</span>
      </div>

      <div className={'flex justify-between items-center mt-2 mr-2 py-2 transition-all'}>
        <a className={'text-sm font-thin'} href={recipe.url} target={'_blank'} rel="noopener noreferrer">
          {recipe.source}
        </a>

        <Favourite recipeId={recipe.id} />
      </div>
    </article>
  )
);

export default RecipeCard;
