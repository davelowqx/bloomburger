import Head from "next/head";
import Image from "next/image";
import React from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [data, setData] = React.useState([]);
  const [input, setInput] = React.useState("");
  const [symbols, setSymbols] = React.useState([]);

  const incomeStatementMapper = (obj) => {
    return {
      endDate: obj.endDate.fmt,
      totalRevenue: obj.totalRevenue.raw,
      grossProfit: obj.grossProfit.raw,
      researchDevelopment: obj.researchDevelopment.raw,
      sellingGeneralAdministrative: obj.sellingGeneralAdministrative.raw,
      totalOtherIncomeExpenseNet: obj.totalOtherIncomeExpenseNet.raw,
      operatingIncome: obj.operatingIncome.raw,
      ebit: obj.ebit.raw,
      netIncome: obj.netIncome.raw,
    };
  };
  const incomeStatementReducer = (accum, curr) => {
    return {
      totalRevenue: curr.totalRevenue + accum.totalRevenue,
      grossProfit: curr.grossProfit + accum.grossProfit,
      researchDevelopment: curr.researchDevelopment + accum.researchDevelopment,
      sellingGeneralAdministrative:
        curr.sellingGeneralAdministrative + accum.sellingGeneralAdministrative,
      totalOtherIncomeExpenseNet:
        curr.totalOtherIncomeExpenseNet + accum.totalOtherIncomeExpenseNet,
      operatingIncome: curr.operatingIncome + accum.operatingIncome,
      ebit: curr.ebit + accum.ebit,
      netIncome: curr.netIncome + accum.netIncome,
    };
  };

  const cashFlowStatementMapper = (obj) => {
    return {
      endDate: obj.endDate.fmt,
      depreciation: obj.depreciation.raw,
      totalCashFromOperatingActivities:
        obj.totalCashFromOperatingActivities.raw,
      capitalExpenditures: obj.capitalExpenditures.raw,
      investments: obj.investments.raw,
      totalCashflowsFromInvestingActivities:
        obj.totalCashflowsFromInvestingActivities.raw,
      netBorrowings: obj.netBorrowings.raw,
      totalCashFromFinancingActivities:
        obj.totalCashFromFinancingActivities.raw,
    };
  };

  const cashFlowStatementReducer = (accum, curr) => {
    return {
      depreciation: accum.depreciation + curr.depreciation,
      totalCashFromOperatingActivities:
        accum.totalCashFromOperatingActivities +
        curr.totalCashFromOperatingActivities,
      capitalExpenditures: accum.capitalExpenditures + curr.capitalExpenditures,
      investments: accum.investments + curr.investments,
      totalCashflowsFromInvestingActivities:
        accum.totalCashflowsFromInvestingActivities +
        curr.totalCashflowsFromInvestingActivities,
      netBorrowings: accum.netBorrowings + curr.netBorrowings,
      totalCashFromFinancingActivities:
        accum.totalCashFromFinancingActivities +
        curr.totalCashFromFinancingActivities,
    };
  };
  const balanceSheetMapper = (obj) => {
    return {
      endDate: obj.endDate.fmt,
      cash: obj.cash.raw,
    };
  };

  React.useEffect(async () => {
    const raw = await Promise.all(
      symbols.map((symbol) =>
        fetch(`http://localhost:3000/api/${symbol}`, {
          headers: {
            modules: [
              "price",
              "summaryProfile",
              "incomeStatementHistory",
              "incomeStatementHistoryQuarterly",
              "cashflowStatementHistory",
              "cashflowStatementHistoryQuarterly",
              "balanceSheetHistory",
              "balanceSheetHistoryQuarterly",
              "summaryProfile",
            ],
          },
        })
          .then((res) => res.json())
          .then((json) => {
            const { result, error } = json.data.quoteSummary;
            if (error === null) {
              const {
                price,
                summaryProfile,
                incomeStatementHistoryQuarterly,
                incomeStatementHistory,
                cashflowStatementHistory,
                cashflowStatementHistoryQuarterly,
                //balanceSheetHistory,
                //balanceSheetHistoryQuarterly,
              } = result[0];

              return {
                [symbol.toUpperCase()]: {
                  marketCap: price.marketCap.raw,
                  industry: summaryProfile.industry,
                  sector: summaryProfile.sector,
                  name: price.longName,
                  /*
                  incomeStatementHistory:
                    incomeStatementHistory.incomeStatementHistory.map(
                      incomeStatementMapper
                    ),
                    */
                  incomeStatementHistoryTTM:
                    incomeStatementHistoryQuarterly.incomeStatementHistory
                      .map(incomeStatementMapper)
                      .reduce(incomeStatementReducer),

                  /*
                  cashflowStatementHistory:
                    cashflowStatementHistory.cashflowStatements.map(
                      cashFlowStatementMapper
                    ),
                  cashflowStatementHistoryTTM:
                    cashflowStatementHistoryQuarterly.cashflowStatements
                      .map(cashFlowStatementMapper)
                      .reduce(cashFlowStatementReducer),
                  balanceSheetHistory:
                    balanceSheetHistory.balanceSheetStatements.map(
                      balanceSheetMapper
                    ),
                  balanceSheetHistoryQuarterly:
                    balanceSheetHistoryQuarterly.balanceSheetStatements.map(
                      balanceSheetMapper
                    ),
                      */
                },
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
