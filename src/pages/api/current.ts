import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(404).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);

    res.status(200).json(currentUser);
  } catch (error) {
    res.status(404).end();
  }
}
