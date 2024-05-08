import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';

import { useGetRecipeByIdQuery } from '../store/api';
import Favourite from '../components/Favourite';
import Loading from '../components/Loading';

const RecipeDetails = (): ReactElement => {
  const params = useParams<string>();
  const { isLoading, isError, data } = useGetRecipeByIdQuery(params.id!.trim());

  return (
    <>
      {isError && <p className={'mt-2 text-center text-red-600'}>Something went wrong...</p>}
      {isLoading && <Loading />}
      {data?.recipe && (
        <div className={'border shadow-md my-2 sm:w-[600px] md:w-[700px] lg:w-[800px] rounded mx-auto'}>
          <section className={'flex gap-4 p-4'}>
            <img src={data.recipe.image} alt="food" />

            <div className={'w-full relative'}>
              <h1 className={'text-center font-[500]'}>{data.recipe.label}</h1>

              <a className={'text-center block mt-2 text-sm font-thin'} href={data.recipe.url} target={'_blank'} rel="noopener noreferrer">
                See full recipe on: {data.recipe.source}
              </a>

              <p className={'mt-2'}>Cuisine type: {data.recipe.cuisineType}</p>

              <p>Dish type: {data.recipe.dishType}</p>

              <p>Meal type: {data.recipe.mealType.join(', ')} </p>

              <div className={'absolute right-0 bottom-0'}>
                <Favourite recipeId={data.recipe.id} />
              </div>
            </div>
          </section>

          <section className={'flex gap-4 border-t-[1px] p-4 bg-gray-50'}>
            <div className={'w-[50%]'}>
              <div>
                <h1 className={'border-b-[1px] py-2 text-xl'}>{data.recipe.ingredients.length} Ingredients</h1>

                <ul className={'list-disc ms-3'}>
                  {data.recipe.ingredientLines.map((ingredient, index) => (
                    <li className={'mt-5 text-sm'} key={index}>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={'mt-5'}>
                <h1 className={'border-b-[1px] py-2 text-xl'}>Preparation</h1>

                <a className={'block mt-3 text-sm font-thin'} href={data.recipe.url} target={'_blank'} rel="noopener noreferrer">
                  <button className={'py-2 px-5 rounded-md bg-gray-200 hover:shadow-md'}>Instructions</button>
                  <span className={'ms-3'}>on: {data.recipe.source}</span>
                </a>
              </div>
            </div>

            <div className={'w-[50%]'}>
              <h1 className={'border-b-[1px] py-2 text-xl'}>Nutrition</h1>

              <div className={'flex justify-around border-b-[1px] p-4'}>
                <span className={'flex flex-col font-thin'}>
                  <span className={'text-sm self-center'}>{data.recipe.calories.toFixed()}</span>
                  <span className={'text-xs self-center'}>CALORIES</span>
                </span>

                <span className={'flex flex-col font-thin'}>
                  <span className={'text-sm self-center'}>{data.recipe.totalWeight.toFixed()}</span>
                  <span className={'text-xs self-center'}>TOTAL WEIGHT</span>
                </span>
              </div>

              {data.recipe.digest.map((item, i) => (
                <div className={'leading-10'} key={`${item.label}${i}`}>
                  <div className={'flex justify-between'}>
                    <span className={'me-1'}>{item.label}</span>

                    <span className={'w-28 md:w-32 flex justify-between ms-auto'}>
                      <span>
                        {item.total.toFixed()} {item.unit}
                      </span>

                      <span>{item.total && item.daily && (item.total / item.daily).toFixed()} %</span>
                    </span>
                  </div>

                  {item.sub?.map((info, index) => (
                    <div className={'flex justify-between'} key={`${info.label}${index}`}>
                      <span className={'ms-5 me-1'}>{info.label}</span>

                      <span className={'w-28 md:w-32 flex justify-between ms-auto'}>
                        <span>
                          {info.total.toFixed()} {info.unit}
                        </span>

                        <span>{info.total && info.daily && (info.total / info.daily).toFixed()} %</span>
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default RecipeDetails;
