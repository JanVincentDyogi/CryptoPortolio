import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const Market = ({ cryptoData, favorites, setFavorites }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFavorite = (symbol) => {
    if (favorites.includes(symbol)) {
      setFavorites(favorites.filter((fav) => fav !== symbol));
    } else {
      setFavorites([...favorites, symbol]);
    }
  };

  const filteredCryptoData = cryptoData.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Crypto Market</h1>
      <input
        type="text"
        placeholder="Search cryptocurrencies"
        value={searchTerm}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>Favorite</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>24h</th>
            <th>24h Volume</th>
            <th>Circulating Supply</th>
            <th>Total Supply</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {filteredCryptoData.map((crypto, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={favorites.includes(crypto.symbol)}
                    onChange={() => handleFavorite(crypto.symbol)}
                  />
                </td>
                <td>
                <Link to={`/crypto/${crypto.id}`}>
                  <img
                    src={crypto.image}
                    alt={crypto.name}
                    style={{ width: "17px", height: "17px" }}
                  />
                  <strong>{crypto.name}</strong>
                  </Link>
                </td>
                <td>{crypto.symbol.toUpperCase()}</td>
                <td>${crypto.current_price.toLocaleString()}</td>
                <td>{crypto.price_change_percentage_24h.toFixed(2)}%</td>
                <td>${crypto.total_volume.toLocaleString()}</td>
                <td>{crypto.circulating_supply.toLocaleString()}</td>
                <td>
                  {crypto.total_supply
                    ? crypto.total_supply.toLocaleString()
                    : "-"}
                </td>
                <td>${crypto.market_cap.toLocaleString()}</td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Market;
