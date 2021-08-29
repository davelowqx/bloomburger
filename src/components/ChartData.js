import React from "react";
import Chart from "./Chart";

export default function ChartData({ symbol, interval, width, height }) {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  const fetchData = (symbol) => {
    return fetch(
      `${
        process.env.NODE_ENV === "development"
          ? ""
          : "https://query2.finance.yahoo.com"
      }/v8/finance/chart/${symbol}?includeAdjustedClose=false&interval=${interval}&range=3y`
      // Valid intervals: [1m, 2m, 5m, 15m, 30m, 60m, 90m, 1h, 1d, 5d, 1wk, 1mo, 3mo]
    )
      .then((res) => res.json())
      .then((json) => {
        const { result, error } = json.chart;
        if (error === null) {
          const { timestamp, indicators } = result[0];
          return timestamp.map((t, i) => {
            return {
              time: t,
              open: indicators.quote[0].open[i],
              high: indicators.quote[0].high[i],
              low: indicators.quote[0].low[i],
              close: indicators.quote[0].close[i],
            };
          });
        } else {
          throw new Error(error.code);
        }
      });
  };

  React.useEffect(async () => {
    setLoading(true);
    const data = await fetchData(symbol);
    // console.log(symbol, data);
    setData(data);
    setLoading(false);
  }, []);

  return (
    <>
      {loading && (
        <div className="d-flex flex-column align-items-center">
          <div className="d-flex justify-content-center">
            <div className="spinner-border secondary" />
          </div>
        </div>
      )}
      {!loading && (
        <Chart
          data={data}
          width={width}
          text={`${symbol} (${interval == "1d" ? "D" : "W"})`}
          height={height}
        />
      )}
    </>
  );
}
