import React from "react";

export async function getServerSideProps(context) {
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

  const symbol = context.query.symbol;
  const data = await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://bloomburger.vercel.app"
    }/api/${symbol}`,
    {
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
    }
  )
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
          symbol: symbol.toUpperCase(),
          name: price.longName,
          sector: summaryProfile.sector,
          industry: summaryProfile.industry,
          marketCap: price.marketCap.raw,
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
        };
      }
    });
  return { props: { data } };
}

export default function Home({ data }) {
  const {
    symbol,
    name,
    sector,
    industry,
    marketCap,
    incomeStatementHistoryTTM,
  } = data;

  const {
    totalRevenue,
    grossProfit,
    researchDevelopment,
    sellingGeneralAdministrative,
    totalOtherIncomeExpenseNet,
    operatingIncome,
    ebit,
    netIncome,
  } = incomeStatementHistoryTTM;

  return (
    <table>
      <tr key={0}>
        <th>symbol</th>
        <th>name</th>
        <th>sector</th>
        <th>industry</th>
        <th>marketCap</th>
        <th>totalRevenueTTM</th>
        <th>grossProfitTTM</th>
        <th>researchDevelopmentTTM</th>
        <th>sellingGeneralAdministrativeTTM</th>
        <th>totalOtherIncomeExpenseNetTTM</th>
        <th>operatingIncomeTTM</th>
        <th>ebitTTM</th>
        <th>netIncomeTTM</th>
      </tr>
      <tr key={1}>
        <td>{symbol}</td>
        <td>{name}</td>
        <td>{sector}</td>
        <td>{industry}</td>
        <td>{marketCap}</td>
        <td>{totalRevenue}</td>
        <td>{grossProfit}</td>
        <td>{researchDevelopment}</td>
        <td>{sellingGeneralAdministrative}</td>
        <td>{totalOtherIncomeExpenseNet}</td>
        <td>{operatingIncome}</td>
        <td>{ebit}</td>
        <td>{netIncome}</td>
      </tr>
    </table>
  );
}
