import React from "react";

export default function ADR() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [data, setData] = React.useState([]);
  const [dimensions, setDimensions] = React.useState({
    width: 0,
    height: 0,
  });

  const ref = React.useRef();

  //get window size
  React.useEffect(() => {
    function handleResize() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //fetch and process data
  React.useEffect(async () => {
    setLoading(true);
    try {
      const adr = await fetchData("BABA");
      const ord = await fetchData("9988.HK");
      const fx = await fetchData("HKDUSD=X");
      const data = reduce(adr, ord, fx);
      setData(data);
      initializeChart(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  async function initializeChart(data) {
    const { createChart } = await import("lightweight-charts");
    const chart = createChart(ref.current, {
      width: 1600,
      height: 800,
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
      // crosshair: {
      //   mode: LightweightCharts.CrosshairMode.Normal,
      // },
      rightPriceScale: {
        borderColor: "rgba(197, 203, 206, 0.8)",
      },
      timeScale: {
        borderColor: "rgba(197, 203, 206, 0.8)",
      },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: "rgba(255, 144, 0, 1)",
      downColor: "#000",
      borderDownColor: "rgba(255, 144, 0, 1)",
      borderUpColor: "rgba(255, 144, 0, 1)",
      wickDownColor: "rgba(255, 144, 0, 1)",
      wickUpColor: "rgba(255, 144, 0, 1)",
    });

    candleSeries.setData(data);
  }

  //resize chart
  React.useEffect(() => {
    /*
    if (typeof chart !== undefined) {
      chart.resize(dimensions.width, dimensions.height);
      return () => {
        chart.remove();
      };
    }
    */
  }, [dimensions]);

  const reduce = (adr, ord, fx) => {
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
        data.push({
          time: ord.timestamp[j],
          open: (ord.open[j] * 8) / 7.75,
          high: (ord.high[j] * 8) / 7.75,
          low: (ord.low[j] * 8) / 7.75,
          close: (ord.close[j] * 8) / 7.75,
          origin: "ord",
        });
        j++;
      }
    }
    return data;
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div ref={ref} />
    </div>
  );
}

const fetchData = (symbol) => {
  return fetch(
    `/v8/finance/chart/${symbol}?includeAdjustedClose=false&interval=1d&range=2y`
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
