const https = require("https");

export default async function handler(req, ret) {
  if ((req.method = "POST")) {
    const { symbol, interval } = req.body;
    https
      .get(
        `https://query2.finance.yahoo.com/v8/finance/chart/${symbol}?includeAdjustedClose=false&interval=${interval}&range=3y`,
        (res) => {
          let raw = "";

          res.on("data", (d) => {
            raw += d;
          });
          res.on("end", () => {
            const { result, error } = JSON.parse(raw).chart;
            if (!error) {
              console.log(result[0]);
              const { timestamp, indicators } = result[0];
              ret.status(200).json({
                result: timestamp
                  .map((t, i) => ({
                    time: t,
                    open: indicators.quote[0].open[i],
                    high: indicators.quote[0].high[i],
                    low: indicators.quote[0].low[i],
                    close: indicators.quote[0].close[i],
                  }))
                  .filter(
                    ({ time, open, high, low, close }) =>
                      time && open && high && low && close
                  ),
                error: null,
              });
            } else {
              console.error(error);
              ret.status(400).json({ result: null, error });
            }
          });
        }
      )
      .on("error", (error) => {
        console.error(error);
        ret.status(400).json({ result: null, error });
      })
      .end();
  } else {
    ret.status(405).json({ error: "method not allowed" });
  }
}
