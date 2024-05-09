import React from 'react';

function Home({ cryptoAssets, totalValue }) {
  return (
    <div>
      <h1>My Portfolio</h1>
      <section>
        <h2>Total Estimated Value</h2>
        <p>${totalValue.toLocaleString()}</p>
      </section>
      <section>
        <h2>Assets</h2>
        {cryptoAssets.filter(asset => asset.amount > 0).map((asset, index) => (
          <div key={index}>
            {/* Display crypto asset information */}
            <p>
              <img src={asset.image} alt={asset.name} style={{ width: "17px", height: "17px" }} />
              {asset.name} - {asset.symbol}: {asset.amount.toLocaleString('en-US', {maximumFractionDigits: 8 })} (${(asset.amount * asset.current_price).toFixed(2).toLocaleString()})
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Home;