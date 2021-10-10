import React from "react";
import Layout from "../../components/Layout";
import ChartList from "../../components/ChartList";
import { useRouter } from "next/router";

export default function List() {
  const router = useRouter();
  const { list } = router.query;
  const [dual, setDual] = React.useState(false);
  const lists = {
    ussectors: [
      { symbol: { sym: "XLE", mode: "standard" }, desc: "Energy" },
      { symbol: { sym: "XLF", mode: "standard" }, desc: "Financials" },
      { symbol: { sym: "XLK", mode: "standard" }, desc: "Technology" },
      { symbol: { sym: "XLU", mode: "standard" }, desc: "Utilities" },
      { symbol: { sym: "XLI", mode: "standard" }, desc: "Industrials" },
      { symbol: { sym: "XLY", mode: "standard" }, desc: "Discretionary" },
      { symbol: { sym: "XLP", mode: "standard" }, desc: "Staples" },
      { symbol: { sym: "XLC", mode: "standard" }, desc: "Communication" },
      { symbol: { sym: "XLB", mode: "standard" }, desc: "Materials" },
      { symbol: { sym: "XLV", mode: "standard" }, desc: "Healthcare" },
      { symbol: { sym: "XLRE", mode: "standard" }, desc: "Real Estate" },
    ],
    usindices: [
      { symbol: { sym: "^NDX", mode: "standard" }, desc: "Nasdaq 100" },
      { symbol: { sym: "^GSPC", mode: "standard" }, desc: "S&P 500" },
      { symbol: { sym: "^RUT", mode: "standard" }, desc: "Russell 2000" },
      { symbol: { sym: "^DJI", mode: "standard" }, desc: "Dow Jones 30" },
      { symbol: { sym: "^TNX", mode: "standard" }, desc: "US10Y" },
      {
        symbol: { sym: "^VIX", mode: "standard" },
        desc: "CBOE Volatility Index",
      },
    ],

    globalindices: [
      { symbol: { sym: "^HSI", mode: "standard" }, desc: "Hang Seng Index" },
      { symbol: { sym: "000001.SS", mode: "standard" }, desc: "SSE Composite" },
      { symbol: { sym: "^KS11", mode: "standard" }, desc: "KOSPI Composite" },
      { symbol: { sym: "^N225", mode: "standard" }, desc: "Nikkei 225" },
      { symbol: { sym: "^FTSE", mode: "standard" }, desc: "FTSE 1000" },
    ],
    currencies: [
      { symbol: { sym: "6E=F", mode: "standard" }, desc: "Euro" },
      { symbol: { sym: "6A=F", mode: "standard" }, desc: "Australian Dollar" },
      { symbol: { sym: "6J=F", mode: "standard" }, desc: "Japanese Yen" },
      { symbol: { sym: "6C=F", mode: "standard" }, desc: "Canadian Dollar" },
      { symbol: { sym: "6B=F", mode: "standard" }, desc: "British Pound" },
      { symbol: { sym: "6M=F", mode: "standard" }, desc: "Mexican Peso" },
      { symbol: { sym: "6S=F", mode: "standard" }, desc: "Swiss Franc" },
      { symbol: { sym: "6N=F", mode: "standard" }, desc: "New Zealand Dollar" },
    ],
    commodities: [
      { symbol: { sym: "NG=F", mode: "standard" }, desc: "Natural Gas" },
      { symbol: { sym: "CL=F", mode: "standard" }, desc: "Crude Oil" },
      { symbol: { sym: "GC=F", mode: "standard" }, desc: "Gold" },
      { symbol: { sym: "SI=F", mode: "standard" }, desc: "Silver" },
      { symbol: { sym: "HG=F", mode: "standard" }, desc: "Copper" },
      { symbol: { sym: "ZC=F", mode: "standard" }, desc: "Corn" },
    ],
    crypto: [
      { symbol: { sym: "BTC-USD", mode: "standard" }, desc: "Bitcoin" },
      { symbol: { sym: "ETH-USD", mode: "standard" }, desc: "Ethereum" },
      { symbol: { sym: "SOL1-USD", mode: "standard" }, desc: "Solana" },
      { symbol: { sym: "DOGE-USD", mode: "standard" }, desc: "Dogecoin" },
    ],
    custom: [],
    ratios: [
      {
        symbol: { mode: "binary", a: "HYG", b: "TLT", op: "/" },
        desc: "High Yield / Treasuries",
      },
      {
        symbol: { mode: "binary", a: "XLY", b: "XLP", op: "/" },
        desc: "Discretionary : Staples",
      },
      {
        symbol: { mode: "binary", a: "EEM", b: "SPY", op: "/" },
        desc: "Emerging Markets : SPY",
      },
      {
        symbol: { mode: "binary", a: "^TYX", b: "^FVX", op: "-" },
        desc: "US30Y - US05Y",
      },
    ],
  };

  return (
    <Layout>
      <div className="container-fluid bg-gray-dark text-light">
        <br />
        <label className="switch">
          <input
            type="checkbox"
            onClick={() => setDual(!dual)}
            checked={dual}
          />
          <span className="switch"></span>
        </label>
        <ChartList assets={lists[list] ?? []} mode={"standard"} dual={dual} />
      </div>
    </Layout>
  );
}
