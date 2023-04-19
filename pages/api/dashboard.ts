import type { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ posts: '2', following: '5', bruh: '5' })
}