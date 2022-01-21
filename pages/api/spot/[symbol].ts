// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Object>
) {
  try {
    const symbol: string = `${req.query.symbol}`;
    // @ts-ignore
    const { success, result, error } = await fetch(
      `https://ftx.com/api/markets/${symbol}`
    ).then((res) => res.json());
    if (!success) {
      throw new Error(error);
    }
    console.log(result);
    return res.status(200).json(result);
  } catch (err: any) {
    console.error(err);
    return res.status(400).json({ error: err });
  }
}
