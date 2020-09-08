import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
const LineChart = () => {
  const [data, setData] = useState([]);

  const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };

  const buildChartData = (data, caseType = "cases") => {
    const ChartData = [];
    let previousDataPoint;
    for (let date in data.cases) {
      if (previousDataPoint) {
        const DataPoints = {
          x: date,
          y: data[caseType][date] - previousDataPoint,
        };
        ChartData.push(DataPoints);
      }
      previousDataPoint = data[caseType][date];
    }
    return ChartData;
  };

  //https://disease.sh/v3/covid-19/historical/all?lastdays=120
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      .then((responce) => {
        return responce.json();
      })
      .then((data) => {
        console.log(data);
        let chartData = buildChartData(data, "cases");
        console.log(chartData);
        setData(chartData);
      });
  }, []);

  return (
    <div>
      <h3>Line Chart here</h3>
      {data?.length > 0 && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204,16,52,0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
        />
      )}
    </div>
  );
};

export default LineChart;
