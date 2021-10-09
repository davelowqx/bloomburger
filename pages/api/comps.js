const https = require("https");

export default async function handler(req, ret) {
  if ((req.method = "POST")) {
    const { symbol } = req.body;

    const modules = [
      "price",
      "summaryProfile",
      "incomeStatementHistory",
      "incomeStatementHistoryQuarterly",
      "cashflowStatementHistory",
      "cashflowStatementHistoryQuarterly",
      "balanceSheetHistoryQuarterly",
    ];
    https
      .get(
        `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${symbol}?modules=${modules}`,
        (res) => {
          let raw = "";

          res.on("data", (d) => {
            raw += d;
          });
          res.on("end", () => {
            const { result, error } = JSON.parse(raw).quoteSummary;
            if (!error) {
              console.log(result[0]);
              ret.status(200).json({
                result: result[0],
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
