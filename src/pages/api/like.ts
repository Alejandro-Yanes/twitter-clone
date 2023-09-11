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
    const { currentUser } = await serverAuth(req, res);

    const { postId } = req.body;

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid post id");
    }

    const post = await prisma.post.findUnique({ where: { id: postId } });

    if (!post) {
      throw new Error("Invalid post id");
    }

    let updatedLikedIds = [...(post.likedIds || [])];

    if (req.method === "POST") {
      updatedLikedIds.push(currentUser.id);
    }

    if (req.method === "DELETE") {
      updatedLikedIds = updatedLikedIds.filter((id) => id !== currentUser.id);
    }

    const newPost = await prisma.post.update({
      where: {
        id: postId,
      },

      data: {
        likedIds: updatedLikedIds,
      },
    });

    return res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    return res.status(404).end();
  }
}
