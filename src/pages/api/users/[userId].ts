import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(404).end();
  }

  try {
    const { userId } = req.query;

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid Id");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const followedCount = await prisma.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });

    return res.status(200).json({ ...user, followedCount });
  } catch (error) {
    console.log(error);
    return res.status(404).end();
  }
}
