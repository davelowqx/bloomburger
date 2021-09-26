import React from "react";
import ChartData from "../components/ChartData";
import { Form } from "react-bootstrap";
import Header from "../components//Layout/Header";

export default function Home() {
  const [symbol, setSymbol] = React.useState("SPY");
  const [field, setField] = React.useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    setSymbol(field);
    setField("");
    console.log(symbol);
  };

  return (
    <div className="vw-100 vh-100 ">
      <Header />
      <div className="row bg-red text-light w-100 mx-0">
        <div className="col-5 px-0">
          <Form onSubmit={handleSubmit}>
            <input
              type="text"
              className="bg-yellow w-100"
              style={{ position: "relative" }}
              placeholder={`${symbol} US Equity`}
              value={field}
              onChange={(event) => setField(event.target.value.toUpperCase())}
            />
          </Form>
        </div>
        <div className="col-2 px-0">
          <button className="w-100 bg-red" type="submit">
            Submit
          </button>
        </div>
        <div className="col-5 px-2" style={{ textAlign: "right" }}>
          GPC Candle Chart
        </div>
      </div>
      <div className="w-100 " style={{ height: "calc(100% - 86px)" }}>
        <ChartData mode="standard" symbol={symbol} interval={"1d"} />
      </div>
    </div>
  );
}
