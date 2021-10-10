const fetchData = async (symbol, interval, range) => {
  const data = await fetch("/api/chart", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ symbol, interval, range }),
  }).then((res) => res.json());

  console.log(data);
  const { result, error } = data;
  if (error) {
    throw new Error(`${symbol}: ${error}`);
  } else {
    return result;
  }
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
        // origin: "adr",
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
        // origin: "ord",
      });
      j++;
    }
  }
  return data;
};

const parseBinaryData = (a, b, op) => {
  const data = [];
  const f = (x, y) => (op === "/" ? x / y : op === "-" ? x - y : null);
  let i = 0;
  while (i < a.length && i < b.length) {
    if (a[i].time === b[i].time) {
      data.push({
        time: a[i].time,
        open: f(a[i].open, b[i].open),
        high: f(a[i].high, b[i].low),
        low: f(a[i].low, b[i].high),
        close: f(a[i].close, b[i].close),
      });
    }
    i++;
  }
  return data;
};

export { fetchData, parseAdrData, parseBinaryData };
