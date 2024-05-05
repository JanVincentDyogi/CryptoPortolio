import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/market">Market</Link>
        </li>
        <li>
            <Link to="/watchlist">Watchlist</Link>
        </li>
        <li>
            <Link to="/buysell">Buy/Sell</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
