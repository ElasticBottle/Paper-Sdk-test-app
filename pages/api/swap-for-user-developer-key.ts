import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(404).json({ error: "Method not allowed" });
  }
  const body: { authToken: string } = req.body;
  const authToken = body.authToken;
  console.log("authToken", authToken);

  const resp = await fetch(
    "https://paper.xyz/api/2022-08-12/platform/get-developer-key",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PAPER_API_KEY}`,
      },
      body: JSON.stringify({
        authToken,
      }),
    }
  );

  if (resp.status !== 200) {
    console.log("await resp.text()", await resp.text());
    return res.status(500).json({ error: "Error getting user token" });
  }
  const { developerKey } = await resp.json();
  console.log("developerKey", developerKey);

  return res.status(200).json({ message: "OK" });
}
