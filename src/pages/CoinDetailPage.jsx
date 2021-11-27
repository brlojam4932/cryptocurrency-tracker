import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HistoryChart from "../components/HistoryChart";
import CoinData from "../components/CoinData";
import coinGecko from "../apis/coinGecko";

const CoinDetailPage = () => {
  const { id } = useParams()
  //console.log("id: " + id);
  const [coinData, setCoinData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resultsDay = await coinGecko.get(`/coins/${id}/market_chart/`, {
        params: {
          vs_currency: "usd",
          days: "1",
        },
      });
      const resultsWeek = await coinGecko.get(`/coins/${id}/market_chart/`, {
        params: {
          vs_currency: "usd",
          days: "7",
        },
      });
      const resultsYear = await coinGecko.get(`/coins/${id}/market_chart/`, {
        params: {
          vs_currency: "usd",
          days: "8",
        },
      });
      //console.log(resultsDay.data);
      setCoinData({day: resultsDay.data.prices, week: resultsWeek.data.prices, year: resultsYear.data.prices});
    };
    fetchData();
  }, []);

  const renderData = () => {
    return (
      <div className="coinlist">
        <HistoryChart />
        <CoinData />

      </div>
    )
  }

  return renderData();

};

export default CoinDetailPage;
