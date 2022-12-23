import fetch from "node-fetch";

async function fetchData(symbol, interval, range) {
  const data = await fetch(
    `${process.env.API_ENDPOINT}/v8/finance/chart/${symbol}?includeAdjustedClose=false&interval=${interval == "4h" ? "1h" : interval}&range=${range}`
  ).then((res) => res.json())

  const { result, error } = data.chart;
  if (error) throw new Error(JSON.stringify(error));

  const { timestamp, indicators } = result[0];
  return timestamp.map((t, i) => ({
            time: t,
            open: indicators.quote[0].open[i],
            high: indicators.quote[0].high[i],
            low: indicators.quote[0].low[i],
            close: indicators.quote[0].close[i],
            value: indicators.quote[0].close[i],
          }))
}

const parseBinaryData = (a, b, op) => {
  const data = [];

  const am = a.reduce((accum, curr) => {
    accum[curr.time] = curr;
    return accum;
  }, {});

  const bm = b.reduce((accum, curr) => {
    accum[curr.time] = curr;
    return accum;
  }, {});

  const f = (x, y) =>
    op === "/"
      ? x / y
      : op === "-"
      ? x - y
      : op === "*"
      ? x * y
      : op === "+"
      ? x + y
      : null;

  for (let key of Object.keys(am)) {
    if (bm[key]) {
      const open = f(am[key].open, bm[key].open);
      const close = f(am[key].close, bm[key].close);
      data.push({
        time: am[key].time,
        open,
        high: Math.max(open, close),
        low: Math.min(open, close),
        close,
        value: close,
      });
    }
  }
  return data;
};

export default async function handler(req, res) {
  if (req.method != "GET") {
    res.status(405).json({ error: "method not allowed" });
  }

  const { symbol, interval, range } = req.query;

  const tokens = symbol.split(/[\+\-\*\/]/);
  if (tokens.length > 2) return res.status(400).json({ error: "Invalid symbol." });

  let result = [];

  try {
    if (tokens.length == 1) {
      result = await fetchData(symbol, interval, range);
    } else {
      let first = fetchData(tokens[0], interval, range)
      let second = fetchData(tokens[1], interval, range)
      result = parseBinaryData(first, second, symbol.charAt(tokens[0].length));
    }

    return res.status(200).json(result);

  } catch {
    return res.status(400).json(error);
  }
}
