import { configureStore } from '@reduxjs/toolkit';
import starWarsSlice from './starWarsSlice';

import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { apiSlice } from './apiSlice';

export const store = configureStore({
  reducer: {
    starWars: starWarsSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
