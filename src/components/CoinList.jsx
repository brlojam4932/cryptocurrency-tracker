import React, { useState, useEffect, useContext } from "react";
import coinGecko from "../apis/coinGecko";
import { WatchListContext } from "../context/watchListContext";
import Coin from "./Coin";


function CoinList() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // watchlist hook
  const { watchList, deleteCoin } = useContext(WatchListContext);
  //console.log("watchList: ", watchList);


  // here we can add more endpoints to our request
  useEffect(() => {
    const fetchData = async () => {
      // we store our results with an await async function
      setIsLoading(true);
      const response = await coinGecko.get("/coins/markets", {
        params: {
          vs_currency: "usd",
          ids: watchList.join(","),
        },
      });
      //console.log("response: ", response.data);
      setCoins(response.data);
      setIsLoading(false);
    };

    if (watchList.length > 0) {
      fetchData();
    } else setCoins([]);
  }, [watchList]);

  const renderCoins = () => {
    if (isLoading) {
      return <div>Loading...</div>
    }

    return (
      <ul className="coinlist list-group mt-2">
        {coins.map((coin) => {
          return <Coin key={coin.id} coin={coin} deleteCoin={deleteCoin} />
        })}
      </ul>
    );
  };

  return <div>{renderCoins()}</div>
};

export default CoinList;
