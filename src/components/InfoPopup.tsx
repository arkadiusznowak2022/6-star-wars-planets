import './InfoPopup.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { resetPopup, selectPopupData } from '../redux/starWarsSlice';
import { Popup, ResponseFilm, ResponseResidents } from '../data/types';
import { ReactNode, useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';

function InfoPopup() {
  //////////////////////
  //// VARIABLES
  const dispatch = useDispatch<AppDispatch>();
  const popupHead: Popup = useSelector(selectPopupData);
  const [filmsContent, setFilmsContent] = useState<ResponseFilm[]>([]);
  const [residentsContent, setResidentsContent] = useState<ResponseResidents[]>(
    []
  );
  const [pickUpInfo, setPickUpInfo] = useState<string>('');
  let filmsFlag: boolean = filmsContent.length > 0;
  let residentsFlag: boolean = residentsContent.length > 0;

  //////////////////////
  //// EVENTS

  const clickOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dispatch(resetPopup());
  };

  const clickPopup = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const clickListEl = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const id = (e.target as HTMLElement).textContent;
    setPickUpInfo(id as string);
  };

  const clickGoBack = () => {
    setPickUpInfo('');
  };

  //////////////////////
  //// EFECTS

  useEffect(() => {
    callApi(popupHead.popupArr);
  }, []);

  //////////////////////
  //// API

  const setResponseContent = (data: ResponseFilm | ResponseResidents) => {
    if (popupHead.popupType === 'films') {
      setFilmsContent((prev) => [...prev, data as ResponseFilm]);
    }
    if (popupHead.popupType === 'residents') {
      setResidentsContent((prev) => [...prev, data as ResponseResidents]);
    }
  };

  const callApi = (urls: string[], i: number = 0) => {
    fetch(urls[i])
      .then((res) => res.json())
      .then((data) => {
        setResponseContent(data);
        i++;
        if (i < urls.length) callApi(urls, i);
        else return;
      });
  };

  //////////////////////
  //// MARKUPS

  const filmList = (content: ResponseFilm[]): ReactNode[] => {
    return content.map((el) => (
      <p
        key={el.title + Date.now()}
        className='infobox-list-item'
        onClick={clickListEl}
      >
        {el.title}
      </p>
    ));
  };

  const residentsList = (content: ResponseResidents[]): ReactNode[] => {
    return content.map((el) => (
      <p
        key={el.name + Date.now()}
        className='infobox-list-item'
        onClick={clickListEl}
      >
        {el.name}
      </p>
    ));
  };

  const loadingSpinners = (l1: number, l2: number): ReactNode => {
    const spinnersArr: ReactNode[] = [];
    for (let x = 0; x < l1 - l2; x++) {
      spinnersArr.push(
        <span key={x} className='spinner-field'>
          <BeatLoader color='rgb(248, 248, 184);;' size='5px' />
        </span>
      );
    }
    return <div className='waiting-spinners'>{spinnersArr}</div>;
  };

  const infoMarkup = (id: string): ReactNode => {
    const type: string = popupHead.popupType;

    if (type === 'films') {
      const film = filmsContent.find((el) => {
        if (el.title === id) return true;
      });
      if (film) {
        return (
          <div className='infobox-info-cont'>
            <i className='fa-solid fa-reply' onClick={clickGoBack}></i>
            <p>Title: {film.title}</p>
            <p>Director: {film.director}</p>
            <p>Episode: {film.episode_id}</p>
            <p>Release date: {film.release_date}</p>
            <p>Opening crawl: {film.opening_crawl}</p>
          </div>
        );
      }
    }

    if (type === 'residents') {
      const resident = residentsContent.find((el) => {
        if (el.name === id) return true;
      });
      if (resident) {
        return (
          <div className='infobox-info-cont'>
            <i className='fa-solid fa-reply' onClick={clickGoBack}></i>
            <p>Name: {resident.name}</p>
            <p>Birth year: {resident.birth_year}</p>
            <p>Eye color: {resident.eye_color}</p>
            <p>Gender: {resident.gender}</p>
            <p>Hair color: {resident.hair_color}</p>
            <p>Height: {resident.height}</p>
            <p>Mass: {resident.mass}</p>
            <p>Skin color: {resident.skin_color}</p>
          </div>
        );
      }
    }

    return <p></p>;
  };

  //////////////////////
  //// RETURN

  return (
    <div className='overlay' onClick={clickOverlay}>
      <div className='popup' onClick={clickPopup}>
        <h2>
          {popupHead.popupTitle} <i className='fa-solid fa-earth-europe'></i>{' '}
          {popupHead.popupType.toUpperCase()}
        </h2>
        {filmsFlag && !pickUpInfo && filmList(filmsContent)}
        {residentsFlag && !pickUpInfo && residentsList(residentsContent)}
        {!pickUpInfo &&
          loadingSpinners(
            popupHead.popupArr.length,
            filmsContent.length | residentsContent.length
          )}
        {pickUpInfo && infoMarkup(pickUpInfo)}
      </div>
    </div>
  );
}

export default InfoPopup;
