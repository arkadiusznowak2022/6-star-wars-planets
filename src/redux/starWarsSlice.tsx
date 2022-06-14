import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Planet, State, Popup } from '../data/types';

const initialState: State = {
  planets: [],
  pages: 0,
  currentPage: '1',
  popupData: {
    popupArr: [],
    popupTitle: '',
    popupType: '',
  },
  oneShot: true,
};

const startWarsSlice = createSlice({
  name: 'starWars',
  initialState,
  reducers: {
    setPlanets: (state, action: PayloadAction<Planet[]>) => {
      state.planets = action.payload;
    },
    setPages: (state, action: PayloadAction<number>) => {
      state.pages = action.payload;
    },
    switchPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
    setPopupData: (state, action: PayloadAction<Popup>) => {
      state.popupData = action.payload;
    },
    resetPopup: (state) => {
      state.popupData = {
        popupArr: [],
        popupTitle: '',
        popupType: '',
      };
    },
  },
});

export default startWarsSlice;
export const { setPlanets, setPages, switchPage, setPopupData, resetPopup } =
  startWarsSlice.actions;

export const selectPlanets = (state: RootState): Planet[] =>
  state.starWars.planets;
export const selectPages = (state: RootState): number => state.starWars.pages;
export const selectCurrentPageNumber = (state: RootState): string =>
  state.starWars.currentPage;
export const selectPopupData = (state: RootState): Popup =>
  state.starWars.popupData;
