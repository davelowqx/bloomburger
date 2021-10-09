import React from "react";
import ChartList from "../../components/ChartList";
import Layout from "../../components/Layout";

export default function Sectors() {
  const usSectors = [
    { symbol: "XLE", desc: "Energy" },
    { symbol: "XLF", desc: "Financials" },
    { symbol: "XLK", desc: "Technology" },
    { symbol: "XLU", desc: "Utilities" },
    { symbol: "XLI", desc: "Industrials" },
    { symbol: "XLY", desc: "Discretionary" },
    { symbol: "XLP", desc: "Staples" },
    { symbol: "XLC", desc: "Communication" },
    { symbol: "XLB", desc: "Materials" },
    { symbol: "XLV", desc: "Healthcare" },
    { symbol: "XLRE", desc: "Real Estate" },
  ];

  return (
    <Layout>
      <div className="container-fluid bg-gray-dark text-light">
        <br />
        <ChartList assets={usSectors} title={"US Sectors"} dual />
      </div>
    </Layout>
  );
}
