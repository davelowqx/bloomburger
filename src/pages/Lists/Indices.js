import React from "react";
import Layout from "../../components/Layout";
import ChartList from "../../components/ChartList";

export default function Indices() {
  const usIndices = [
    // { symbol: "^NDX", desc: "Nasdaq 100" },
    // { symbol: "^GSPC", desc: "S&P 500" },
    // { symbol: "^RUT", desc: "Russell 2000" },
    // { symbol: "^DJI", desc: "Dow Jones 30" },
    { symbol: "^TNX", desc: "US10Y" },
    // { symbol: "^VIX", desc: "CBOE Volatility Index" },
  ];

  const globalIndices = [
    // { symbol: "^HSI", desc: "Hang Seng Index" },
    { symbol: "000001.SS", desc: "SSE Composite" },
    { symbol: "^KS11", desc: "KOSPI Composite" },
    { symbol: "^N225", desc: "Nikkei 225" },
    { symbol: "^FTSE", desc: "FTSE 1000" },
  ];

  return (
    <Layout>
      <div className="container-fluid bg-gray-dark text-light">
        <br />
        <ChartList assets={usIndices} title={"US Indices"} dual />
        <ChartList assets={globalIndices} title={"Global Indices"} dual />
      </div>
    </Layout>
  );
}
