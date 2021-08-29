import React from "react";
import ChartData from "../components/ChartData";
import { Container } from "react-bootstrap";
import Layout from "../components/Layout";

export default function Home() {
  const usIndices = [
    { symbol: "^NDX", desc: "Nasdaq 100" },
    { symbol: "^GSPC", desc: "S&P 500" },
    { symbol: "^RUT", desc: "Russell 2000" },
    { symbol: "^DJI", desc: "Dow Jones 30" },
    { symbol: "^TNX", desc: "US10Y" },
    { symbol: "^VIX", desc: "CBOE Volatility Index" },
  ];

  const globalIndices = [
    { symbol: "^HSI", desc: "Hang Seng Index" },
    { symbol: "000001.SS", desc: "SSE Composite" },
    { symbol: "^KS11", desc: "KOSPI Composite" },
    { symbol: "^N225", desc: "Nikkei 225" },
    { symbol: "^FTSE", desc: "FTSE 1000" },
  ];

  const commodities = [
    { symbol: "NG=F", desc: "Natural Gas" },
    { symbol: "CL=F", desc: "Crude Oil" },
    { symbol: "GC=F", desc: "Gold" },
    { symbol: "SI=F", desc: "Silver" },
    { symbol: "HG=F", desc: "Copper" },
    { symbol: "ZC=F", desc: "Corn" },
  ];

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

  const crypto = [
    { symbol: "BTC-USD", desc: "Bitcoin" },
    { symbol: "ETH-USD", desc: "Ethereum" },
    { symbol: "SOL1-USD", desc: "Solana" },
    { symbol: "DOGE-USD", desc: "Dogecoin" },
  ];

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
      <Container fluid>
        <ChartList assets={usIndices} title={"US Indices"} />
        <ChartList assets={globalIndices} title={"Global Indices"} dual />
        {/* <ChartList assets={currencies} title={"Currencies"} />
        <ChartList assets={commodities} title={"Commodities"} />
        <ChartList assets={crypto} title={"Crypto"} dual />
        <ChartList assets={usSectors} title={"US Sectors"} dual /> */}
      </Container>
    </Layout>
  );
}

function ChartList({ assets, title, dual }) {
  return (
    <>
      <div class="row justify-content-center">
        <h2>{title}</h2>
      </div>
      <div class="row justify-content-center">
        {assets.map(({ symbol, desc }, i) => (
          <>
            {dual && (
              <>
                <div class="row">
                  <h4>{desc}</h4>
                </div>
                <div class="row">
                  <div class="col-6 mb-3">
                    <ChartData
                      symbol={symbol}
                      interval={"1wk"}
                      width={0.46}
                      height={0.6}
                    />
                  </div>
                  <div class="col-6 mb-3">
                    <ChartData
                      symbol={symbol}
                      interval={"1d"}
                      width={0.46}
                      height={0.6}
                    />
                  </div>
                </div>
              </>
            )}
            {!dual && (
              <div class="col-6 mb-3">
                <ChartData
                  symbol={symbol}
                  interval={"1d"}
                  width={0.46}
                  height={0.6}
                />
              </div>
            )}
          </>
        ))}
      </div>
    </>
  );
}
