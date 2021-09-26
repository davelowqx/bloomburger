import React from "react";
import ChartList from "../components/ChartList";
import Layout from "../components/Layout";

export default function Sentiment() {
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
        <ChartList assets={ratios} title={""} />
      </div>
    </Layout>
  );
}
