import React, { useState } from "react";
import axios from "axios";

const BuySell = ({ cryptoData, cryptoAssets, setCryptoAssets}) => {
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCoins, setFilteredCoins] = useState([]);
    const [buyOrSell, setBuyOrSell] = useState("buy");
    const [amount, setAmount] = useState(0);    
    const [usdtValue, setUsdtValue] = useState(0);
    const [selectedOption, setSelectedOption] = useState("amount");
    const [buttonText, setButtonText] = useState("Buy");

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value === "") {
            setFilteredCoins([]);
        } else {
            const filtered = cryptoData.filter((coin) =>
                coin.name.toLowerCase().includes(e.target.value.toLowerCase())||
                coin.symbol.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setFilteredCoins(filtered);
        }
    };

    const handleCoinSelect = (coin) => {
        setSelectedCoin(coin);
        setSearchTerm("");
        setFilteredCoins([]);
    };

    const handleBuySellSelect = (option) => {
        setBuyOrSell(option);
        setButtonText(option === "buy" ? "Buy" : "Sell"); // Change button text based on action
    };

    const handleAmountChange = (e) => {
        const inputValue = parseFloat(e.target.value);
        setAmount(inputValue);
        if (selectedOption === "amount") {
            setUsdtValue(selectedCoin.current_price * inputValue);
        } else {
            setUsdtValue(inputValue);
        }
    };

    const handleUsdtValueChange = (e) => {
        const inputValue = parseFloat(e.target.value);
        setUsdtValue(inputValue);
        if (selectedOption === "usdt") {
            setAmount(inputValue / selectedCoin.current_price);
        } else {
            setAmount(inputValue * selectedCoin.current_price);
        }
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleBuy = () => {
        if (buyOrSell === "buy") {
            if (usdtValue <= cryptoAssets.find(asset => asset.symbol === "USDT").amount) {
                setCryptoAssets((prevAssets) => {
                    const usdtIndex = prevAssets.findIndex((asset) => asset.symbol === "USDT");
                    const updatedAssets = [...prevAssets];
                    updatedAssets[usdtIndex].amount -= usdtValue;
    
                    const existingAssetIndex = prevAssets.findIndex((asset) => asset.symbol === selectedCoin.symbol.toUpperCase());
                    if (existingAssetIndex !== -1) {
                        // Update the amount of the existing asset
                        updatedAssets[existingAssetIndex].amount += amount;
                    } else {
                        // Add a new asset to the array
                        updatedAssets.push({
                            image: selectedCoin.image,
                            name: selectedCoin.name,
                            symbol: selectedCoin.symbol.toUpperCase(),
                            amount: amount,
                            current_price: selectedCoin.current_price,
                        });
                    }
                    return updatedAssets;
                });
            } else {
                alert("Insufficient USDT balance to complete purchase.");
            }
        } else {
            const coinExists = cryptoAssets.some(asset => asset.symbol === selectedCoin.symbol);
            if (coinExists && amount <= cryptoAssets.find(asset => asset.symbol === selectedCoin.symbol).amount) {
                setCryptoAssets((prevAssets) => {
                    const updatedAssets = prevAssets.map((asset) => {
                        if (asset.symbol === selectedCoin.symbol) {
                            // Update the amount of the selected coin
                            return { ...asset, amount: asset.amount - amount };
                        }
                        return asset;
                    });
    
                    const usdtIndex = prevAssets.findIndex((asset) => asset.symbol === "USDT");
                    updatedAssets[usdtIndex].amount += usdtValue;
    
                    return updatedAssets;
                });
            } else {
                alert("Insufficient cryptocurrency balance to complete sale.");
            }
        }
    };    

    return (
        <div>
            <h2>Buy/Sell</h2>
            <div>
                <label>Search Coin:</label>
                <input type="text" value={searchTerm} onChange={handleSearchTermChange} />
                {filteredCoins.length > 0 && (
                    <div style={{ height: "100px", width: "250px", overflowY: "auto" }}>
                        {filteredCoins.map((coin) => (
                            <div key={coin.id} onClick={() => handleCoinSelect(coin)}>
                                <img
                                    src={coin.image}
                                    alt={coin.name}
                                    style={{ width: "17px", height: "17px" }}
                                />
                                <span>{coin.name} ({coin.symbol.toUpperCase()})</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {selectedCoin ? (
                <>
                    <div>
                        <img src={selectedCoin.image} alt={selectedCoin.name} style={{ width: "17px", height: "17px" }} />
                        <span>{selectedCoin.name} ({selectedCoin.symbol.toUpperCase()})</span>
                    </div>
                    <div>
                        <label>Buy or Sell:</label>
                        <select value={buyOrSell} onChange={(e) => handleBuySellSelect(e.target.value)}>
                            <option value="buy">Buy</option>
                            <option value="sell">Sell</option></select>
                    </div>
                    <div>
                        <label>Market Price: {selectedCoin.current_price}</label>
                    </div>
                    <div>
                        <label>Amount:</label>
                        <select value={selectedOption} onChange={(e) => handleOptionSelect(e.target.value)}>
                            <option value="amount">{selectedCoin.symbol.toUpperCase()}</option>
                            <option value="usdt">USDT</option>
                        </select>
                        {selectedOption === "amount" ? (
                            <input type="number" value={amount} onChange={handleAmountChange} />
                        ) : (
                            <input type="number" value={usdtValue} onChange={handleUsdtValueChange} />
                        )}
                    </div>
                    <div>
                        {buyOrSell === "buy" ? (
                            <>
                                <label>Available:</label>
                                <span>{cryptoAssets.find(asset => asset.symbol === 'USDT').amount.toFixed(2)} USDT</span>
                            </>
                        ) : (
                            <>
                                <label>Available {selectedCoin.symbol}:</label>
                                <span>{selectedCoin.amount}</span>
                            </>
                        )}
                    </div>
                    <button onClick={handleBuy} disabled={buyOrSell === 'sell' && !cryptoAssets.some(asset => asset.symbol === selectedCoin.symbol)}>
                        {buttonText}
                    </button>        </>
            ) : (
                <div>
                    <p>Please select a coin from the search bar.</p>
                </div>
            )}
        </div>
    );
};

export default BuySell;