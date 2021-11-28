import React, { useRef, useEffect, useState } from "react";
import Chartjs from "chart.js";
import { historyOptions } from "../chartConfigs/chartConfigs";

const HistoryChart = ({ data }) => {
  // to reference Dom elements -> add a useRef 
  const chartRef = useRef();
  const {day, week, year, detail} = data;

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const chartInstance = new Chartjs(chartRef.current, {
        type: 'line',
        data: {
          datasets: [
            {
              label: '# of Votes',
              data: day,
              backgroundColor: "rgba(174, 305, 194, 0.5)",
              borderColor: "rgba(174, 305, 194, 0.4)",
              pointRadius: 0,
              borderWidth: 1
            },
          ],
        },

        options: {
          ...historyOptions,
        },
      });
    }
  });

  return (
    <div className="big-white border mt-2 rounded p-3">
      <div></div>
      <div>
        <canvas ref={chartRef} id="myChart" width={250} height={250}></canvas>
      </div>
    </div>

  );
};

export default HistoryChart;
