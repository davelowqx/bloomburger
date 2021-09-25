import React from "react";
import Header from "../../components/Layout/Header";
import Chart from "../../components/Chart";
import Select from "../../components/Select";
import { fetchData, parseAdrData } from "../../db";

export default function ADR() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [data, setData] = React.useState([]);
  const [selected, setSelected] = React.useState("BABA");

  const options = {
    BABA: { ord: "9988.HK", fx: "HKDUSD=X", r: 8 },
    BIDU: { ord: "9888.HK", fx: "HKDUSD=X", r: 8 },
    TCEHY: { ord: "0700.HK", fx: "HKDUSD=X", r: 1 },
    BILI: { ord: "9626.HK", fx: "HKDUSD=X", r: 1 },
    JD: { ord: "9618.HK", fx: "HKDUSD=X", r: 2 },
    GDS: { ord: "9698.HK", fx: "HKDUSD=X", r: 8 },
    ASX: { ord: "3711.TW", fx: "TWDUSD=X", r: 2 },
    IMOS: { ord: "8150.TW", fx: "TWDUSD=X", r: 20 },
    TSM: { ord: "2330.TW", fx: "TWDUSD=X", r: 5 },
    UMC: { ord: "2303.TW", fx: "TWDUSD=X", r: 5 },
    LPL: { ord: "034220.KS", fx: "KRWUSD=X", r: 0.5 },
  };

  //fetch and process data
  React.useEffect(async () => {
    setLoading(true);
    try {
      const adr = await fetchData(selected, "1d");
      const ord = await fetchData(options[selected].ord, "1d");
      const fx = await fetchData(options[selected].fx, "1d");
      const data = parseAdrData(adr, ord, fx, options[selected].r);
      setData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [selected]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Header>
        <Select
          selected={selected}
          setSelected={setSelected}
          options={Object.keys(options)}
        />
      </Header>
      <div
        className="d-flex justify-content-center align-items-center bg-secondary"
        style={{ width: "100%", height: "calc(100% - 56px)" }}
      >
        {loading && <div className="spinner-border secondary" />}
        {!loading && <Chart data={data} />}
      </div>
    </div>
  );
}
