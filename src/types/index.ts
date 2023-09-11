import { Prisma } from "@prisma/client";

export type PostWithUserAndComments = Prisma.PostGetPayload<{
  include: { user: true; comments: true };
}>;

export type PostWithUserAndCommentWithUser = Prisma.PostGetPayload<{
  include: { user: true; comments: true };
}>;
