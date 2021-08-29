import React from "react";
import { createChart, CrosshairMode } from "lightweight-charts";

export default function Chart({ data, text, width, height }) {
  const ref = React.useRef();
  React.useEffect(() => {
    const chart = createChart(ref.current, {
      width: window.innerWidth * width,
      height: window.innerHeight * height,
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
      watermark: {
        color: "rgba(255, 255, 255, 0.9)",
        visible: !!text,
        text,
        fontSize: 24,
        horzAlign: "left",
        vertAlign: "top",
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: "rgba(197, 203, 206, 0.8)",
      },
      timeScale: {
        borderColor: "rgba(197, 203, 206, 0.8)",
      },
    });
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "rgba(0,0,0,0)",
      downColor: "#0383fe",
      borderDownColor: "#0383fe",
      borderUpColor: "#fff",
      wickDownColor: "#0383fe",
      wickUpColor: "#fff",
    });
    candlestickSeries.setData(
      data.filter(
        ({ open, high, low, close }) =>
          open != null && high != null && low != null && close != null
      )
    );

    return () => {
      chart.remove();
    };
  }, [data]);

  return <div ref={ref} />;
}
