import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method != "GET") {
    res.status(405).json({ error: "method not allowed" });
  }

  const { symbol, interval, range } = req.query;

  await fetch(
    `${process.env.API_ENDPOINT}/v8/finance/chart/${symbol}?includeAdjustedClose=false&interval=${interval}&range=${range}`
  )
    .then((res) => res.json())
    .then((json) => {
      const { result, error } = json.chart;
      if (error) {
        throw new Error(JSON.stringify(error));
      }

      const { timestamp, indicators } = result[0];
      return res.status(200).json(
        timestamp
          .map((t, i) => ({
            time: t,
            open: indicators.quote[0].open[i],
            high: indicators.quote[0].high[i],
            low: indicators.quote[0].low[i],
            close: indicators.quote[0].close[i],
            value: indicators.quote[0].close[i],
          }))
          .filter(
            ({ time, open, high, low, close }) =>
              time && open && high && low && close
          )
      );
    })
    .catch((error) => res.status(400).json(error));
}
