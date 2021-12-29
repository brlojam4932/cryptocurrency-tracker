import React, { createContext, useState, useEffect } from "react";

export const WatchListContext = createContext();


export const WatchListContextProvider = (props) => {
  // localStorage combines all into one string. Here we split it in to an array
  //console.log(localStorage.getItem("watchlist").split(",")); 

  // I had to change the useState to ([]) an empty array in order to get it to start...
  const [watchList, setWatchList] = useState(["bitcoin",
  "ethereum",
  "ripple",
  "ankr"]);

    /*
     const [watchList, setWatchList] = useState(
    localStorage.getItem("watchlist").split(",") || [
      "bitcoin",
      "ethereum",
      "ripple",
      "ankr"
    ]);
    */

  // anytime we add or delete a coin, we run this hook
  // we save to local key/value pairs: ex. localStorage.setItem("key", value)
  useEffect(() => {
    localStorage.setItem("watchlist", watchList);

  }, [watchList]);

  // if coin is not in our list, we get -1, then we can add it to our list
  // setWatchList to ...watchList; we copy our new coin into watchlist array
  const addCoin = coin => {
    if (watchList.indexOf(coin) === -1) {
      setWatchList([...watchList, coin])
    }
  }

  // el means element
  const deleteCoin = (coin) => {
    setWatchList(
      watchList.filter((el) => {
        return el !== coin;
      })
    );
  };

  // value  equals an  that is added so we can have access to it
  return (
    <WatchListContext.Provider value={{ watchList, deleteCoin, addCoin }}>
      {props.children}
    </WatchListContext.Provider>
  )

}