import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ISearchRecipeByIdResponse, ISearchRecipesParams, ISearchRecipesResponse } from '../models';

const APP_KEY = '05efa47145aa0c123884dbd141f9349d';
const APP_ID = 'b38782a8';

interface IRequest {
  url: string;
  params: {
    type: string;
    app_id: string;
    app_key: string;
    q?: string;
    uri?: string;
    _cont?: string;
  };
}

const isFulfilled = <T>(input: PromiseSettledResult<T>): input is PromiseFulfilledResult<T> => input.status === 'fulfilled';

const getRecipeId = (uri: string): string => uri.slice(uri.indexOf('_') + 1);

export const api = createApi({
  reducerPath: 'recipes/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.edamam.com/',
  }),
  endpoints: build => ({
    searchRecipes: build.query<ISearchRecipesResponse, ISearchRecipesParams>({
      query: (searchParams: ISearchRecipesParams) => {
        const request: IRequest = {
          url: 'api/recipes/v2',
          params: {
            type: 'public',
            app_id: APP_ID,
            app_key: APP_KEY,
          },
        };

        if (searchParams.next) {
          request.params['_cont'] = searchParams.next;
        }

        if (searchParams.search) {
          request.params['q'] = searchParams.search;
        }

        return request;
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
      merge: (currentItems, newItems, { arg: { next } }) => {
        if (!next) {
          currentItems.hits.length = 0;
        }

        currentItems.hits.push(...newItems.hits);
        currentItems._links = newItems._links;
        currentItems.to = newItems.to;
        currentItems.count = newItems.count;
      },
      transformResponse: (response: ISearchRecipesResponse) => ({
        ...response,
        hits: response.hits.map(item => ({
          ...item,
          recipe: { ...item.recipe, id: getRecipeId(item.recipe.uri) },
        })),
      }),
    }),
    getRecipeById: build.query<ISearchRecipeByIdResponse, string>({
      query: (id: string) => ({
        url: `api/recipes/v2/${id}`,
        params: {
          type: 'public',
          app_id: APP_ID,
          app_key: APP_KEY,
        },
      }),
      transformResponse: (response: ISearchRecipeByIdResponse) => ({
        ...response,
        recipe: { ...response.recipe, id: getRecipeId(response.recipe.uri) },
      }),
    }),
    getRecipesByIds: build.query<ISearchRecipeByIdResponse[], string[]>({
      queryFn: async (ids: string[], _queryApi, _extraOptions, fetchWithBQ) => {
        const requests = ids.map(id =>
          fetchWithBQ({
            url: `api/recipes/v2/${id}`,
            params: {
              type: 'public',
              app_id: APP_ID,
              app_key: APP_KEY,
            },
          })
        );

        const responses = await Promise.allSettled(requests).then(responses =>
          responses.filter(isFulfilled).map(response => response.value.data as ISearchRecipeByIdResponse)
        );

        const data = responses.map(data => ({
          ...data,
          recipe: {
            ...data.recipe,
            id: getRecipeId(data.recipe.uri),
          },
        }));

        return { data };
      },
    }),
  }),
});

export const { useSearchRecipesQuery, useGetRecipeByIdQuery, useGetRecipesByIdsQuery } = api;
