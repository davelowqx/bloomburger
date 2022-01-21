import type { NextPage } from "next";
import React from "react";
import { useRouter } from "next/router";
import Table from "../../components/Table";
import _ from "lodash";

interface Data {
  symbol: string;
  amount: number;
  price: number;
  weight: number;
}

const Home: NextPage = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<Array<Data>>([]);
  const router = useRouter();
  const { index } = router.query;
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data: Array<Data> = await fetch(`/api/indexes/${index}`).then(
        (res) => res.json()
      );
      const indexPrice = await fetch(`/api/symbols/${index}-PERP`)
        .then((res) => res.json())
        .then((json) => json.last);
      const dataWithPrices = await Promise.all(
        data
          .filter(({ amount }) => amount > 0)
          .map(async ({ symbol, amount }) => {
            const price = await fetch(`/api/symbols/${symbol}%2FUSD`)
              .then((res) => res.json())
              .then((json) => json.last);
            return {
              symbol,
              amount: _.round(amount, 2),
              price,
              weight: _.round((amount * price * 100) / indexPrice, 2),
            };
          })
      );
      setData(dataWithPrices);
      setLoading(false);
    };
    if (index) {
      fetchData();
    }
  }, [index]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Symbol",
        accessor: "symbol",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Weight(%)",
        accessor: "weight",
      },
    ],
    []
  );

  return (
    <>
      {loading ? <div>loading</div> : <Table columns={columns} data={data} />}
    </>
  );
};

export default Home;
