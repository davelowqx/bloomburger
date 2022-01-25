import React from "react";
import { Button, Alert, Container, Form, Row, Spinner } from "react-bootstrap";
import Layout from "../../components/Layout";
import Table from "../../components/Table";
import { numberFormat } from "../../utils";
import { round } from "lodash";

export default function Comps() {
  const [data, setData] = React.useState([]);
  const [input, setInput] = React.useState("");
  const [symbols, setSymbols] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(async () => {
    try {
      const symbolsStored = JSON.parse(localStorage.getItem("comps")) ?? [];
      setLoading(true);
      const data = await Promise.all(
        symbolsStored.map((symbol) => fetchAndParseData(symbol))
      );
      setData(data);
      setSymbols(symbolsStored);
    } catch (error) {
      setError(error.message);
      localStorage.setItem("comps", JSON.stringify([]));
    } finally {
      setLoading(false);
    }
  }, []);

  const setAndPersistSymbols = (symbols) => {
    localStorage.setItem("comps", JSON.stringify(symbols));
    setSymbols(symbols);
  };

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
      const newSymbols = [...symbols, ...addlSymbols];
      setAndPersistSymbols(newSymbols);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (i) => {
    setData([...data.slice(0, i), ...data.slice(i + 1, data.length)]);
    setAndPersistSymbols([...symbols.slice(0, i), ...symbols.slice(i + 1)]);
  };

  const Cell = (row) => <div className="text-center">{row.value}</div>;

  const columns = [
    { Header: "x", accessor: "x" },
    {
      Header: "Basic",
      columns: [
        {
          Header: "Symbol",
          accessor: "symbol",
          Cell,
        },
        { Header: "Name", accessor: "name", Cell },
        { Header: "Sector", accessor: "sector", Cell },
        { Header: "Industry", accessor: "industry", Cell },
        { Header: "Market Cap", accessor: "marketCap" },
      ],
    },
    {
      Header: "TTM Multiples",
      columns: [
        { Header: "P/S", accessor: "priceToSalesTTM" },
        { Header: "P/GP", accessor: "priceToGrossProfitTTM" },
        { Header: "P/E", accessor: "priceToEarningsTTM" },
      ],
    },
    {
      Header: "Growth YoY",
      columns: [
        { Header: "Revenue", accessor: "revenueGrowth" },
        { Header: "Earnings", accessor: "earningsGrowth" },
      ],
    },
    {
      Header: "Income Statement TTM",
      columns: [
        { Header: "Revenue", accessor: "totalRevenueTTM" },
        { Header: "Gross Profit", accessor: "grossProfitTTM" },
        { Header: "Gross Margin", accessor: "grossMarginTTM" },
        { Header: "Operating Income", accessor: "operatingIncomeTTM" },
        { Header: "Net Income", accessor: "netIncomeTTM" },
      ],
    },
    {
      Header: "Income Statement LFY",
      columns: [
        { Header: "Revenue", accessor: "totalRevenue0" },
        { Header: "Gross Profit", accessor: "grossProfit0" },
        { Header: "Gross Margin", accessor: "grossMargin0" },
        { Header: "Operating Income", accessor: "operatingIncome0" },
        { Header: "Net Income", accessor: "netIncome0" },
      ],
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
                variant={loading ? "secondary" : "success"}
                size="sm"
                disabled={loading}
                type="submit"
                className="w-100"
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
        <Alert variant="danger" show={!!error}>
          {error}
        </Alert>
        <Table columns={columns} data={data} handleDelete={handleDelete} />
      </Container>
    </Layout>
  );
}

const fetchAndParseData = async (symbol) => {
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

  return fetch(`/api/comps/${symbol}`)
    .then((res) => res.json())
    .then((json) => {
      if (json.error) {
        throw new Error(error.code);
      }
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
        symbol: symbol.toUpperCase(),
        name: price.longName,
        sector: summaryProfile.sector,
        industry: summaryProfile.industry,
        revenueGrowth: round((totalRevenue0 * 100) / totalRevenue1) - 100 + "%",
        earningsGrowth: round((netIncome0 * 100) / netIncome1) - 100 + "%",

        priceToSalesTTM: round(marketCap / totalRevenueTTM, 1),
        priceToGrossProfitTTM: round(marketCap / grossProfitTTM, 1),
        priceToEarningsTTM: round(marketCap / netIncomeTTM, 1),

        marketCap: numberFormat(marketCap),

        totalRevenue0: numberFormat(totalRevenue0),
        grossProfit0: numberFormat(grossProfit0),
        grossMargin0: round((grossProfit0 * 100) / totalRevenue0) + "%",
        operatingIncome0: numberFormat(operatingIncome0),
        netIncome0: numberFormat(netIncome0),

        totalRevenueTTM: numberFormat(totalRevenueTTM),
        grossProfitTTM: numberFormat(grossProfitTTM),
        grossMarginTTM: round((grossProfitTTM * 100) / totalRevenueTTM) + "%",
        operatingIncomeTTM: numberFormat(operatingIncomeTTM),
        netIncomeTTM: numberFormat(netIncomeTTM),
      };

      return result;
    });
};
