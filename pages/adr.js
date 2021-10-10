import React from "react";
import Header from "../components/Layout/Header";
import Select from "../components/Select";
import ChartData from "../components/ChartData";

export default function Adr() {
  const [symbol, setSymbol] = React.useState("BABA");

  const options = {
    BABA: { adr: "BABA", ord: "9988.HK", fx: "HKDUSD=X", r: 8 },
    BIDU: { adr: "BIDU", ord: "9888.HK", fx: "HKDUSD=X", r: 8 },
    TCEHY: { adr: "TCEHY", ord: "0700.HK", fx: "HKDUSD=X", r: 1 },
    BILI: { adr: "BILI", ord: "9626.HK", fx: "HKDUSD=X", r: 1 },
    JD: { adr: "JD", ord: "9618.HK", fx: "HKDUSD=X", r: 2 },
    GDS: { adr: "GDS", ord: "9698.HK", fx: "HKDUSD=X", r: 8 },
    PTR: { adr: "PTR", ord: "0857.HK", fx: "HKDUSD=X", r: 100 },
    SNP: { adr: "SNP", ord: "0386.HK", fx: "HKDUSD=X", r: 100 },
    SONY: { adr: "SONY", ord: "6758.T", fx: "JPYUSD=X", r: 1 },
    CAJ: { adr: "CAJ", ord: "7751.T", fx: "JPYUSD=X", r: 1 },
    MUFG: { adr: "MUFG", ord: "8306.T", fx: "JPYUSD=X", r: 1 },
    LFC: { adr: "LFC", ord: "2628.HK", fx: "HKDUSD=X", r: 5 },
    ASX: { adr: "ASX", ord: "3711.TW", fx: "TWDUSD=X", r: 2 },
    IMOS: { adr: "IMOS", ord: "8150.TW", fx: "TWDUSD=X", r: 20 },
    TSM: { adr: "TSM", ord: "2330.TW", fx: "TWDUSD=X", r: 5 },
    UMC: { adr: "UMC", ord: "2303.TW", fx: "TWDUSD=X", r: 5 },
    LPL: { adr: "LPL", ord: "034220.KS", fx: "KRWUSD=X", r: 0.5 },
  };

  return (
    <div className="vw-100 vh-100 ">
      <Header>
        <Select
          selected={symbol}
          setSelected={setSymbol}
          options={Object.keys(options)}
        />
      </Header>
      <div className="w-100" style={{ height: "calc(100% - 3.5rem)" }}>
        <ChartData
          mode="adr"
          symbol={{ ...options[symbol], mode: "adr" }}
          interval="1d"
        />
      </div>
    </div>
  );
}
