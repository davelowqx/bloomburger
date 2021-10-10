import React from "react";
import { fetchData, parseAdrData, parseBinaryData } from "./db";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("./Chart"), {
  ssr: false,
});

export default function ChartData({
  symbol,
  interval = "1d",
  range = "5y",
  chartType = "candlestick",
}) {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState("");

  const [symbolMemo, setSymbolMemo] = React.useState(symbol);

  React.useEffect(() => {
    if (JSON.stringify(symbol) !== JSON.stringify(symbolMemo)) {
      setSymbolMemo(symbol);
    }
  }, [symbol]);

  React.useEffect(async () => {
    console.log(`fetching ${JSON.stringify(symbol)}`);
    setLoading(true);
    setError(null);
    try {
      let result;
      switch (symbol.mode) {
        case "standard":
          result = await fetchData(symbol.sym, interval, range);
          break;
        case "adr":
          const adrData = await fetchData(symbol.adr, interval, range);
          const ordData = await fetchData(symbol.ord, interval, range);
          const fxData = await fetchData(symbol.fx, interval, range);
          result = parseAdrData(adrData, ordData, fxData, symbol.r);
          break;
        case "binary":
          const adata = await fetchData(symbol.a, interval, range);
          const bdata = await fetchData(symbol.b, interval, range);
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
  }, [interval, symbolMemo]);

  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center bg-gray text-light">
      {loading && <div className="spinner-border secondary "></div>}
      {!loading && !error && (
        <Chart
          data={data}
          chartType={chartType}
          text={`${
            symbol.mode === "standard"
              ? symbol.sym
              : symbol.mode === "adr"
              ? symbol.adr + " ∪ " + symbol.ord
              : symbol.mode === "binary"
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
