import Head from "next/head";
import Image from "next/image";
import React from "react";
import { Button, Alert, Form, Row, Col } from "react-bootstrap";
import BTable from "react-bootstrap/Table";
import { useTable, useSortBy } from "react-table";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [data, setData] = React.useState([]);
  const [input, setInput] = React.useState("");
  const [symbols, setSymbols] = React.useState([
    "FB",
    "JNJ",
    "XOM",
    "GS",
    "HON",
    "DUK",
    "AMZN",
  ]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(async () => {
    setLoading(true);
    try {
      const data = await Promise.all(
        symbols.map((symbol) => fetchData(symbol))
      );
      setData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInput = (event) => setInput(event.target.value);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    setInput("");
    setSymbols([...symbols, input]);
    try {
      const addl = await fetchData(input);
      console.log(addl);
      setData([...data, addl]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (i) => {
    setData([...data.slice(0, i), ...data.slice(i + 1, data.length)]);
  };

  const [headers, setHeaders] = React.useState([
    "delete",
    "symbol",
    "name",
    "sector",
    "industry",
    "marketCap",
    "totalRevenueTTM",
    "grossProfitTTM",
    "operatingIncomeTTM",
    "ebitTTM",
    "netIncomeTTM",
    "totalCashFromFinancingActivitiesTTM",
    "totalCashFromOperatingActivitiesTTM",
    "totalCashflowsFromInvestingActivitiesTTM",
    "totalCurrentAssets",
    "totalCurrentLiabilities",
  ]);

  const columns = headers.map((header) => {
    return { Header: header, accessor: header };
  });

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Control
              value={input}
              type="text"
              size="sm"
              placeholder="Symbol"
              disabled={loading}
              onChange={handleInput}
            />
          </Col>
          <Col>
            <Button
              variant={loading ? "secondary" : "success"}
              size="sm"
              disabled={loading}
              type="submit"
            >
              submit
            </Button>
          </Col>
        </Row>
        <Alert variant="danger" show={!!error}>
          {error}
        </Alert>
      </Form>
      <br />
      <Table columns={columns} data={data} />
    </div>
  );
}

const fetchData = async (symbol) => {
  const sum = (accum, curr) => {
    for (let key in accum) {
      if (key !== "endDate") {
        accum[key] += curr[key];
      }
    }
    return accum;
  };

  const arrToObjReducer = (accum, curr) => {
    for (let key in curr) {
      accum[key] = curr[key];
    }
    return accum;
  };

  const addSuffix = (obj, suffix) => {
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
      console.log(obj);
      return "-";
    }
  };

  const incomeStatementMapper = (obj) => {
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

  const cashFlowStatementMapper = (obj) => {
    const fields = [
      "endDate",
      "depreciation",
      "totalCashFromOperatingActivities",
      "capitalExpenditures",
      "investments",
      "totalCashflowsFromInvestingActivities",
      "netBorrowings",
      "totalCashFromFinancingActivities",
    ];
    const ret = { endDate: obj.endDate.fmt };
    fields.forEach((field) => {
      ret[field] = getRaw(obj, field);
    });
    return ret;
  };

  const balanceSheetMapper = (obj) => {
    const fields = [
      "cash",
      "totalCurrentAssets",
      "totalAssets",
      "totalCurrentLiabilities",
      "totalLiab",
      "totalStockholderEquity",
    ];
    const ret = {};
    fields.forEach((field) => {
      ret[field] = getRaw(obj, field);
    });
    return ret;
  };

  return fetch(`/api/financial/${symbol}`, {
    headers: {
      modules: [
        "price",
        "summaryProfile",
        "incomeStatementHistory",
        "incomeStatementHistoryQuarterly",
        "cashflowStatementHistory",
        "cashflowStatementHistoryQuarterly",
        "balanceSheetHistoryQuarterly",
      ],
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res);
      }
    })
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
          balanceSheetHistoryQuarterly,
        } = result[0];

        return {
          symbol: symbol.toUpperCase(),
          name: price.longName,
          sector: summaryProfile.sector,
          industry: summaryProfile.industry,
          marketCap: price.marketCap.raw,
          ...incomeStatementHistory.incomeStatementHistory
            .map(incomeStatementMapper)
            .map((obj, i) => addSuffix(obj, i))
            .reduce(arrToObjReducer),
          ...addSuffix(
            incomeStatementHistoryQuarterly.incomeStatementHistory
              .map(incomeStatementMapper)
              .reduce(sum),
            "TTM"
          ),
          ...cashflowStatementHistory.cashflowStatements
            .map(cashFlowStatementMapper)
            .map((obj, i) => addSuffix(obj, i))
            .reduce(arrToObjReducer),
          ...addSuffix(
            cashflowStatementHistoryQuarterly.cashflowStatements
              .map(cashFlowStatementMapper)
              .reduce(sum),
            "TTM"
          ),
          ...balanceSheetHistoryQuarterly.balanceSheetStatements.map(
            balanceSheetMapper
          )[0],
        };
      } else {
        throw new Error(error.code);
      }
    });
};

function Table({ columns, data }) {
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
                    <td key={j} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
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
