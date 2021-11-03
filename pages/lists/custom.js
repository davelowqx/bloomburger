import React from "react";
import Layout from "../../components/Layout";
import ChartMenu from "../../components/ChartMenu";
import ChartData from "../../components/ChartData";
import InputMenu from "../../components/Layout/InputMenu";

export default function Custom() {
  const [interval, setInterval] = React.useState("1d");
  const [chartType, setChartType] = React.useState("candlestick");
  const [movingAverage, setMovingAverage] = React.useState(false);
  const [list, setList] = React.useState([]);

  return (
    <Layout>
      <InputMenu
        callback={(field) =>
          setList([
            ...list,
            { symbol: { sym: field, mode: "standard" }, desc: "" },
          ])
        }
      />
      <ChartMenu
        interval={interval}
        setInterval={setInterval}
        chartType={chartType}
        setChartType={setChartType}
        movingAverage={movingAverage}
        setMovingAverage={setMovingAverage}
      />
      <div className="container-fluid bg-gray-dark text-white pt-2">
        {list.map(({ symbol, desc }, i) => (
          <div key={i}>
            <div className="row px-3">
              <h6>{desc}</h6>
            </div>
            <div className="row">
              <div className={"col-12 mb-2 px-3"}>
                <div
                  className="w-100 d-flex justify-content-center align-items-center "
                  style={{ height: "83vh" }}
                >
                  <ChartData
                    symbol={symbol}
                    interval={interval}
                    chartType={chartType}
                    movingAverage={movingAverage}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        {!list.length && (
          <div
            style={{ height: "calc(100vh - 11rem)" }}
            className="d-flex justify-content-center align-items-center text-white"
          >
            Your watchlist is empty. Add some symbols!
          </div>
        )}
      </div>
    </Layout>
  );
}
