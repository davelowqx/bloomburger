import { stat } from "fs";

const https = require("https");

export default async function handler(req, res) {
  if (req.method != "GET") {
    ret.status(405).json({ error: "method not allowed" });
  }

  const handleError = (errorMessage) => {
    console.error(errorMessage);
    res.status(400).json({ error: errorMessage });
  };

  const handleSuccess = (data) => {
    res.status(200).json(data);
  };

  https
    .get(
      `https://api.nasdaq.com/api/quote/list-type/nasdaq100`,
      {
        headers: {
          Accept: "*/*",
          "Accept-Encoding": "deflate",
        },
      },
      (res) => {
        let raw = "";

        res.on("data", (d) => {
          raw += d;
        });
        res.on("end", () => {
          try {
            const result = JSON.parse(raw);
            handleSuccess(
              result.data.data.rows.map(
                ({ symbol, companyName, lastSalePrice, percentageChange }) => {
                  return {
                    symbol,
                    companyName,
                    lastSalePrice: parseFloat(lastSalePrice.substring(1)),
                    percentageChange: parseFloat(percentageChange),
                  };
                }
              )
            );
          } catch (err) {
            handleError(err.message);
          }
        });
      }
    )
    .on("error", (error) => {
      handleError(error.message);
    })
    .end();
}
