import React from "react";
import Layout from "../../components/Layout";
import ChartList from "../../components/ChartList";

export default function Crypto() {
  const crypto = [
    { symbol: "BTC-USD", desc: "Bitcoin" },
    { symbol: "ETH-USD", desc: "Ethereum" },
    { symbol: "SOL1-USD", desc: "Solana" },
    { symbol: "DOGE-USD", desc: "Dogecoin" },
  ];

  return (
    <Layout>
      <div className="container-fluid bg-gray-dark text-light">
        <br />
        <ChartList assets={crypto} title={""} />
      </div>
    </Layout>
  );
}
