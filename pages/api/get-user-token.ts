import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(404).json({ error: "Method not allowed" });
  }
  const body: { code: string } = req.body;
  const code = body.code;

  const resp = await fetch("https://paper.xyz/api/v1/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PAPER_API_KEY}`,
    },
    body: JSON.stringify({
      code,
      clientId: "e61231d4-3681-459c-82e9-a6a69cca0098",
    }),
  });

  if (resp.status !== 200) {
    console.log("await resp.text()", await resp.text());
    return res.status(500).json({ error: "Error getting user token" });
  }
  const { userToken } = await resp.json();
  console.log("userToken", userToken);

  const userDetailResp = await fetch(
    "https://paper.xyz/api/v1/oauth/user-details",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 69e9e7b5-f4f6-4b26-b344-7a810ecb500c",
      },
      body: JSON.stringify({
        userToken,
        clientId: "e61231d4-3681-459c-82e9-a6a69cca0098",
      }),
    }
  );
  const userDetails = await userDetailResp.json();
  console.log("userDetails", userDetails);

  return res.status(200).json({ userToken });
}
