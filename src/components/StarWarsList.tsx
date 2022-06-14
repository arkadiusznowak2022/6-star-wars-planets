import './StarWarsList.css';
import { ReactNode, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import {
  selectPlanets,
  selectPopupData,
  setPopupData,
} from '../redux/starWarsSlice';
import InfoPopup from './InfoPopup';
import { Planet } from '../data/types';

function StarWarsList(): JSX.Element {
  ////////////////////
  //// VARIABLES
  const dispatch = useDispatch<AppDispatch>();
  const flagPopup = useSelector(selectPopupData).popupArr.length > 0;
  const planets = useSelector(selectPlanets);
  let activePlanet: HTMLElement;

  const clickPlanet = (e: React.MouseEvent<HTMLLIElement>) => {
    if (activePlanet && activePlanet !== e.currentTarget) {
      activePlanet.classList.remove('active');
    }
    activePlanet = e.currentTarget;
    (e.currentTarget as HTMLElement).classList.toggle('active');
  };

  ////////////////////
  //// MANAGE POPUP

  const showPopup = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    const id: string | undefined = e.currentTarget.dataset.id;
    const type: string | undefined = e.currentTarget.dataset.type;

    const planetData: Planet | undefined = planets.find((el) => {
      if (el.name === id) return true;
    });

    if (planetData && type) {
      const popupArr: string[] = planetData[type as keyof Planet] as string[];
      const popupTitle: string = planetData.name;

      dispatch(setPopupData({ popupArr, popupTitle, popupType: type }));
    }
  };

  ////////////////////
  //// MAIN MARKUP

  const markup: ReactNode[] = planets.map((planet) => {
    const flagFilms = planet.films.length > 0;
    const flagResidents = planet.residents.length > 0;

    return (
      <li
        className='star-wars-list-item'
        key={Date.now() + planet.name}
        onClick={clickPlanet}
      >
        <h2>{planet.name}</h2>
        <div className='planet-info'>
          <p>Rotation period: {planet.rotation_period}</p>
          <p>Orbital period: {planet.orbital_period}</p>
          <p>Diameter: {planet.diameter}</p>
          <p>Climate: {planet.climate}</p>
          <p>Population: {planet.population}</p>
          <p>Terrain: {planet.terrain}</p>

          {flagFilms ? (
            <p
              className='showable'
              onClick={showPopup}
              data-type='films'
              data-id={planet.name}
            >
              <i className='fa-solid fa-arrow-right-to-bracket'></i> Films:{' '}
              {planet.films.length}
            </p>
          ) : (
            <p>Films: {planet.films.length}</p>
          )}

          {flagResidents ? (
            <p
              className='showable'
              onClick={showPopup}
              data-type='residents'
              data-id={planet.name}
            >
              <i className='fa-solid fa-arrow-right-to-bracket'></i> Famous
              residents: {planet.residents.length}
            </p>
          ) : (
            <p>Famous residents: {planet.residents.length}</p>
          )}
        </div>
      </li>
    );
  });

  ////////////////////
  //// RETURN

  return (
    <ul className='star-wars-list'>
      {markup}
      {flagPopup && <InfoPopup />}
    </ul>
  );
}

export default StarWarsList;
