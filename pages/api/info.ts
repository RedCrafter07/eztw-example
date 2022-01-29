import type { NextApiRequest, NextApiResponse } from 'next'
import eztw from "eztw";
let client = new eztw.client()
if(process.env && process.env.id && process.env.token) client.setID(process.env.id).setToken(process.env.token);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(!req.headers.streamer || typeof req.headers.streamer != "string") {
    res.status(400).json({
      error: 'no streamer'
    });
    return;
  }

  let resp = await eztw.utils.getStreamInfo(req.headers.streamer, client)

  if(resp.thumbnail) resp.thumbnail = eztw.utils.thumbnailSize(resp.thumbnail, 1920, 1080)

  res.status(200).json({ data:resp })
}