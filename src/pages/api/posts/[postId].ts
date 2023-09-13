import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prismadb";
import { type } from "os";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET" && req.method !== "DELETE") {
    return res.status(404).end();
  }

  const { postId } = req.query;

  if (!postId || typeof postId !== "string") {
    throw new Error("Invalid Post id");
  }

  try {
    if (req.method === "GET") {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
        include: {
          user: true,
          comments: {
            include: {
              user: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });

      return res.status(200).json(post);
    }
  } catch (error) {
    console.log(error);
    return res.status(404).end();
  }
}
