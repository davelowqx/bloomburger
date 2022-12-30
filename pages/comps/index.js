import React from "react";
import { Button, Alert, Container, Form, Row, Spinner } from "react-bootstrap";
import Layout from "../../components/Layout";
import Table from "../../components/Table";
import { round } from "lodash";
import { numberFormat } from "../../utils";

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
        symbolsStored.map((symbol) => fetchData(symbol))
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
        addlSymbols.map((symbol) => fetchData(symbol))
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

const fetchData = async (symbol) => {
  const result = await fetch(`/api/comps/${symbol}`)
    .then((res) => res.json())
    .then((json) => {
      if (json.error) {
        throw new Error(error.code);
      }
      return {
        ...json,
        revenueGrowth: round(100 * json.revenueGrowth) + "%",
        earningsGrowth: round(100 * json.earningsGrowth) + "%",

        priceToSalesTTM: round(json.priceToSalesTTM, 1),
        priceToGrossProfitTTM: round(json.priceToGrossProfitTTM, 1),
        priceToEarningsTTM: round(json.priceToEarningsTTM, 1),

        marketCap: numberFormat(json.marketCap),

        totalRevenue0: numberFormat(json.totalRevenue0),
        grossProfit0: numberFormat(json.grossProfit0),
        grossMargin0: round(100 * json.grossMargin0) + "%",
        operatingIncome0: numberFormat(json.operatingIncome0),
        netIncome0: numberFormat(json.netIncome0),

        totalRevenueTTM: numberFormat(json.totalRevenueTTM),
        grossProfitTTM: numberFormat(json.grossProfitTTM),
        grossMarginTTM: round(100 * json.grossMargin0) + "%",
        operatingIncomeTTM: numberFormat(json.operatingIncomeTTM),
        netIncomeTTM: numberFormat(json.netIncomeTTM),
      };
    });
  return result;
};
