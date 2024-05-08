import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

const Navigation = (): ReactElement => (
  <nav className={'flex justify-between items-center h-[50px] px-5 shadow-md bg-green-500 text-white'}>
    <h3 className={'font-bold'}>Recipe Search</h3>

    <span>
      <Link to={'/'} className={'mr-2'}>
        Home
      </Link>
      <Link className={'ms-5'} to={'/favourites'}>
        Favourites
      </Link>
    </span>
  </nav>
);

export default Navigation;
