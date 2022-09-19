import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const resp = await fetch(
    "http://localhost:3000/api/2022-08-12/checkout-sdk-intent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${process.env.PAPER_API_KEY}`,
      },
      body: JSON.stringify({
        contractId: "e015fa00-0d6a-4f40-99b1-656ef6b5ccae",
        walletAddress: "0xb3E9C57fB983491416a0C77b07629C0991c3FD59",
        email: "no-reply@paper.xyz",
        quantity: 1,
        mintMethod: {
          name: "claimTo",
          args: {
            _to: "$WALLET",
            _quantity: "$QUANTITY",
            _tokenId: 0,
          },
          payment: {
            currency: "MATIC",
            value: "0.0001  * $QUANTITY",
          },
        },
        eligibilityMethod: {
          name: "getClaimIneligibilityReason",
          args: {
            _recipient: "$WALLET",
            _quantity: "$QUANTITY",
            _tokenId: 0,
          },
        },
      }),
    }
  );
  if (!resp.ok) {
    const message = await resp.text();
    console.log("message", message);
    return res.status(500).json({ error: message });
  }
  const result = await resp.json();
  return res.status(200).json({ sdkClientSecret: result.sdkClientSecret });
}
