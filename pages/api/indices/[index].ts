// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Object>>
) {
  try {
    const index: string = `${req.query.index}`;

    // @ts-ignore
    const { success, result, error } = await fetch(
      `https://ftx.com/api/indexes/${index}/weights`
    ).then((res) => res.json());
    if (!success) {
      throw new Error(error);
    }

    let data: Array<Object> = [];
    Object.keys(result).forEach((key: any) =>
      data.push({ symbol: key, amount: result[key] })
    );
    console.log(data);
    return res.status(200).json(data);
  } catch (err: any) {
    console.error(err);
    return res.status(400).send(err);
  }
}
