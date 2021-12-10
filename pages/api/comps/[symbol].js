const https = require("https");

export default async function handler(req, res) {
  if (req.method != "GET") {
    ret.status(405).json({ error: "method not allowed" });
  }

  const { symbol } = req.query;

  const modules = [
    "price",
    "summaryProfile",
    "incomeStatementHistory",
    "incomeStatementHistoryQuarterly",
  ];

  const handleError = (errorMessage) => {
    console.error(errorMessage);
    res.status(400).json({ error: errorMessage });
  };

  const handleSuccess = (data) => {
    console.log(data);
    res.status(200).json(data);
  };

  https
    .get(
      `${process.env.API_ENDPOINT}/v10/finance/quoteSummary/${symbol}?modules=${modules}`,
      (res) => {
        let raw = "";

        res.on("data", (d) => {
          raw += d;
        });
        res.on("end", () => {
          const { result, error } = JSON.parse(raw).quoteSummary;
          if (error) {
            handleError(JSON.stringify(error));
          }
          handleSuccess(result[0]);
        });
      }
    )
    .on("error", (error) => {
      handleError(error.message);
    })
    .end();
}
