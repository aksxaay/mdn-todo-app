import { z } from "zod"
import { createHash } from "crypto";
import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next"
import { stringify } from "querystring";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const slug = z.string().parse(req.query.slug);

    switch (req.method) {
      case "GET": {
        const post = await prisma.post.findUnique({
          where: { slug }
        })

        res.json(post?.views || 1)
        return;
      }

      case "POST": {
        const post = await prisma.post.upsert({
          where: { slug },
          update: { views: { increment: 1 } },
          create: { slug, views: 1 },
        })

        res.json(Number(post?.views || 1))
        return;
      }

      default: {
        res.setHeader("Allow", ["GET", "POST"])
        res.status(405).send("Method not allowed")
      }
    }
  } catch (err: any) {
    console.error(err)

    res.status(500).json({
      statusCode: 500,
      message: err.message,
    })

  }
}