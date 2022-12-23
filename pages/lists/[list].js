import React from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import ChartMenu from "../../components/ChartMenu";
import ChartData from "../../components/ChartData";
import { debounce, round } from "lodash";

export default function List() {
  const router = useRouter();
  const { list } = router.query;
  const [interval, setInterval] = React.useState("1d");
  const [chartType, setChartType] = React.useState("candlestick");
  const [movingAverage, setMovingAverage] = React.useState(false);

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
    ussectorsdominance: [
      { symbol: "XLE/SPY", desc: "Energy" },
      { symbol: "XLF/SPY", desc: "Financials" },
      { symbol: "XLK/SPY", desc: "Technology" },
      { symbol: "XLU/SPY", desc: "Utilities" },
      { symbol: "XLI/SPY", desc: "Industrials" },
      { symbol: "XLY/SPY", desc: "Discretionary" },
      { symbol: "XLP/SPY", desc: "Staples" },
      { symbol: "XLC/SPY", desc: "Communication" },
      { symbol: "XLB/SPY", desc: "Materials" },
      { symbol: "XLV/SPY", desc: "Healthcare" },
      { symbol: "XLRE/SPY", desc: "Real Estate" },
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
      { symbol: "000001.SS", desc: "SSE Composite Index" },
      { symbol:  "399001.SZ", desc: "SZSE Component Index" },
      { symbol:  "^N225", desc: "Nikkei 225" },
      { symbol:  "^FTSE", desc: "FTSE 1000" },
    ],
    currencies: [
      { symbol:  "6E=F", desc: "Euro" },
      { symbol:  "6A=F", desc: "Australian Dollar" },
      { symbol:  "6J=F", desc: "Japanese Yen" },
      { symbol:  "6C=F", desc: "Canadian Dollar" },
      { symbol:  "6B=F", desc: "British Pound" },
      { symbol:  "6M=F", desc: "Mexican Peso" },
      { symbol:  "6S=F", desc: "Swiss Franc" },
      { symbol:  "6N=F", desc: "New Zealand Dollar" },
    ],
    credit: [
      { symbol:  "ZT=F", desc: "2Y T-Note" },
      { symbol:  "ZF=F", desc: "5Y T-Note" },
      { symbol:  "ZN=F", desc: "10Y T-Note" },
      { symbol:  "ZB=F", desc: "30Y T-Bond" },
    ],
    commodities: [
      { symbol:  "CL=F", desc: "Crude Oil" },
      { symbol:  "NG=F", desc: "Natural Gas" },
      { symbol:  "GC=F", desc: "Gold" },
      { symbol:  "SI=F", desc: "Silver" },
      { symbol:  "HG=F", desc: "Copper" },
      { symbol:  "ZC=F", desc: "Corn" },
      { symbol:  "ZS=F", desc: "Soybean" },
    ],
    ratios: [
      { symbol: "HYG/TLT", desc: "High Yield / Treasuries" },
      { symbol: "EEM/SPY", desc: "Emerging Markets / S&P 500" },
      { symbol: "XLY/XLP", desc: "Discretionary / Staples" },
      { symbol: "IVW/IVE", desc: "S&P 500 Growth / Value" },
      { symbol: "IWO/IWN", desc: "Russell 2000 Growth / Value" },
      { symbol: "^TYX-^FVX", desc: "US30Y - US05Y" },
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
      <div className="bg-gray-dark text-white py-3 d-flex" style={{ flexWrap: "wrap" }}>
        {lists[list]?.map(({ symbol, desc }, i) => (
          <div key={i} style={{ flex: "1 1 50%", minWidth: "45%", maxWidth: "50%" }}>
              <div
                className="w-100"
                style={{ height: "40vh" }}
              >
                <ChartData
                  symbol={symbol}
                  title={desc}
                  interval={interval}
                  chartType={chartType}
                  movingAverage={movingAverage}
                />
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
