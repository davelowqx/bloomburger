// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  const symbol = req.query.symbol;
  try {
    const data = await fetch(
      `http://query2.finance.yahoo.com/v8/finance/chart/${symbol}?includeAdjustedClose=false&interval=1d&range=2y`
    ).then((res) => res.json());
    res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
