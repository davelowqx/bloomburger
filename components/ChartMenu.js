import Image from "next/image";

export default function ChartMenu({
  interval,
  setInterval,
  chartType,
  setChartType,
  movingAverage,
  setMovingAverage,
}) {
  return (
    <div
      className="row bg-gray-light text-white w-100 mx-0"
      style={{ height: "1.5rem", fontSize: "smaller" }}
    >
      <div className="col-5 px-0">
        <div style={{ display: "flex", flexDirection: "row" }}>
          {[
            "1m",
            "5m",
            "15m",
            "30m",
            "1h",
            "4h",
            "1d",
            "1wk",
            "1mo"
          ].map((t) => (
            <button
              key={t}
              style={{ width: "11.11%", height: "1.5rem" }}
              className={`text-white border-1  ${
                interval === t ? "bg-blue" : "bg-gray"
              }`}
              onClick={() => setInterval(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="col-1 px-0">
        <div style={{ display: "flex", flexDirection: "row" }}>
          {["candlestick", "area"].map((t, i) => (
            <button
              key={i}
              className={`text-white border-1  ${
                chartType === t ? "bg-blue" : "bg-gray"
              }`}
              onClick={() => setChartType(t)}
            >
              <img
                src={`/icons/${t}.svg`}
                style={{ maxHeight: "100%", maxWidth: "80%" }}
              />
            </button>
          ))}
        </div>
      </div>
      <div className="col-6 px-0 ">
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <input
            type="checkbox"
            checked={movingAverage}
            onChange={() => setMovingAverage(!movingAverage)}
          />
          &nbsp;Mov Avgs
        </div>
      </div>
    </div>
  );
}
