import React from "react";
import {
  Button,
  Alert,
  Container,
  Form,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import BTable from "react-bootstrap/Table";
import { useTable, useSortBy } from "react-table";
import Layout from "../../components/Layout";

export default function Financials() {
  const [data, setData] = React.useState([]);
  const [input, setInput] = React.useState("");
  const [symbols, setSymbols] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    localStorage.setItem("symbols", JSON.stringify(symbols));
  }, [symbols]);

  React.useEffect(async () => {
    const symbolsStored = JSON.parse(localStorage.getItem("symbols"));
    setSymbols(symbolsStored);
    console.log(symbols);
    setLoading(true);
    try {
      const data = await Promise.all(
        symbols.map((symbol) => fetchAndParseData(symbol))
      );
      setData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInput = (event) => {
    setInput(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    const addlSymbols = [
      ...new Set(
        input
          .split(",")
          .map((str) => str.trim())
          .filter((symbol) => !symbols.includes(symbol))
      ),
    ];
    setInput("");
    try {
      const addlData = await Promise.all(
        addlSymbols.map((symbol) => fetchAndParseData(symbol))
      );
      setData([...data, ...addlData]);
      setSymbols([...symbols, ...addlSymbols]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (i) => {
    setData([...data.slice(0, i), ...data.slice(i + 1, data.length)]);
    setSymbols([
      ...symbols.slice(0, i),
      ...symbols.slice(i + 1, symbols.length),
    ]);
  };

  const columns = [
    { Header: "", accessor: "x" },
    {
      Header: "Basic",
      columns: [
        { Header: "Symbol", accessor: "symbol" },
        { Header: "Sector", accessor: "sector" },
        { Header: "Industry", accessor: "industry" },
      ],
    },
    {
      Header: "TTM Ratios",
      columns: [
        { Header: "P/S", accessor: "priceToSalesTTM" },
        { Header: "P/GP", accessor: "priceToGrossProfitTTM" },
        { Header: "P/FCF", accessor: "priceToFCFTTM" },
        { Header: "P/E", accessor: "priceToEarningsTTM" },
      ],
    },
    {
      Header: "LFY Ratios",
      columns: [
        { Header: "P/S", accessor: "priceToSalesLFY" },
        { Header: "P/GP", accessor: "priceToGrossProfitLFY" },
        { Header: "P/FCF", accessor: "priceToFCFLFY" },
        { Header: "P/E", accessor: "priceToEarningsLFY" },
        { Header: "Revenue Growth % YoY", accessor: "revenueGrowth" },
        { Header: "Earnings Growth % YoY", accessor: "earningsGrowth" },
      ],
    },
    {
      Header: "Valuation",
      columns: [
        { Header: "Market Cap", accessor: "marketCap" },
        { Header: "- Cash & Eqv.", accessor: "cashAndEqv" },
        { Header: "+ Total Debt", accessor: "totalDebt" },
        { Header: "Enterprise Value", accessor: "enterpriseValue" },
      ],
    },
    {
      Header: "Income Statement TTM",
      columns: [
        { Header: "Revenue", accessor: "totalRevenueTTM" },
        { Header: "Gross Profit", accessor: "grossProfitTTM" },
        { Header: "Gross Margin %", accessor: "grossMarginTTM" },
        { Header: "Operating Income", accessor: "operatingIncomeTTM" },
        { Header: "EBITDA", accessor: "ebitdaTTM" },
        { Header: "EBIT", accessor: "ebitTTM" },
        { Header: "Net Income", accessor: "netIncomeTTM" },
      ],
    },
    {
      Header: "Income Statement LFY",
      columns: [
        { Header: "Revenue", accessor: "totalRevenue0" },
        { Header: "Gross Profit", accessor: "grossProfit0" },
        { Header: "Gross Margin %", accessor: "grossMargin0" },
        { Header: "Operating Income", accessor: "operatingIncome0" },
        { Header: "EBITDA", accessor: "ebitda0" },
        { Header: "EBIT", accessor: "ebit0" },
        { Header: "Net Income", accessor: "netIncome0" },
      ],
    },
    {
      Header: "Cash Flow Statement TTM",
      columns: [
        {
          Header: "CFO",
          accessor: "totalCashFromOperatingActivitiesTTM",
        },
        { Header: "FCF", accessor: "FCFTTM" },
      ],
    },
    {
      Header: "Cash Flow Statement LFY",
      columns: [
        {
          Header: "CFO",
          accessor: "totalCashFromOperatingActivities0",
        },
        { Header: "FCF", accessor: "FCF0" },
      ],
    },
    // {
    //   Header: "CFF TTM",
    //   accessor: "totalCashFromFinancingActivitiesTTM",
    // },
    // {
    //   Header: "CFI TTM",
    //   accessor: "totalCashflowsFromInvestingActivitiesTTM",
    // },
    {
      Header: "Balance Sheet MRQ",
      columns: [{ Header: "Current Ratio", accessor: "currentRatio" }],
    },
  ];

  return (
    <Layout>
      <Container fluid>
        <Form onSubmit={handleSubmit}>
          <Row className="my-3">
            <div className="col-11">
              <Form.Control
                value={input}
                type="text"
                size="sm"
                placeholder="Symbol (AAPL, GOOG, AMZN)"
                disabled={loading}
                onChange={handleInput}
              />
            </div>
            <div className="col-1">
              <Button
                block
                variant={loading ? "secondary" : "success"}
                size="sm"
                disabled={loading}
                type="submit"
              >
                {loading ? (
                  <Spinner
                    as="span"
                    role="status"
                    size="sm"
                    animation="border"
                  />
                ) : (
                  <span>+</span>
                )}
              </Button>
            </div>
          </Row>
        </Form>
        <Row className="justify-content-center">
          <Alert variant="danger" show={!!error}>
            {error}
          </Alert>
        </Row>
        <Table columns={columns} data={data} handleDelete={handleDelete} />
      </Container>
    </Layout>
  );
}

const fetchAndParseData = async (symbol) => {
  const sumAcrossObjects = (accum, curr, index) => {
    for (let key in accum) {
      if (key !== "endDate" && accum[key] !== 0) {
        accum[key] += curr[key];
      }
      if (typeof accum[key] !== "number") {
        accum[key] = 0;
      }
    }
    return accum;
  };

  const mergeObjects = (accum, curr) => {
    for (let key in curr) {
      accum[key] = curr[key];
    }
    return accum;
  };

  const addKeySuffix = (obj, suffix) => {
    const suffixed = {};
    for (let key in obj) {
      suffixed[`${key}${suffix}`] = obj[key];
    }
    return suffixed;
  };

  const getRaw = (obj, field) => {
    try {
      return obj[field].raw;
    } catch {
      return "err";
    }
  };

  const incomeStatementSchema = (obj) => {
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
      ret[field] = getRaw(obj, field);
    });
    return ret;
  };

  const cashFlowStatementSchema = (obj) => {
    const fields = [
      "endDate",
      "depreciation",
      "capitalExpenditures",
      // "investments",
      // "netBorrowings",
      "totalCashFromOperatingActivities",
      "totalCashflowsFromInvestingActivities",
      "totalCashFromFinancingActivities",
    ];
    const ret = { endDate: obj.endDate.fmt };
    fields.forEach((field) => {
      ret[field] = getRaw(obj, field);
    });
    return ret;
  };

  const balanceSheetSchema = (obj) => {
    const fields = [
      // "cash",  // cash & eqv === CA - inv - otherCurrentAssets - receivalbles - othershortterminvestments
      "netReceivables",
      "shortTermInvestments",
      "shortLongTermDebt",
      "otherCurrentAssets",
      "inventory",
      "longTermDebt",
      "totalCurrentAssets",
      "totalCurrentLiabilities",
      "totalAssets",
      "totalLiab",
      "totalStockholderEquity",
    ];
    const ret = {};
    fields.forEach((field) => {
      ret[field] = getRaw(obj, field);
    });
    return ret;
  };

  const modules = [
    "price",
    "summaryProfile",
    "incomeStatementHistory",
    "incomeStatementHistoryQuarterly",
    "cashflowStatementHistory",
    "cashflowStatementHistoryQuarterly",
    "balanceSheetHistoryQuarterly",
  ];

  return fetch(
    `${
      process.env.NODE_ENV === "development"
        ? ""
        : "https://query2.finance.yahoo.com"
    }/v10/finance/quoteSummary/${symbol}?modules=${modules}`
  )
    .then((res) => res.json())
    .then((json) => {
      const { result, error } = json.quoteSummary;
      if (error === null) {
        const {
          price,
          summaryProfile,
          incomeStatementHistoryQuarterly,
          incomeStatementHistory,
          cashflowStatementHistory,
          cashflowStatementHistoryQuarterly,
          balanceSheetHistoryQuarterly,
        } = result[0];

        const incomeStatementAnnual =
          incomeStatementHistory.incomeStatementHistory
            .map(incomeStatementSchema)
            .map((obj, i) => addKeySuffix(obj, i))
            .reduce(mergeObjects);

        const incomeStatementTTM = addKeySuffix(
          incomeStatementHistoryQuarterly.incomeStatementHistory
            .map(incomeStatementSchema)
            .reduce(sumAcrossObjects),
          "TTM"
        );

        const cashFlowStatementAnnual =
          cashflowStatementHistory.cashflowStatements
            .map(cashFlowStatementSchema)
            .map((obj, i) => addKeySuffix(obj, i))
            .reduce(mergeObjects);

        const cashFlowStatementTTM = addKeySuffix(
          cashflowStatementHistoryQuarterly.cashflowStatements
            .map(cashFlowStatementSchema)
            .reduce(sumAcrossObjects),
          "TTM"
        );

        const balanceSheetMRQ =
          balanceSheetHistoryQuarterly.balanceSheetStatements.map(
            balanceSheetSchema
          )[0];

        const basic = {
          symbol: symbol.toUpperCase(),
          name: price.longName,
          sector: summaryProfile.sector,
          industry: summaryProfile.industry,
          marketCap: price.marketCap.raw,
        };
        const { grossProfitTTM, totalRevenueTTM, ebitTTM, netIncomeTTM } =
          incomeStatementTTM;
        const { marketCap } = basic;
        const {
          totalRevenue0,
          totalRevenue1,
          grossProfit0,
          netIncome0,
          netIncome1,
        } = incomeStatementAnnual;
        const {
          depreciationTTM,
          capitalExpendituresTTM,
          totalCashFromOperatingActivitiesTTM,
        } = cashFlowStatementTTM;
        const { capitalExpenditures0, totalCashFromOperatingActivities0 } =
          cashFlowStatementAnnual;
        const {
          totalCurrentAssets,
          totalCurrentLiabilities,
          shortLongTermDebt,
          longTermDebt,
          otherCurrentAssets,
          netReceivables,
          shortTermInvestments,
          inventory,
        } = balanceSheetMRQ;

        const cashAndEqv =
          totalCurrentAssets -
          inventory -
          otherCurrentAssets -
          netReceivables -
          shortTermInvestments;

        const totalDebt = shortLongTermDebt + longTermDebt; // + commercial paper???
        const FCFTTM =
          totalCashFromOperatingActivitiesTTM - capitalExpendituresTTM;
        const FCF0 = totalCashFromOperatingActivities0 - capitalExpenditures0;

        const roundToOneDP = (x) => parseFloat(x.toFixed(1));

        const data = {
          ...basic,
          ...incomeStatementAnnual,
          ...incomeStatementTTM,
          ...cashFlowStatementAnnual,
          ...cashFlowStatementTTM,
          ...balanceSheetMRQ,
          revenueGrowth: roundToOneDP(
            (totalRevenue0 / totalRevenue1 - 1) * 100
          ),
          earningsGrowth: roundToOneDP((netIncome0 / netIncome1 - 1) * 100),
          grossMarginTTM: roundToOneDP(grossProfitTTM / totalRevenueTTM) * 100,
          grossMargin0: roundToOneDP(grossProfit0 / totalRevenue0) * 100,
          priceToSalesTTM: roundToOneDP(marketCap / totalRevenueTTM),
          priceToGrossProfitTTM: roundToOneDP(marketCap / grossProfitTTM),
          priceToFCFTTM: roundToOneDP(marketCap / FCFTTM),
          priceToEarningsTTM: roundToOneDP(marketCap / netIncomeTTM),
          priceToSalesLFY: roundToOneDP(marketCap / totalRevenue0),
          priceToGrossProfitLFY: roundToOneDP(marketCap / grossProfit0),
          priceToFCFLFY: roundToOneDP(marketCap / FCF0),
          priceToEarningsLFY: roundToOneDP(marketCap / netIncome0),
          ebitdaTTM: ebitTTM + depreciationTTM,
          FCFTTM,
          FCF0,
          currentRatio: roundToOneDP(
            totalCurrentAssets / totalCurrentLiabilities
          ),
          totalDebt,
          cashAndEqv,
          enterpriseValue: marketCap - cashAndEqv + totalDebt,
        };

        for (let key in data) {
          if (
            key !== "symbol" &&
            key !== "sector" &&
            key !== "name" &&
            key !== "industry"
          ) {
            if (typeof data[key] !== "number") {
              console.log(`(${key})`, data[key]);
              data[key] = "-";
            }
          }
        }
        return data;
      } else {
        throw new Error(error.code);
      }
    });
};

function Table({ columns, data, handleDelete }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );
  return (
    <>
      <BTable striped bordered responsive size="sm" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr key={i} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, j) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th
                  key={j}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr key={i} {...row.getRowProps()}>
                {row.cells.map((cell, j) => {
                  return (
                    <>
                      <td key={j} {...cell.getCellProps()}>
                        {j === 0 && (
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => handleDelete(i)}
                          >
                            x
                          </Button>
                        )}
                        {cell.render("Cell")}
                      </td>
                    </>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </BTable>
      <br />
    </>
  );
}
