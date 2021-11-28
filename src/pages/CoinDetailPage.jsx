import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HistoryChart from "../components/HistoryChart";
import CoinData from "../components/CoinData";
import coinGecko from "../apis/coinGecko";

const CoinDetailPage = () => {
  const { id } = useParams() // with use Params, we get back the id
  //console.log("id: " + id);
  const [coinData, setCoinData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // take data from arrays into an object
  const formatData = (data) => {
    return data.map((el) => {
      return {
        t: el[0],
        y: el[1].toFixed(2),
      };
    });
  };


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      //deconstruct values
      const [day, week, year, detail] = await Promise.all([await coinGecko.get(`/coins/${id}/market_chart/`, {
        params: {
          vs_currency: "usd",
          days: "1",
        },
      }),
      coinGecko.get(`/coins/${id}/market_chart/`, {
        params: {
          vs_currency: "usd",
          days: "7",
        },
      }),
      coinGecko.get(`/coins/${id}/market_chart/`, {
        params: {
          vs_currency: "usd",
          days: "365",
        },
      }),
      // we get back the info for that coin
      coinGecko.get("/coins/markets/", {
        params: {
          vs_currency: "usd",
          ids: id,
        },
      }),
      ]);

      setCoinData({
        day: formatData(day.data.prices),
        week: formatData(week.data.prices),
        year: formatData(year.data.prices),
        detail: detail.data[0],
      });

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const renderData = () => {
    // render conditionally
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <div className="coinlist">
        <HistoryChart data={coinData} />
        <CoinData />

      </div>
    )
  }

  return renderData();

};

export default CoinDetailPage;
