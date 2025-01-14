import React, { useContext, useState } from 'react';
import { WatchListContext } from "../context/watchListContext";

function AddCoin() {

  const [isActive, setIsActive] = useState(false);
  const { addCoin } = useContext(WatchListContext);


  const availableCoins = [
    "bitcoin",
    "ethereum",
    "ripple",
    "tether",
    "bitcoin-cash",
    "litecoin",
    "eos",
    "okb",
    "tezos",
    "cardano",
  ];

  const handleClick = (coin) => {
    addCoin(coin);
    setIsActive(false);
  }


  return (
    <div className='dropdown'>
      <button
        onClick={() => setIsActive(!isActive)}
        className='btn btn-primary dropdown-toggle'
        type='button'>
        Add Coin
      </button>

      <div className={isActive ? "dropdown-muenu show" : "dropdown-menu"}>
        {availableCoins.map((el) => {
           return (
            <a
            onClick={() => handleClick(el)}
            href='#'
            className='dropdown-item'
            >
              {el}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default AddCoin;
