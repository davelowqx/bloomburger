import React, { useEffect } from "react";

function App() {
  const [data, setData] = React.useState({});
  const symbol = "AAPL";
  useEffect(() => {
    const data = fetch(
      `/v8/finance/chart/${symbol}?includeAdjustedClose=false&interval=1d&range=2y`
    )
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return <div>{JSON.stringify(data)}</div>;
}

export default App;
