import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { StringifyOptions } from 'querystring';
import { ResponseStarWars, ResponseFilm } from '../data/types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getPlanets: builder.query<ResponseStarWars, string>({
      query: (page) => `planets/?page=${page}`,
    }),
    getPopupData: builder.query<ResponseFilm, string>({
      query: (url) => `${url}`,
    }),
  }),
});

export const { useGetPlanetsQuery } = apiSlice;
export const { useGetPopupDataQuery } = apiSlice;

//  "https://swapi.dev/api/films/1/"
