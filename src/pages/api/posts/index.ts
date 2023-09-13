import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (
    req.method !== "POST" &&
    req.method !== "GET" &&
    req.method !== "DELETE"
  ) {
    return res.status(404).end();
  }

  try {
    if (req.method === "DELETE") {
      const { postId } = req.body;
      console.log("delete method", postId);

      const post = await prisma.post.delete({
        where: {
          id: postId,
        },
      });

      return res.status(200).json(post);
    }

    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);
      const { body } = req.body;

      const post = await prisma.post.create({
        data: {
          body,
          userId: currentUser.id,
        },
      });

      return res.status(200).json(post);
    }

    if (req.method === "GET") {
      const { userId } = req.query;

      let posts;

      if (userId && typeof userId === "string") {
        posts = await prisma.post.findMany({
          where: {
            userId,
          },
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      } else {
        posts = await prisma.post.findMany({
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      }

      res.status(200).json(posts);
    }
  } catch (err) {
    console.log(err);
    res.status(404).end();
  }
}
