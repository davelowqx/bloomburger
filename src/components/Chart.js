import React from "react";
import { createChart } from "lightweight-charts";

export default function Chart({ data }) {
  const ref = React.useRef();
  let candlestickSeries;
  React.useEffect(() => {
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
    candlestickSeries = chart.addCandlestickSeries({
      upColor: "rgba(0,0,0,0)",
      downColor: "#0383fe",
      borderDownColor: "#0383fe",
      borderUpColor: "#fff",
      wickDownColor: "#0383fe",
      wickUpColor: "#fff",
    });
    candlestickSeries.setData(data);

    return () => {
      chart.remove();
    };
  }, [data]);

  return <div ref={ref} />;
}
