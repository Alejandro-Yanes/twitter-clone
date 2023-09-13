import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(404).end();
  }

  try {
    const { userId } = req.body;
    const { currentUser } = await serverAuth(req, res);

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new Error("Invalid ID");
    }

    let updatedFollowingIds = [...(currentUser.followingIds || [])];

    if (req.method === "POST") {
      updatedFollowingIds.push(userId);

      try {
        await prisma.notification.create({
          data: {
            body: "Someone followed you!",
            userId,
          },
        });

        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            hasNotification: true,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }

    if (req.method === "DELETE") {
      updatedFollowingIds = updatedFollowingIds.filter((id) => id !== userId);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(404).end();
  }
}
