import './Pages.css';
import { ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectPages,
  selectCurrentPageNumber,
  switchPage,
} from '../redux/starWarsSlice';
import { AppDispatch } from '../redux/store';

function Pages() {
  const dispatch = useDispatch<AppDispatch>();
  const currentPage = useSelector(selectCurrentPageNumber);
  const qt = useSelector(selectPages);

  const markup: ReactNode[] = [];
  for (let x = 1; x <= qt; x++) {
    markup.push(
      <p
        className={`page-element ${x === +currentPage ? 'page-active' : ''}`}
        key={x}
        onClick={(e) => {
          const page: string =
            (e.target as HTMLElement).textContent || currentPage;
          dispatch(switchPage(page));
        }}
      >
        {x}
      </p>
    );
  }

  return <div className='pages-cont'>{markup}</div>;
}

export default Pages;
