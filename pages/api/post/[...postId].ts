import type { NextApiRequest, NextApiResponse } from "next"
type Data = {
  name: string,
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { postId } = req.query;
  console.log(postId)
  // res.end(`Post: ${postId}`)
  return
}