import React, { useState, useEffect } from 'react';

function Home({ cryptoData }) {
  const [cryptoAssets, setCryptoAssets] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    // Filter crypto data to find Tether (USDT)
    const tetherData = cryptoData.find(asset => asset.symbol === 'usdt');

    // If Tether data is found, set it as a crypto asset
    if (tetherData) {
      setCryptoAssets([{
        image: tetherData.image,
        name: tetherData.name,
        symbol: tetherData.symbol.toUpperCase(),
        amount: 100000,
        current_price: tetherData.current_price,
      }]);
    }
  }, [cryptoData]);

  useEffect(() => {
    // Calculate total value of all crypto assets
    const total = cryptoAssets.reduce((acc, asset) => {
      return acc + (asset.current_price * asset.amount);
    }, 0);

    setTotalValue(total);
  }, [cryptoAssets]);

  return (
    <div>
      <h1>My Portfolio</h1>
      <section>
        <h2>Total Estimated Value</h2>
        <p>${totalValue.toLocaleString()}</p>
      </section>
      <section>
        <h2>Assets</h2>
        {/* Display crypto assets here */}
        {cryptoAssets.map((asset, index) => (
          <div key={index}>
            {/* Display crypto asset information */}
            <p>
              <img src={asset.image} alt={asset.name} style={{ width: "17px", height: "17px" }}/>
              {asset.name} - {asset.symbol}: {asset.amount} (${(asset.amount * asset.current_price).toLocaleString()})
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Home;
