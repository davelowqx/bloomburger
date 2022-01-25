import Table from "../../components/Table";

export async function getServerSideProps(context) {
  const objectSummer = (accum, curr) => {
    for (let key in accum) {
      if (typeof curr[key] === "number") {
        accum[key] += curr[key];
      } else if (key !== "endDate") {
      } else {
        accum[key] = NaN;
      }
    }
    return accum;
  };

  const suffixKeys = (obj, suffix) => {
    const suffixed = {};
    for (let key in obj) {
      suffixed[`${key}${suffix}`] = obj[key];
    }
    return suffixed;
  };

  const incomeStatementParser = (obj) => {
    const fields = [
      "endDate",
      "totalRevenue",
      "grossProfit",
      "operatingIncome",
      "ebit",
      "netIncome",
    ];
    const ret = { endDate: obj.endDate.fmt };
    fields.forEach((field) => {
      ret[field] = obj[field].raw;
    });
    return ret;
  };
  const data = await fetch(
    `http://localhost:3000/api/comps/${context.params.symbol}`
  )
    .then((res) => res.json())
    .then((json) => {
      const {
        price,
        summaryProfile,
        incomeStatementHistoryQuarterly,
        incomeStatementHistory,
      } = json;

      const incomeStatementAnnual =
        incomeStatementHistory.incomeStatementHistory
          .map(incomeStatementParser)
          .map((obj, i) => suffixKeys(obj, i))
          .reduce((curr, prev) => {
            return { ...curr, ...prev };
          });

      const incomeStatementTTM = suffixKeys(
        incomeStatementHistoryQuarterly.incomeStatementHistory
          .map(incomeStatementParser)
          .reduce(objectSummer),
        "TTM"
      );

      const marketCap = price.marketCap.raw;

      const {
        grossProfitTTM,
        totalRevenueTTM,
        netIncomeTTM,
        operatingIncomeTTM,
      } = incomeStatementTTM;

      const {
        totalRevenue0,
        totalRevenue1,
        grossProfit0,
        netIncome0,
        netIncome1,
        operatingIncome0,
      } = incomeStatementAnnual;

      const result = {
        symbol: context.params.symbol.toUpperCase(),
        name: price.longName,
        sector: summaryProfile.sector,
        industry: summaryProfile.industry,
        revenueGrowth: totalRevenue0 / totalRevenue1 - 1,
        earningsGrowth: netIncome0 / netIncome1 - 1,

        priceToSalesTTM: marketCap / totalRevenueTTM,
        priceToGrossProfitTTM: marketCap / grossProfitTTM,
        priceToEarningsTTM: marketCap / netIncomeTTM,

        marketCap,

        totalRevenue0,
        grossProfit0,
        grossMargin0: grossProfit0 / totalRevenue0,
        operatingIncome0,
        netIncome0,

        totalRevenueTTM,
        grossProfitTTM,
        grossMarginTTM: grossProfitTTM / totalRevenueTTM,
        operatingIncomeTTM,
        netIncomeTTM,
      };

      return result;
    });
  return {
    props: { data },
  };
}

export default function Page({ data }) {
  const columns = [
    {
      Header: "Symbol",
      accessor: "symbol",
    },
    { Header: "Name", accessor: "name" },
    { Header: "Sector", accessor: "sector" },
    { Header: "Industry", accessor: "industry" },
    { Header: "Market Cap", accessor: "marketCap" },
    { Header: "P/S TTM", accessor: "priceToSalesTTM" },
    { Header: "P/GP TTM", accessor: "priceToGrossProfitTTM" },
    { Header: "P/E TTM", accessor: "priceToEarningsTTM" },
    { Header: "Revenue Growth YoY", accessor: "revenueGrowth" },
    { Header: "Earnings Growth YoY", accessor: "earningsGrowth" },
    { Header: "Revenue TTM", accessor: "totalRevenueTTM" },
    { Header: "Gross Profit TTM", accessor: "grossProfitTTM" },
    { Header: "Gross Margin TTM", accessor: "grossMarginTTM" },
    { Header: "Operating Income TTM", accessor: "operatingIncomeTTM" },
    { Header: "Net Income TTM", accessor: "netIncomeTTM" },
    { Header: "Revenue LFY", accessor: "totalRevenue0" },
    { Header: "Gross Profit LFY", accessor: "grossProfit0" },
    { Header: "Gross Margin LFY", accessor: "grossMargin0" },
    { Header: "Operating Income LFY", accessor: "operatingIncome0" },
    { Header: "Net Income LFY", accessor: "netIncome0" },
  ];
  return (
    <table>
      <tr>
        {columns.map(({ Header, accessor }, i) => (
          <td key={i}>{Header}</td>
        ))}
      </tr>
      <tr>
        {columns.map(({ Header, accessor }, i) => (
          <td key={i}>{data[accessor]}</td>
        ))}
      </tr>
    </table>
  );
}
