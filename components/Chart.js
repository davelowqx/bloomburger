import React from "react";
import { createChart, CrosshairMode } from "lightweight-charts";

export default function Chart({ data, text }) {
  const ref = React.useRef();
  let chart;
  let candlestickSeries;

  const handleResize = () => {
    let w = ref.current?.clientWidth;
    let h = ref.current?.clientHeight;
    // console.log(`width: ${w}, height: ${h}`);
    chart.resize(w, h);
  };

  React.useEffect(() => {
    chart = createChart(ref.current, {
      layout: {
        backgroundColor: "#000000",
        textColor: "rgba(255, 255, 255, 0.9)",
      },
      grid: {
        vertLines: {
          color: "rgba(197, 203, 206, 0.2)",
        },
        horzLines: {
          color: "rgba(197, 203, 206, 0.2)",
        },
      },
      watermark: {
        color: "#ffa028",
        visible: !!text,
        text,
        fontSize: 16,
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

    handleResize();

    candlestickSeries = chart.addCandlestickSeries({
      upColor: "rgba(0,0,0,0)",
      downColor: "#0383fe",
      borderDownColor: "#0383fe",
      borderUpColor: "#fff",
      wickDownColor: "#fff",
      wickUpColor: "#fff",
    });

    window.addEventListener("resize", handleResize);

    return () => chart.remove();
  }, []);

  React.useEffect(() => {
    candlestickSeries.setData(data);
    chart.applyOptions({
      timeScale: {
        rightOffset: 3,
      },
    });
  }, [data]);

  return (
    <>
      <div className="w-100 h-100" ref={ref} />
    </>
  );
}
