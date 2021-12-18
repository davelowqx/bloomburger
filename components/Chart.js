import React from "react";
import { createChart, CrosshairMode } from "lightweight-charts";

export default function Chart({
  data,
  text,
  chartType,
  movingAverage,
  timeRange,
  setTimeRange,
}) {
  const divRef = React.useRef();
  const chartRef = React.useRef();
  const seriesRef = React.useRef();
  const movingAverageRef = React.useRef();

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
        rightOffset: 7,
        timeVisible: true,
      },
    });

    movingAverageRef.current = chartRef.current.addLineSeries({
      color: "rgba(197, 203, 206, 0.5)",
      lineWidth: 1,
      crosshairMarkerVisible: false,
      priceLineVisible: false,
      lastValueVisible: false,
    });

    const handleResize = () => {
      let w = divRef.current.clientWidth;
      let h = divRef.current.clientHeight;
      // console.log(`width: ${w}, height: ${h}`);
      chartRef.current.resize(w, h);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    if (setTimeRange) {
      chartRef.current
        .timeScale()
        .subscribeVisibleTimeRangeChange(setTimeRange);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      chartRef.current.remove();
    };
  }, []);

  React.useEffect(() => {
    if (!timeRange || !chartRef.current || !seriesRef.current) {
      return;
    }
    chartRef.current.timeScale().setVisibleRange(timeRange);
  }, [timeRange]);

  React.useEffect(() => {
    if (!chartRef.current) {
      return;
    }
    if (seriesRef.current) {
      chartRef.current.removeSeries(seriesRef.current);
    }
    switch (chartType) {
      case "area":
        seriesRef.current = chartRef.current.addAreaSeries({
          lineColor: "#fff",
          topColor: "rgba(150,245,255,0.5)",
          bottomColor: "rgba(30,105,200,0.5)",
          lineWidth: 2,
          priceLineVisible: false,
        });
        break;
      case "line":
        seriesRef.current = chartRef.current.addLineSeries({
          lineColor: "#fff",
        });
        break;
      case "candlestick":
        seriesRef.current = chartRef.current.addCandlestickSeries({
          upColor: "rgba(0,0,0,0)",
          downColor: "#0383fe",
          borderDownColor: "#0383fe",
          borderUpColor: "#fff",
          wickDownColor: "#fff",
          wickUpColor: "#fff",
          priceLineVisible: false,
        });
        break;
      default:
        console.error(`invalid chartType: "${chartType}"`);
        return;
    }
    seriesRef.current.setData(data);
    chartRef.current.applyOptions({
      timeScale: {
        timeVisible: data[1].time - data[0].time < 86400,
      },
    });
  }, [data, chartType]);

  React.useEffect(() => {
    if (!chartRef.current) {
      return;
    }
    let movingAverageData = [];
    if (movingAverage) {
      const t = 20;
      for (let i = 0; i < data.length - t; i++) {
        const k = data.slice(i, i + t).reduce((a, x) => a + x.value, 0);
        movingAverageData.push({ time: data[i + t].time, value: k / t });
      }
    }
    movingAverageRef.current.setData(movingAverageData);
  }, [data, movingAverage]);

  return <div className="w-100 h-100" ref={divRef} />;
}
