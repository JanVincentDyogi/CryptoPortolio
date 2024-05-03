import React from "react";
import { Link } from 'react-router-dom';

const Watchlist = ({ cryptoData, favorites }) => {
  const favoriteCryptoData = cryptoData.filter((crypto) =>
    favorites.includes(crypto.symbol)
  );

  return (
    <div className="watchlist-container">
      <h1>Watchlist</h1>
      <div className="crypto-cards">
        {favoriteCryptoData.map((crypto, index) => (
        <Link to={`/crypto/${crypto.id}`} key={index}>
          <div className="crypto-card">
            <img
              src={crypto.image}
              alt={crypto.name}
              style={{ width: "50px", height: "50px" }}
            />
            <div>
              <h3>{crypto.name}</h3>
              <p>Symbol: {crypto.symbol.toUpperCase()}</p>
              <p>Price: ${crypto.current_price.toLocaleString()}</p>
              <p>24h Change: {crypto.price_change_percentage_24h.toFixed(2)}%</p>
            </div>
         </div>
         </Link>
        ))}
        <Link to="/market" className="add-to-watchlist-card">
          <div className="add-to-watchlist-card-content">
            <p>+</p>
            <p>Add to Watchlist</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Watchlist;