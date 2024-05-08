import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const FAV_KEY = 'favourite_recipes';

export interface IRecipesState {
  favourites: string[];
}

const initialState: IRecipesState = {
  favourites: JSON.parse(localStorage.getItem(FAV_KEY) ?? '[]'),
};

export const slice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addFavourite: (state, action: PayloadAction<string>): void => {
      state.favourites.push(action.payload);
      localStorage.setItem(FAV_KEY, JSON.stringify(state.favourites));
    },
    removeFavourite: (state, action: PayloadAction<string>): void => {
      state.favourites = state.favourites.filter(favourite => favourite !== action.payload);
      localStorage.setItem(FAV_KEY, JSON.stringify(state.favourites));
    },
  },
});

export const recipesActions = slice.actions;
export const recipesReducer = slice.reducer;
