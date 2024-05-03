import React, { useState, useEffect } from "react";
import Home from './Home';
import Market from './Market';
import Watchlist from './Watchlist';
import Navbar from './Navbar';
import CryptoDetails from './CryptoDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from "axios";

function App() {
  const [favorites, setFavorites] = useState([]);
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              x_cg_demo_api_key: "CG-Wdo5iVvwZTf2tJ1AKtXxk4jk",
            },
            headers: {
              accept: "application/json",
            },
          }
        );
        setCryptoData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/market" element={<Market cryptoData={cryptoData} favorites={favorites} setFavorites={setFavorites} />} />
        <Route path="/watchlist" element={<Watchlist cryptoData={cryptoData} favorites={favorites} />} />
        <Route path="/crypto/:cryptoId" element={<CryptoDetails cryptoData={cryptoData} />} />
      </Routes>
    </Router>
  );
}

export default App;
