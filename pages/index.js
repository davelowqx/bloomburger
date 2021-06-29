import Head from "next/head";
import Image from "next/image";
import React from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [data, setData] = React.useState([]);
  const [input, setInput] = React.useState("");
  const [symbols, setSymbols] = React.useState([]);
  React.useEffect(async () => {
    const raw = await Promise.all(
      symbols.map((symbol) =>
        fetch(`http://localhost:3000/api/${symbol}`, {
          headers: {
            modules: [
              "summaryDetail",
              "incomeStatementHistory",
              "incomeStatementHistoryQuarterly",
              "cashFlowStatementHistory",
              "cashFlowStatementHistoryQuarterly",
              "balanceSheetStatementHistory",
              "cashFlowStatementHistoryQuarterly",
            ],
          },
        })
          .then((res) => res.json())
          .then((json) => {
            const { result, error } = json.data.quoteSummary;
            if (error === null) {
              const {
                summaryDetail,
                incomeStatementHistoryQuarterly,
                incomeStatementHistory,
              } = result[0];
              return {
                summaryDetail,
                incomeStatementHistoryQuarterly:
                  incomeStatementHistoryQuarterly.incomeStatementHistory[0],
                incomeStatementHistory:
                  incomeStatementHistory.incomeStatementHistory[0],
              };
            }
          })
      )
    );
    setData(raw);
  }, [symbols]);

  const handleInput = (event) => setInput(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    setSymbols([...symbols, input]);
    setInput("");
  };

  //const [{ summaryDetail, incomeStatementHistory }] = data.quoteSummary.result;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInput} />
        <button>submit</button>
      </form>

      {data.map((company, i) => (
        <div key={i}>{JSON.stringify(company)}</div>
      ))}
    </div>
  );
}

/*
      <ul>
        <li>{summaryDetail.marketCap.raw}</li>
        <li>
          {incomeStatementHistory.incomeStatementHistory[0].totalRevenue.raw}
        </li>
      </ul>
      */
