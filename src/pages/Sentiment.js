import React from "react";
import ChartData from "../components/ChartData";
import Layout from "../components/Layout";

export default function Home() {
  const ratios = [
    { a: "HYG", b: "TLT", op: "/", desc: "High Yield / Treasuries" },
    {
      a: "XLY",
      b: "XLP",
      op: "/",
      desc: "Discretionary : Staples",
    },
    {
      a: "EEM",
      b: "SPY",
      op: "/",
      desc: "Emerging Markets : SPY",
    },
    {
      a: "^TYX",
      b: "^FVX",
      op: "-",
      desc: "US30Y - US05Y",
    },
  ];

  return (
    <Layout>
      <div className="container-fluid bg-dark-grey text-light">
        <br />
        <ChartList assets={ratios} title={"US Sectors"} dual />
      </div>
    </Layout>
  );
}

function ChartList({ assets, title }) {
  return (
    <>
      <div className="row justify-content-center">
        <h4>{title}</h4>
      </div>
      {assets.map(({ a, b, op, desc }, i) => (
        <>
          <div className="row px-2">
            <h6>{desc}</h6>
          </div>
          <div className="row">
            <div className="col-12 mb-4 px-2">
              <div
                className="w-100 d-flex justify-content-center align-items-center "
                style={{ height: "90vh" }}
              >
                <ChartData
                  mode={"binary"}
                  symbol={{ a, b, op }}
                  interval={"1d"}
                />
              </div>
            </div>
          </div>
        </>
      ))}
      <div className="row px-2">
        <div className="col-12 border-top border-secondary mb-3"></div>
      </div>
    </>
  );
}
