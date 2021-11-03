const https = require("https");

export default async function handler(req, res) {
  if (req.method != "GET") {
    ret.status(405).json({ error: "method not allowed" });
  }

  const { q } = req.query;

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
      `${process.env.API_ENDPOINT}/v1/finance/search?q=${q}&quotesCount=5&newsCount=0`,
      (res) => {
        let raw = "";

        res.on("data", (d) => {
          raw += d;
        });
        res.on("end", () => {
          handleSuccess(JSON.parse(raw).quotes);
        });
      }
    )
    .on("error", (error) => {
      handleError(error.message);
    })
    .end();
}
