import React from "react";
import Layout from "../components/Layout";
import ChartList from "../components/ChartList";

export default function Commodities() {
  const commodities = [
    { symbol: "NG=F", desc: "Natural Gas" },
    { symbol: "CL=F", desc: "Crude Oil" },
    { symbol: "GC=F", desc: "Gold" },
    { symbol: "SI=F", desc: "Silver" },
    { symbol: "HG=F", desc: "Copper" },
    { symbol: "ZC=F", desc: "Corn" },
  ];

  return (
    <Layout>
      <div className="container-fluid bg-gray-dark text-light">
        <br />
        <ChartList assets={commodities} title={""} />
      </div>
    </Layout>
  );
}
