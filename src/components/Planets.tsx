import { useEffect, useState } from 'react';
import './Planets.css';
import StarWarsList from './StarWarsList';
import Pages from './Pages';
import { CircleLoader } from 'react-spinners';

import { useGetPlanetsQuery } from '../redux/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { Error, Planet } from '../data/types';

import {
  setPlanets,
  setPages,
  selectCurrentPageNumber,
} from '../redux/starWarsSlice';

function Planets(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const page = useSelector(selectCurrentPageNumber);
  const { data, error, isFetching, isSuccess } = useGetPlanetsQuery(page);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setPlanets(data.results));
      dispatch(setPages(Math.ceil(data.count / data.results.length)));
    }
  }, [data]);

  return (
    <div className='planets-cont'>
      <h1>Star Wars Planets</h1>
      {!error && !isFetching && <StarWarsList />}
      {!error && !isFetching && <Pages />}
      {isFetching && (
        <div className='loading-spinner-cont'>
          <CircleLoader color='rgb(255,255,0)' size={200} />
        </div>
      )}
      {error && (
        <div>
          <p>{(error as Error).status}</p>
          <p>{(error as Error)?.error}</p>
          <p>{(error as Error)?.data?.detail}</p>
        </div>
      )}
    </div>
  );
}

export default Planets;
