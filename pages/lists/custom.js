import React from "react";
import Layout from "../../components/Layout";
import ChartMenu from "../../components/ChartMenu";
import ChartData from "../../components/ChartData";
import InputMenu from "../../components/Layout/InputMenu";

export default function Custom() {
  const [interval, setInterval] = React.useState("1d");
  const [chartType, setChartType] = React.useState("candlestick");
  const [movingAverage, setMovingAverage] = React.useState(false);
  const [symbols, setSymbols] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState();

  React.useEffect(() => {
    try {
      const symbolsStored = JSON.parse(localStorage.getItem("watchlist")) ?? [];
      setLoading(true);
      setSymbols(symbolsStored);
    } catch (error) {
      setError(error.message);
      localStorage.setItem("watchlist", JSON.stringify([]));
    } finally {
      setLoading(false);
    }
  }, []);

  const setAndPersistSymbols = (symbols) => {
    console.log(symbols);
    localStorage.setItem("watchlist", JSON.stringify(symbols));
    setSymbols(symbols);
  };

  return (
    <Layout>
      <InputMenu
        callback={(field) =>
          !symbols.includes(field)
            ? setAndPersistSymbols([...symbols, field])
            : null
        }
      />
      <ChartMenu
        interval={interval}
        setInterval={setInterval}
        chartType={chartType}
        setChartType={setChartType}
        movingAverage={movingAverage}
        setMovingAverage={setMovingAverage}
      />
      <div className="container-fluid bg-gray-dark text-white pt-2">
        {symbols.map((symbol, i) => (
          <div key={i}>
            <div className="row">
              <div className="col-12 mb-2 px-3">
                <button
                  className="position-absolute bg-yellow"
                  style={{
                    zIndex: 10,
                    height: "fit-content",
                    right: "1rem",
                  }}
                  onClick={() =>
                    setAndPersistSymbols([
                      ...symbols.slice(0, i),
                      ...symbols.slice(i + 1),
                    ])
                  }
                >
                  x
                </button>
                <div
                  className="w-100 d-flex justify-content-center align-items-center "
                  style={{ height: "83vh" }}
                >
                  <ChartData
                    symbol={symbol}
                    interval={interval}
                    chartType={chartType}
                    movingAverage={movingAverage}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        {!symbols.length && (
          <div
            style={{ height: "calc(100vh - 11rem)" }}
            className="d-flex justify-content-center align-items-center text-white"
          >
            Your watchlist is empty. Add some symbols!
          </div>
        )}
        {error && <div>{error}</div>}
      </div>
    </Layout>
  );
}
