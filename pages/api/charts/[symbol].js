import fetch from "node-fetch";

async function fetchData(symbol, interval, range) {
  const data = await fetch(
    `${process.env.API_ENDPOINT}/v8/finance/chart/${symbol}?includeAdjustedClose=false&interval=${interval == "4h" ? "1h" : interval}&range=${range}`
  ).then((res) => res.json())

  const { result, error } = data.chart;
  if (error) throw new Error(JSON.stringify(error));

  const { timestamp, indicators } = result[0];
  const quote = indicators.quote[0];
  const ret = []
  for (let i in timestamp) {
    if (timestamp[i] !== null && quote.open[i] !== null && quote.high[i] !== null && quote.low[i] !== null && quote.close[i] !== null) {
      ret.push({
          time: timestamp[i],
          open: quote.open[i],
          high: quote.high[i],
          low: quote.low[i],
          close: quote.close[i],
          value: quote.close[i],
        })
      }
  };
  return ret;
}

const parseBinaryData = (a, b, op) => {
  const data = [];

  const bm = {}
  for (let elem of b) {
    bm[elem.time] = elem;
  }

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

  for (let elem of a) {
    if (bm[elem.time] !== undefined) {
      const open = f(elem.open, bm[elem.time].open);
      const close = f(elem.close, bm[elem.time].close);
      data.push({
        time: elem.time,
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
  const s = decodeURIComponent(symbol);

  console.log(s, interval, range);

  const tokens = s.split(/[\+\-\*\/]/);
  if (tokens.length > 2) return res.status(400).json({ error: "Invalid symbol." });

  let result = [];

  try {
    if (tokens.length == 1) {
      result = await fetchData(s, interval, range);
    } else {
      let first = await fetchData(tokens[0], interval, range)
      let second = await fetchData(tokens[1], interval, range)
      result = parseBinaryData(first, second, s.charAt(tokens[0].length));
    }

    return res.status(200).json(result);

  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
}
