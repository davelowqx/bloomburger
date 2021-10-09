import React from "react";
import Layout from "../../src/components/Layout";
import ChartList from "../../src/components/ChartList";

export default function Currencies() {
  const currencies = [
    { symbol: "6E=F", desc: "Euro" },
    { symbol: "6A=F", desc: "Australian Dollar" },
    { symbol: "6J=F", desc: "Japanese Yen" },
    { symbol: "6C=F", desc: "Canadian Dollar" },
    { symbol: "6B=F", desc: "British Pound" },
    { symbol: "6M=F", desc: "Mexican Peso" },
    { symbol: "6S=F", desc: "Swiss Franc" },
    { symbol: "6N=F", desc: "New Zealand Dollar" },
  ];

  return (
    <Layout>
      <div className="container-fluid bg-gray-dark text-light">
        <br />
        <ChartList assets={currencies} title={""} />
      </div>
    </Layout>
  );
}
