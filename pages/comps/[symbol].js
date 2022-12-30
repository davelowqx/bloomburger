export async function getServerSideProps(context) {
  const data = await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://bloomburger.co"
    }/api/comps/${context.params.symbol}`
  ).then((res) => res.json());
  return {
    props: { data },
  };
}

export default function Page({ data }) {
  const columns = [
    { Header: "Symbol", accessor: "symbol" },
    { Header: "Name", accessor: "name" },
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
