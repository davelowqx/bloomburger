import React from "react";
import ChartList from "../../components/ChartList";
import Layout from "../../components/Layout";

export default function Complex() {
  const assets = [
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
      <div className="container-fluid bg-gray-dark text-light">
        <br />
        <ChartList assets={assets} title={""} />
      </div>
    </Layout>
  );
}
