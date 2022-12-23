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
  for (i in timestamp) {
    if (timestamp[i] && quote.open[i] && quote.high[i] && quote.low[i] && quote.close[i]) {
      ret.append({
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

  for (let elem of a) {
    if (bm[elem.time]) {
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

  } catch (e) {
    return res.status(400).json({error: e});
  }
}
