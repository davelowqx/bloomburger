import React from "react";
import { createChart, CrosshairMode } from "lightweight-charts";

export default function Chart({ data, text, chartType }) {
  const divRef = React.useRef();
  const chartRef = React.useRef();
  const seriesRef = React.useRef();

  React.useEffect(() => {
    chartRef.current = createChart(divRef.current, {
      layout: {
        backgroundColor: "#000",
        textColor: "#fff",
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
        borderColor: "#fff",
      },
      timeScale: {
        borderColor: "#fff",
      },
    });

    const handleResize = () => {
      let w = divRef.current.clientWidth;
      let h = divRef.current.clientHeight;
      // console.log(`width: ${w}, height: ${h}`);
      chartRef.current.resize(w, h);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartRef.current.remove();
    };
  }, []);

  React.useEffect(() => {
    if (seriesRef.current && chartRef.current) {
      console.log("data or chartType changed");
      chartRef.current.removeSeries(seriesRef.current);
    }
    switch (chartType) {
      case "area":
        seriesRef.current = chartRef.current?.addAreaSeries({
          lineColor: "#fff",
          topColor: "rgba(150,245,255,0.5)",
          bottomColor: "rgba(30,105,200,0.5)",
          lineWidth: 2,
        });
        break;
      case "line":
        seriesRef.current = chartRef.current?.addLineSeries({
          lineColor: "#fff",
        });
        break;
      case "candlestick":
        seriesRef.current = chartRef.current?.addCandlestickSeries({
          upColor: "rgba(0,0,0,0)",
          downColor: "#0383fe",
          borderDownColor: "#0383fe",
          borderUpColor: "#fff",
          wickDownColor: "#fff",
          wickUpColor: "#fff",
        });
        break;
      default:
        console.error(`invalid chartType: "${chartType}"`);
    }
    seriesRef.current.setData(data);
    chartRef.current?.applyOptions({
      timeScale: {
        rightOffset: 3,
      },
    });
  }, [data, chartType]);

  return (
    <>
      <div className="w-100 h-100" ref={divRef} />
    </>
  );
}
