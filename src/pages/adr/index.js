import React from "react";
import { createChart } from "lightweight-charts";
import Header from "../../components/Layout/Header";
import Select from "./Select";

export default function ADR() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [data, setData] = React.useState([]);
  const [selected, setSelected] = React.useState("BABA");

  const options = {
    BABA: { ord: "9988.HK", fx: "HKDUSD=X", r: 8 },
    BIDU: { ord: "9888.HK", fx: "HKDUSD=X", r: 8 },
    TCEHY: { ord: "0700.HK", fx: "HKDUSD=X", r: 1 },
    BILI: { ord: "9626.HK", fx: "HKDUSD=X", r: 1 },
    JD: { ord: "9618.HK", fx: "HKDUSD=X", r: 2 },
    GDS: { ord: "9698.HK", fx: "HKDUSD=X", r: 8 },
    ASX: { ord: "3711.TW", fx: "TWDUSD=X", r: 2 },
    IMOS: { ord: "8150.TW", fx: "TWDUSD=X", r: 20 },
    TSM: { ord: "2330.TW", fx: "TWDUSD=X", r: 5 },
    UMC: { ord: "2303.TW", fx: "TWDUSD=X", r: 5 },
    LPL: { ord: "034220.KS", fx: "KRWUSD=X", r: 0.5 },
  };

  let chart;

  const ref = React.useRef();

  //fetch and process data
  React.useEffect(async () => {
    setLoading(true);
    try {
      const adr = await fetchData(selected);
      const ord = await fetchData(options[selected].ord);
      const fx = await fetchData(options[selected].fx);
      const data = parseData(adr, ord, fx, options[selected].r);
      console.log(data);
      setData(data);
      chart = initializeChart(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
    return () => chart.remove();
  }, [selected]);

  function initializeChart(data) {
    const chart = createChart(ref.current, {
      width: window.innerWidth,
      height: window.innerHeight * 0.9,
      layout: {
        backgroundColor: "#000000",
        textColor: "rgba(255, 255, 255, 0.9)",
      },
      grid: {
        vertLines: {
          color: "rgba(197, 203, 206, 0.5)",
        },
        horzLines: {
          color: "rgba(197, 203, 206, 0.5)",
        },
      },
      crosshair: {
        // mode: LightweightCharts.CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: "rgba(197, 203, 206, 0.8)",
      },
      timeScale: {
        borderColor: "rgba(197, 203, 206, 0.8)",
      },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: "rgba(0,0,0,0)",
      downColor: "#0383fe",
      borderDownColor: "#0383fe",
      borderUpColor: "#fff",
      wickDownColor: "#0383fe",
      wickUpColor: "#fff",
    });

    candleSeries.setData(data);
    return chart;
  }

  const parseData = (adr, ord, fx, r) => {
    const fxmap = fx.timestamp.reduce((accum, curr, i) => {
      const dateStr = new Date(fx.timestamp[i] * 1000).toDateString();
      return { ...accum, [dateStr]: fx.open[i] };
    }, {});

    const data = [];
    const len = adr.timestamp.length + ord.timestamp.length;
    let i = 0,
      j = 0;
    for (let k = 0; k < len; k++) {
      if (j === ord.timestamp.length || adr.timestamp[i] < ord.timestamp[j]) {
        data.push({
          time: adr.timestamp[i],
          open: adr.open[i],
          high: adr.high[i],
          low: adr.low[i],
          close: adr.close[i],
          origin: "adr",
        });
        i++;
      } else if (
        i === adr.timestamp.length ||
        adr.timestamp[i] > ord.timestamp[j]
      ) {
        const time = ord.timestamp[j];
        const dateStr = new Date(time * 1000).toDateString();
        data.push({
          time: ord.timestamp[j],
          open: ord.open[j] * r * fxmap[dateStr],
          high: ord.high[j] * r * fxmap[dateStr],
          low: ord.low[j] * r * fxmap[dateStr],
          close: ord.close[j] * r * fxmap[dateStr],
          origin: "ord",
        });
        j++;
      }
    }
    return data;
  };

  return (
    <>
      <Header />
      <Select
        selected={selected}
        setSelected={setSelected}
        options={Object.keys(options)}
      />
      <div ref={ref} />;
    </>
  );
}

const fetchData = (symbol) => {
  return fetch(
    `/v8/finance/chart/${symbol}?includeAdjustedClose=false&interval=1d&range=5y`
  )
    .then((res) => res.json())
    .then((json) => {
      const { result, error } = json.chart;
      if (error === null) {
        const { timestamp, indicators } = result[0];
        return {
          timestamp,
          open: indicators.quote[0].open,
          high: indicators.quote[0].high,
          low: indicators.quote[0].low,
          close: indicators.quote[0].close,
          volume: indicators.quote[0].volume,
        };
      } else {
        throw new Error(error.code);
      }
    });
};
