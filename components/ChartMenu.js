export default function ChartMenu({
  interval,
  setInterval,
  chartType,
  setChartType,
}) {
  return (
    <div
      className="row bg-gray-light text-light w-100 mx-0"
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
            "1mo",
            "3mo",
          ].map((t, i) => (
            <button
              key={i}
              style={{ width: "10%", height: "1.5rem" }}
              className={`text-light border-1  ${
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
              style={{ width: "50%", height: "1.5rem" }}
              className={`text-light border-1  ${
                chartType === t ? "bg-blue" : "bg-gray"
              }`}
              onClick={() => setChartType(t)}
            >
              <img src={`/icons/${t}.svg`} style={{ height: "100%" }} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
