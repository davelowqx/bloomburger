import fetch from "node-fetch";

const objectSummer = (accum, curr) => {
  for (let key in accum) {
    if (typeof curr[key] === "number") {
      accum[key] += curr[key];
    } else if (key !== "endDate") {
    } else {
      accum[key] = NaN;
    }
  }
  return accum;
};

const suffixKeys = (obj, suffix) => {
  const suffixed = {};
  for (let key in obj) {
    suffixed[`${key}${suffix}`] = obj[key];
  }
  return suffixed;
};

const incomeStatementParser = (obj) => {
  const fields = [
    "endDate",
    "totalRevenue",
    "grossProfit",
    "operatingIncome",
    "netIncome",
  ];
  const ret = { endDate: obj.endDate.fmt };
  fields.forEach((field) => {
    ret[field] = obj[field].raw;
  });
  return ret;
};

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

  await fetch(
    `${process.env.API_ENDPOINT}/v10/finance/quoteSummary/${symbol}?modules=${modules}`
  )
    .then((res) => res.json())
    .then((json) => {
      const { result, error } = json.quoteSummary;
      if (error) {
        throw new Error(JSON.stringify(error));
      }

      const {
        price,
        summaryProfile,
        incomeStatementHistoryQuarterly,
        incomeStatementHistory,
      } = result[0];

      const incomeStatementAnnual =
        incomeStatementHistory.incomeStatementHistory
          .map(incomeStatementParser)
          .map((obj, i) => suffixKeys(obj, i))
          .reduce((curr, prev) => ({ ...curr, ...prev }));

      const incomeStatementTTM = suffixKeys(
        incomeStatementHistoryQuarterly.incomeStatementHistory
          .map(incomeStatementParser)
          .reduce(objectSummer),
        "TTM"
      );

      const marketCap = price.marketCap.raw;

      const {
        grossProfitTTM,
        totalRevenueTTM,
        netIncomeTTM,
        operatingIncomeTTM,
      } = incomeStatementTTM;

      const {
        totalRevenue0,
        totalRevenue1,
        grossProfit0,
        netIncome0,
        netIncome1,
        operatingIncome0,
      } = incomeStatementAnnual;

      return res.status(200).json({
        symbol: symbol.toUpperCase(),
        name: price.longName,
        sector: summaryProfile.sector,
        industry: summaryProfile.industry,
        revenueGrowth: totalRevenue0 / totalRevenue1 - 1,
        earningsGrowth:
          netIncome0 > 0 && netIncome1 > 0 ? netIncome0 / netIncome1 - 1 : NaN,

        priceToSalesTTM: marketCap / totalRevenueTTM,
        priceToGrossProfitTTM: marketCap / grossProfitTTM,
        priceToEarningsTTM: netIncomeTTM > 0 ? marketCap / netIncomeTTM : NaN,

        marketCap,

        totalRevenue0,
        grossProfit0,
        grossMargin0: grossProfit0 / totalRevenue0,
        operatingIncome0,
        netIncome0,

        totalRevenueTTM,
        grossProfitTTM,
        grossMarginTTM: grossProfitTTM / totalRevenueTTM,
        operatingIncomeTTM,
        netIncomeTTM,
      });
    })
    .catch((error) => res.status(400).json(error));
}
