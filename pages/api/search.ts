// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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

  let resp = await client.api(
    "GET", 
    `${eztw.endpoints.SEARCH.CHANNELS}?query=${req.headers.streamer.toLowerCase().replace(" ", "_")}&first=5`
  );

  res.status(200).json({ streamers: resp })
}