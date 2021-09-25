import React from "react";
import Chart from "./Chart";
import { fetchData, parseAdrData } from "../db";

export default function ChartData({ mode, symbol, interval }) {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState("");

  React.useEffect(async () => {
    setLoading(true);
    try {
      let result;
      switch (mode) {
        case "normal":
          console.log("hi");
          result = await fetchData(symbol, interval);
          break;
        case "adr":
          const adrData = await fetchData(symbol.adr, interval);
          const ordData = await fetchData(symbol.ord, interval);
          const fxData = await fetchData(symbol.fx, interval);
          result = parseAdrData(adrData, ordData, fxData, symbol.r);
          break;
        case "ratio":
          const numeratorData = await fetchData(symbol.fx, interval);
          const denominatorData = await fetchData(symbol.ord, interval);
        // result = null;
      }
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [symbol]);

  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center bg-light-grey">
      {loading && <div className="spinner-border secondary "></div>}
      {!loading && !error && (
        <Chart
          data={data}
          text={`${
            mode === "normal"
              ? symbol
              : mode === "adr"
              ? symbol.adr + " ∪ " + symbol.ord
              : mode === "ratio"
              ? symbol.numerator + " / " + symbol.denominator
              : "???"
          } (${
            ["1d", "5d", "1wk", "1mo", "3mo"].includes(interval)
              ? interval.substring(0, 2).toUpperCase()
              : interval
          })`}
        />
      )}
      {error && <div>Error</div>}
    </div>
  );
}
