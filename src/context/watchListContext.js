import React, { createContext, useState, useEffect } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = props => {
  const [watchList, setWatchList] = useState(["bitcoin","ethereum","ripple", "ankr"]);

  // el means element
  const deleteCoin = (coin) => {
    setWatchList(watchList.filter(el => {
      return el !== coin
    }))
  }

// value  equals an object
  return (
    <WatchListContext.Provider value={{watchList, deleteCoin}}>
      {props.children}
    </WatchListContext.Provider>
  )

}