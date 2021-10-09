import React from "react";
import Layout from "../../components/Layout";
import ChartList from "../../components/ChartList";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";

export default function List() {
  const router = useRouter();
  const { list } = router.query;
  const [dual, setDual] = React.useState(false);
  const lists = {
    ussectors: [
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
    ],
    usindices: [
      { symbol: "^NDX", desc: "Nasdaq 100" },
      { symbol: "^GSPC", desc: "S&P 500" },
      { symbol: "^RUT", desc: "Russell 2000" },
      { symbol: "^DJI", desc: "Dow Jones 30" },
      { symbol: "^TNX", desc: "US10Y" },
      { symbol: "^VIX", desc: "CBOE Volatility Index" },
    ],

    globalindices: [
      { symbol: "^HSI", desc: "Hang Seng Index" },
      { symbol: "000001.SS", desc: "SSE Composite" },
      { symbol: "^KS11", desc: "KOSPI Composite" },
      { symbol: "^N225", desc: "Nikkei 225" },
      { symbol: "^FTSE", desc: "FTSE 1000" },
    ],
    currencies: [
      { symbol: "6E=F", desc: "Euro" },
      { symbol: "6A=F", desc: "Australian Dollar" },
      { symbol: "6J=F", desc: "Japanese Yen" },
      { symbol: "6C=F", desc: "Canadian Dollar" },
      { symbol: "6B=F", desc: "British Pound" },
      { symbol: "6M=F", desc: "Mexican Peso" },
      { symbol: "6S=F", desc: "Swiss Franc" },
      { symbol: "6N=F", desc: "New Zealand Dollar" },
    ],
    commodities: [
      { symbol: "NG=F", desc: "Natural Gas" },
      { symbol: "CL=F", desc: "Crude Oil" },
      { symbol: "GC=F", desc: "Gold" },
      { symbol: "SI=F", desc: "Silver" },
      { symbol: "HG=F", desc: "Copper" },
      { symbol: "ZC=F", desc: "Corn" },
    ],
    crypto: [
      { symbol: "BTC-USD", desc: "Bitcoin" },
      { symbol: "ETH-USD", desc: "Ethereum" },
      { symbol: "SOL1-USD", desc: "Solana" },
      { symbol: "DOGE-USD", desc: "Dogecoin" },
    ],
    custom: [],
  };
  console.log(lists[list]);

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
        <ChartList assets={lists[list] ?? []} title={""} dual={dual} />
      </div>
    </Layout>
  );
}
