import React from "react";
import { fetchData, parseBinaryData } from "./db";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("./Chart"), {
  ssr: false,
});

export default function ChartData({
  symbol,
  title = "",
  interval = "1d",
  chartType = "candlestick",
  movingAverage = false,
}) {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState("");

  React.useEffect(async () => {
    const tokens = symbol.split(/[\+\-\*\/]/);
    if (tokens.length > 2) return;

    const range = ["1m"].includes(interval)
      ? "7d"
      : ["5m", "15m", "30m"].includes(interval)
      ? "60d"
      : ["1h", "4h"].includes(interval)
      ? "730d"
      : ["1d", "1wk"].includes(interval)
      ? "10y"
      : ["1mo"].includes(interval)
      ? "20y"
      : "";
    setLoading(true);
    setError(null);

    let result = [];
    try {
      if (tokens.length == 1) { 
          result = await fetchData(tokens[0], interval, range);
          break;
      } else {
          const first = await fetchData(tokens[0], interval, range);
          const second = await fetchData(tokens[1], interval, range);
          result = parseBinaryData(first, second, symbol.charAt(tokens[0].length));
          break;
      }
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setData(result);
      setLoading(false);
    }
  }, [interval, symbol]);

  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center bg-gray text-white">
      {loading && <div className="spinner-border secondary "></div>}
      {!loading && !error && (
        <Chart
          data={data}
          chartType={chartType}
          movingAverage={movingAverage}
          text={`${title ? title + " | " : ""}${symbol} (${
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
