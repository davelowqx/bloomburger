const fetchData = async (symbol, interval, range) => {
  const data = await fetch(
    `/api/charts/${symbol}?interval=${interval}&range=${range}`
  ).then((res) => res.json());

  if (data?.error) {
    throw new Error(`${symbol}: ${error}`);
  } else {
    return data;
  }
};

const parseAdrData = (adr, ord, fx, r) => {
  const fxmap = fx.reduce((accum, curr) => {
    const dateStr = curr.time - (curr.time % (24 * 60 * 60));
    return { ...accum, [dateStr]: curr.open };
  }, {});

  const data = [];
  const len = adr.length + ord.length;
  let i = 0,
    j = 0;

  for (let k = 0; k < len; k++) {
    if (j === ord.length || (i !== adr.length && adr[i].time < ord[j].time)) {
      data.push({
        ...adr[i],
        // origin: "adr",
      });
      i++;
    } else if (i === adr.length || adr[i].time > ord[j].time) {
      const time = ord[j].time;
      const dateStr = time - (time % (24 * 60 * 60));
      const adj = r * fxmap[dateStr];
      data.push({
        time: ord[j].time,
        open: ord[j].open * adj,
        high: ord[j].high * adj,
        low: ord[j].low * adj,
        close: ord[j].close * adj,
        // origin: "ord",
      });
      j++;
    }
  }
  return data;
};

const parseBinaryData = (a, b, op) => {
  const data = [];

  const am = a.reduce((accum, curr) => {
    return { ...accum, [curr.time]: curr };
  }, {});
  const bm = b.reduce((accum, curr) => {
    return { ...accum, [curr.time]: curr };
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
        high: open > close ? open : close,
        low: open < close ? open : close,
        close,
        value: close,
      });
    }
  }
  return data;
};

export { fetchData, parseAdrData, parseBinaryData };
