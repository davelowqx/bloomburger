import React from "react";
import ChartData from "./ChartData";

export default function ChartList({ assets, title, dual }) {
  return (
    <>
      {title && (
        <div className="row justify-content-center">
          <h4>{title}</h4>
        </div>
      )}
      {assets.map(({ symbol, desc }, i) => (
        <div key={i}>
          <div className="row px-3">
            <h6>{desc}</h6>
          </div>
          <div className="row">
            {dual && (
              <>
                <div className="col-12 col-xl-6 mb-4 px-2">
                  <div
                    className="w-100 d-flex justify-content-center align-items-center "
                    style={{ height: "70vh" }}
                  >
                    <ChartData
                      mode={"standard"}
                      symbol={symbol}
                      interval={"1wk"}
                    />
                  </div>
                </div>
                <div className="col-12 col-xl-6 mb-4 px-2">
                  <div
                    className="w-100 d-flex justify-content-center align-items-center "
                    style={{ height: "70vh" }}
                  >
                    <ChartData
                      mode={"standard"}
                      symbol={symbol}
                      interval={"1d"}
                    />
                  </div>
                </div>
              </>
            )}
            {!dual && (
              <div className="col-12 mb-4 px-3">
                <div
                  className="w-100 d-flex justify-content-center align-items-center "
                  style={{ height: "85vh" }}
                >
                  <ChartData
                    mode={"standard"}
                    symbol={symbol}
                    interval={"1d"}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
