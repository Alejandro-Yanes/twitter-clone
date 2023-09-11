import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prismadb";
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

    if (!currentUser) {
      throw new Error("No current user");
    }

    const users = await prisma.user.findMany({
      where: {
        id: {
          not: currentUser.id,
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(404).end();
  }
}
