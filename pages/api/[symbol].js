// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  const symbol = req.query.symbol;
  const modules = req.headers.modules;
  try {
    const data = await fetch(
      `http://query2.finance.yahoo.com/v10/finance/quoteSummary/${symbol}?modules=${modules}`
    ).then((res) => res.json());
    res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
