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

export { fetchData, parseBinaryData };
