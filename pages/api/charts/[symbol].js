const https = require("https");

export default async function handler(req, res) {
  if (req.method != "GET") {
    ret.status(405).json({ error: "method not allowed" });
  }

  const { symbol, interval, range } = req.query;

  const handleError = (errorMessage) => {
    console.error(errorMessage);
    res.status(400).json({ error: errorMessage });
  };

  const handleSuccess = (data) => {
    console.log(data);
    res.status(200).json(data);
  };

  https
    .get(
      `${process.env.API_ENDPOINT}/v8/finance/chart/${symbol}?includeAdjustedClose=false&interval=${interval}&range=${range}`,
      (res) => {
        let raw = "";

        res.on("data", (d) => {
          raw += d;
        });
        res.on("end", () => {
          const { result, error } = JSON.parse(raw).chart;
          if (error) {
            handleError(JSON.stringify(error));
          }
          try {
            const { timestamp, indicators } = result[0];
            handleSuccess(
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
          } catch (err) {
            handleError(err.message);
          }
        });
      }
    )
    .on("error", (error) => {
      handleError(error.message);
    })
    .end();
}
