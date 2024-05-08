import React, { ReactElement, useDeferredValue, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useSearchRecipesQuery } from '../store/api';
import RecipeCard from '../components/RecipeCard';
import Loading from '../components/Loading';

const getNextRecipesParam = (link: string | undefined): string => new URLSearchParams(link).get('_cont') ?? '';

const HomePage = (): ReactElement => {
  const [search, setSearch] = useState<string>('');
  const [next, setNext] = useState<string>('');
  const deferredSearch = useDeferredValue<string>(search);
  const { ref, inView } = useInView({ rootMargin: '70%' });

  const {
    isLoading,
    isError,
    data: recipes,
  } = useSearchRecipesQuery({ search: deferredSearch, next }, { skip: deferredSearch.length < 3 });

  useEffect(() => {
    const param = getNextRecipesParam(recipes?._links.next?.href);

    if (inView && param && param !== next) {
      setNext(param);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [next, inView]);

  useEffect(() => setNext(''), [deferredSearch]);

  return (
    <div className={'mt-10'}>
      {isError && <p className={'text-center text-red-600'}>Something went wrong...</p>}

      <input
        className={`border py-2 px-4 mb-3 focus:border-green-500 focus:outline-none
         focus:ring-0 min-[420px]:w-[400px] md:w-[560px] mx-auto block rounded`}
        type="text"
        placeholder={'Search for recipe...'}
        value={search}
        onChange={event => setSearch(event.target.value)}
      />

      {!!recipes?.count && <p className={'text-center'}>{recipes?.count} results found.</p>}

      <div className={'flex flex-wrap justify-center gap-3 m-3'}>
        {isLoading && <Loading />}
        {!isLoading && !recipes?.hits.length && search.length >= 3 && <p className={'text-center'}>No recipes found.</p>}
        {recipes?.hits.map(({ recipe }) => <RecipeCard key={recipe.uri} recipe={recipe} />)}
      </div>

      {recipes && !!recipes.hits.length && <div ref={ref}></div>}
    </div>
  );
};

export default HomePage;
