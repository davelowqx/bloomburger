import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method != "GET") {
    res.status(405).json({ error: "method not allowed" });
  }

  const { q } = req.query;

  await fetch(
    `${process.env.API_ENDPOINT}/v1/finance/search?q=${q}&quotesCount=5&newsCount=0`
  )
    .then((res) => res.json())
    .then((json) => res.status(200).json(json.quotes))
    .catch((error) => res.status(400).json(error));
}
