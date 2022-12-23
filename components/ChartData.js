import React from "react";
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
    if (tokens.length > 2) {
      setError("Invalid");
      setData([])
      return;
    };

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

    try {
      const data = await fetch(
        `/api/charts/${encodeURIComponent(symbol)}?interval=${interval}&range=${range}`
      ).then((res) => res.json());
      if (data?.error) throw new Error(`${symbol}: ${error}`);
      setData(data);
    } catch (err) {
      setError(err.message);
    } 

    setLoading(false);
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
