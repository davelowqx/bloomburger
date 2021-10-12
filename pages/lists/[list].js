import React from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import ChartMenu from "../../components/ChartMenu";
import ChartData from "../../components/ChartData";

export default function List() {
  const router = useRouter();
  const { list } = router.query;
  const [interval, setInterval] = React.useState("1d");
  const [chartType, setChartType] = React.useState("candlestick");
  const [movingAverage, setMovingAverage] = React.useState(false);

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
      { symbol: { sym: "^IXIC", mode: "standard" }, desc: "Nasdaq Composite" },
      { symbol: { sym: "^TNX", mode: "standard" }, desc: "US10Y" },
      {
        symbol: { sym: "^VIX", mode: "standard" },
        desc: "CBOE Volatility Index",
      },
    ],

    globalindices: [
      { symbol: { sym: "^HSI", mode: "standard" }, desc: "Hang Seng Index" },
      {
        symbol: { sym: "000001.SS", mode: "standard" },
        desc: "SSE Composite Index",
      },
      {
        symbol: { sym: "399001.SZ", mode: "standard" },
        desc: "SZSE Component Index",
      },
      { symbol: { sym: "^N225", mode: "standard" }, desc: "Nikkei 225" },
      { symbol: { sym: "^FTSE", mode: "standard" }, desc: "FTSE 1000" },
      { symbol: { sym: "^KS11", mode: "standard" }, desc: "KOSPI Composite" },
    ],
    currencies: [
      { symbol: { sym: "6E=F", mode: "standard" }, desc: "Euro" },
      {
        symbol: { sym: "6A=F", mode: "standard" },
        desc: "Australian Dollar",
      },
      { symbol: { sym: "6J=F", mode: "standard" }, desc: "Japanese Yen" },
      {
        symbol: { sym: "6C=F", mode: "standard" },
        desc: "Canadian Dollar",
      },
      { symbol: { sym: "6B=F", mode: "standard" }, desc: "British Pound" },
      { symbol: { sym: "6M=F", mode: "standard" }, desc: "Mexican Peso" },
      { symbol: { sym: "6S=F", mode: "standard" }, desc: "Swiss Franc" },
      {
        symbol: { sym: "6N=F", mode: "standard" },
        desc: "New Zealand Dollar",
      },
    ],
    credit: [
      { symbol: { sym: "ZT=F", mode: "standard" }, desc: "2 Year T-Note" },
      { symbol: { sym: "ZF=F", mode: "standard" }, desc: "5 Year T-Note" },
      { symbol: { sym: "ZN=F", mode: "standard" }, desc: "10Y T-Note" },
      { symbol: { sym: "ZB=F", mode: "standard" }, desc: "30Y T-Bond" },
    ],
    commodities: [
      { symbol: { sym: "CL=F", mode: "standard" }, desc: "Crude Oil" },
      {
        symbol: { sym: "NG=F", mode: "standard" },
        desc: "Natural Gas Henry Hub",
      },
      { symbol: { sym: "RB=F", mode: "standard" }, desc: "RBOB Gasoline" },
      { symbol: { sym: "HO=F", mode: "standard" }, desc: "NY Harbor ULSD" },
      { symbol: { sym: "GC=F", mode: "standard" }, desc: "Gold" },
      { symbol: { sym: "SI=F", mode: "standard" }, desc: "Silver" },
      { symbol: { sym: "HG=F", mode: "standard" }, desc: "Copper" },
      { symbol: { sym: "ZC=F", mode: "standard" }, desc: "Corn" },
      { symbol: { sym: "ZS=F", mode: "standard" }, desc: "Soybean" },
      { symbol: { sym: "ZW=F", mode: "standard" }, desc: "Chicago SRW Wheat" },
      { symbol: { sym: "LE=F", mode: "standard" }, desc: "Live Cattle" },
    ],
    crypto: [
      { symbol: { sym: "BTC-USD", mode: "standard" }, desc: "Bitcoin" },
      { symbol: { sym: "ETH-USD", mode: "standard" }, desc: "Ethereum" },
      { symbol: { sym: "SOL1-USD", mode: "standard" }, desc: "Solana" },
      { symbol: { sym: "DOGE-USD", mode: "standard" }, desc: "Dogecoin" },
    ],
    ratios: [
      {
        symbol: { mode: "binary", a: "HYG", b: "TLT", op: "/" },
        desc: "High Yield / Treasuries",
      },
      {
        symbol: { mode: "binary", a: "XLY", b: "XLP", op: "/" },
        desc: "Discretionary / Staples",
      },
      {
        symbol: { mode: "binary", a: "IVW", b: "IVE", op: "/" },
        desc: "S&P 500 Growth / Value",
      },
      {
        symbol: { mode: "binary", a: "IWO", b: "IWN", op: "/" },
        desc: "Russell 2000 Growth / Value",
      },
      {
        symbol: { mode: "binary", a: "XLK", b: "SPY", op: "/" },
        desc: "S&P 500 Technology Dominance",
      },
      {
        symbol: { mode: "binary", a: "EEM", b: "SPY", op: "/" },
        desc: "Emerging Markets / S&P 500",
      },
      {
        symbol: { mode: "binary", a: "^TYX", b: "^FVX", op: "-" },
        desc: "US30Y - US05Y",
      },
    ],
  };

  return (
    <Layout>
      <ChartMenu
        interval={interval}
        setInterval={setInterval}
        chartType={chartType}
        setChartType={setChartType}
        movingAverage={movingAverage}
        setMovingAverage={setMovingAverage}
      />
      <div className="container-fluid bg-gray-dark text-light pt-3">
        {lists[list]?.map(({ symbol, desc }, i) => (
          <div key={i}>
            <div className={"row px-3"}>
              <h6>{desc}</h6>
            </div>
            <div className="row">
              <div className="col-12 mb-3 px-3">
                <div
                  className="w-100 d-flex justify-content-center align-items-center "
                  style={{ height: "83vh" }}
                >
                  <ChartData
                    symbol={symbol}
                    interval={interval}
                    chartType={chartType}
                    movingAverage={movingAverage}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
