export type Planet = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  population: string;
  terrain: string;
  films: string[];
  residents: string[];
};

export type ResponseStarWars = {
  count: number;
  results: Planet[];
};

export type ResponseFilm = {
  title: string;
  director: string;
  episode_id: number;
  release_date: string;
  opening_crawl: string;
};

export type ResponseResidents = {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
};

export type State = {
  planets: Planet[];
  pages: number;
  currentPage: string;
  popupData: Popup;
  oneShot: boolean;
};

export type Error = {
  status: number | string;
  error?: string;
  data?: {
    detail: string;
  };
};

export type Popup = {
  popupArr: string[];
  popupTitle: string;
  popupType: string;
};
