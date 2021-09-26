import React from "react";
import Chart from "./Chart";
import { fetchData, parseAdrData, parseBinaryData } from "../db";

export default function ChartData({ mode, symbol, interval }) {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState("");

  React.useEffect(async () => {
    setLoading(true);
    try {
      let result;
      switch (mode) {
        case "standard":
          result = await fetchData(symbol, interval);
          break;
        case "adr":
          const adrData = await fetchData(symbol.adr, interval);
          const ordData = await fetchData(symbol.ord, interval);
          const fxData = await fetchData(symbol.fx, interval);
          result = parseAdrData(adrData, ordData, fxData, symbol.r);
          break;
        case "binary":
          const adata = await fetchData(symbol.a, interval);
          const bdata = await fetchData(symbol.b, interval);
          result = parseBinaryData(adata, bdata, symbol.op);
          break;
        default:
          result = [];
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
            mode === "standard"
              ? symbol
              : mode === "adr"
              ? symbol.adr + " ∪ " + symbol.ord
              : mode === "binary"
              ? symbol.a + symbol.op + symbol.b
              : "???"
          } (${
            ["1d", "5d", "1wk", "1mo", "3mo"].includes(interval)
              ? interval.substring(0, 2).toUpperCase()
              : interval
          })`}
        />
      )}
      {!loading && error && <div>{error}</div>}
    </div>
  );
}
