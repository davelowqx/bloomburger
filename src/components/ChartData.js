import React from "react";
import Chart from "./Chart";
import { fetchData } from "../db";

export default function ChartData({ symbol, interval }) {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  React.useEffect(async () => {
    setLoading(true);
    const data = await fetchData(symbol, interval);
    // console.log(symbol, data);
    setData(data);
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <div className="spinner-border secondary "></div>}
      {!loading && (
        <Chart
          data={data}
          text={`${symbol} (${interval == "1d" ? "D" : "W"})`}
        />
      )}
    </>
  );
}
