import React from "react";
import ChartData from "../components/ChartData";
import Header from "../components/Layout/Header";
import ChartMenu from "../components/ChartMenu";
import InputMenu from "../components/Layout/InputMenu";

export default function Home() {
  const [symbol, setSymbol] = React.useState("SPY");
  const [interval, setInterval] = React.useState("1d");
  const [chartType, setChartType] = React.useState("candlestick");
  const [movingAverage, setMovingAverage] = React.useState(false);

  return (
    <div className="vw-100 vh-100 ">
      <Header />
      <InputMenu callback={setSymbol} />
      <ChartMenu
        interval={interval}
        setInterval={setInterval}
        chartType={chartType}
        setChartType={setChartType}
        movingAverage={movingAverage}
        setMovingAverage={setMovingAverage}
      />
      <div className="w-100" style={{ height: "calc(100% - 7rem)" }}>
        <ChartData
          symbol={{ sym: symbol, mode: "standard" }}
          interval={interval}
          chartType={chartType}
          movingAverage={movingAverage}
        />
      </div>
    </div>
  );
}
