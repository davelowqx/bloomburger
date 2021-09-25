const fetchData = (symbol, interval) => {
  return fetch(
    `${
      process.env.NODE_ENV === "development"
        ? ""
        : "https://query2.finance.yahoo.com"
    }/v8/finance/chart/${symbol}?includeAdjustedClose=false&interval=${interval}&range=3y`
    // Valid intervals: [1m, 2m, 5m, 15m, 30m, 60m, 90m, 1h, 1d, 5d, 1wk, 1mo, 3mo]
  )
    .then((res) => res.json())
    .then((json) => {
      const { result, error } = json.chart;
      if (error === null) {
        const { timestamp, indicators } = result[0];
        return timestamp.map((t, i) => {
          return {
            time: t,
            open: indicators.quote[0].open[i],
            high: indicators.quote[0].high[i],
            low: indicators.quote[0].low[i],
            close: indicators.quote[0].close[i],
          };
        });
      } else {
        throw new Error(error.code);
      }
    });
};

const parseAdrData = (adr, ord, fx, r) => {
  const fxmap = fx.reduce((accum, curr) => {
    const dateStr = new Date(curr.time * 1000).toDateString();
    return { ...accum, [dateStr]: curr.open };
  }, {});

  const data = [];
  const len = adr.length + ord.length;
  let i = 0,
    j = 0;
  for (let k = 0; k < len; k++) {
    if (j === ord.length || adr[i].time < ord[j].time) {
      data.push({
        ...adr[i],
        origin: "adr",
      });
      i++;
    } else if (i === adr.length || adr[i].time > ord[j].time) {
      const time = ord[j].time;
      const dateStr = new Date(time * 1000).toDateString();
      const adj = r * fxmap[dateStr];
      data.push({
        time: ord[j].time,
        open: ord[j].open * adj,
        high: ord[j].high * adj,
        low: ord[j].low * adj,
        close: ord[j].close * adj,
        origin: "ord",
      });
      j++;
    }
  }
  return data;
};

export { fetchData, parseAdrData };
