import React from "react";
import Table from "../../components/Table";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";

export default function Indices() {
  const router = useRouter();
  const { index } = router.query;
  const [loading, setLoading] = React.useState(true);
  const [symbols, setSymbols] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    fetch(`/api/indices/${index}`)
      .then((res) => res.json())
      .then((data) => {
        setSymbols(
          data.map((obj, i) => {
            return { ...obj, i: i + 1 };
          })
        );
        setLoading(false);
      });
  }, [index]);

  const columns = [
    { Header: "#", accessor: "i" },
    { Header: "Symbol", accessor: "symbol" },
    { Header: "Name", accessor: "companyName" },
    { Header: "Last", accessor: "lastSalePrice" },
    { Header: "Change %", accessor: "percentageChange" },
  ];

  const advancers = symbols.filter(
    ({ percentageChange }) => percentageChange >= 0
  ).length;

  return (
    <Layout>
      {loading && <div>loading</div>}
      {!loading && (
        <>
          <Container>
            <br />
            <div>Greenery: {parseInt((advancers / symbols.length) * 100)}%</div>
            <br />
            <Table columns={columns} data={symbols} />
          </Container>
        </>
      )}
    </Layout>
  );
}
