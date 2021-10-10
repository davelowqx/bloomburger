import React from "react";
import ChartData from "../components/ChartData";
import { Form } from "react-bootstrap";
import Header from "../components/Layout/Header";

export default function Home() {
  const [symbol, setSymbol] = React.useState("SPY");
  const [field, setField] = React.useState("");
  const [interval, setInterval] = React.useState("1d");
  const [chartType, setChartType] = React.useState("candlestick");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (field) {
      setSymbol(field);
    }
    setField("");
  };

  return (
    <div className="vw-100 vh-100 ">
      <Header />
      <div
        className="row bg-red text-light w-100 mx-0"
        style={{ height: "2rem" }}
      >
        <div className="col-4 px-0">
          <Form onSubmit={handleSubmit}>
            <input
              type="text"
              className="bg-yellow w-100 border-1"
              style={{ height: "2rem", position: "relative" }}
              placeholder={`${symbol} US Equity`}
              value={field}
              onChange={(event) =>
                setField(event.target.value.trim().toUpperCase())
              }
            />
          </Form>
        </div>
        <div className="col-2 px-0">
          <button className="w-100 bg-red text-light" onClick={handleSubmit}>
            Submit
          </button>
        </div>
        <div className="col-6 px-2" style={{ textAlign: "right" }}>
          GPC Candle Chart
        </div>
      </div>
      <div
        className="row bg-gray-dark text-light w-100 mx-0"
        style={{ height: "1.5rem", fontSize: "smaller" }}
      >
        <div className="col-5 px-0">
          <div style={{ display: "flex", flexDirection: "row" }}>
            {[
              "1m",
              "5m",
              "15m",
              "30m",
              "1h",
              "4h",
              "1d",
              "1wk",
              "1mo",
              "3mo",
            ].map((i) => (
              <button
                style={{ width: "calc(100%/10)", height: "1.5rem" }}
                className={`text-light border-1  ${
                  interval === i ? "bg-blue" : "bg-gray"
                }`}
                onClick={() => setInterval(i)}
              >
                {i}
              </button>
            ))}
          </div>
        </div>
        <div className="col-1 px-0">
          <div style={{ display: "flex", flexDirection: "row" }}>
            {["candlestick", "area"].map((t) => (
              <button
                style={{ width: "50%", height: "1.5rem" }}
                className={`text-light border-1  ${
                  chartType === t ? "bg-blue" : "bg-gray"
                }`}
                onClick={() => setChartType(t)}
              >
                <img src={`/icons/${t}.svg`} style={{ height: "100%" }} />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="w-100" style={{ height: "calc(100% - 7rem)" }}>
        <ChartData
          symbol={{ sym: symbol, mode: "standard" }}
          interval={interval}
          chartType={chartType}
          range={
            ["1m"].includes(interval)
              ? "7d"
              : ["5m", "15m", "30m"].includes(interval)
              ? "60d"
              : ["1h", "4h"].includes(interval)
              ? "730d"
              : ["1d", "1wk"].includes(interval)
              ? "10y"
              : ["1mo"].includes(interval)
              ? "20y"
              : ["3mo"].includes(interval)
              ? "50y"
              : ""
          }
        />
      </div>
    </div>
  );
}
