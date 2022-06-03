import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(404).json({ error: "Method not allowed" });
  }
  // const body: { code: string } = JSON.parse(req.body);
  // const code = body.code;

  // const resp = await fetch("http://paper.xyz/api/v1/oauth/token", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: "Bearer c82495cb-c5a9-40d3-ade9-47a225faf9ae",
  //   },
  //   body: JSON.stringify({
  //     code,
  //     clientId: "dd92d312-3aeb-4822-b4a4-f4f25c527e57",
  //   }),
  // });

  // if (resp.status !== 200) {
  //   return res.status(500).json({ error: "Error getting user token" });
  // }
  // const { userToken } = await resp.json();

  const thing = await fetch("https://paper.xyz/api/v1/oauth/token", {
    method: "POST",
    headers: {
      Authorization: "Bearer 59dc41c5-600d-4b37-b27a-15195820f668",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      code: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YWxsZXRBZGRyZXNzIjoiMHg3YWI4NDcwNDFjMDQ0OTQwQkU1YzkwMWVlZTRkOThmMkY0OGExNzNBIiwiZW1haWwiOiJtem5ub3ZAZ21haWwuY29tIiwiaWF0IjoxNjUzNTA2NzM1LCJleHAiOjE2NTM1MDczMzUsImlzcyI6InBhcGVyLnh5eiJ9.cQk5s3IiEavGStRU6GGiS3vWYqJODIxMS4dpnunsi04",
      clientId: "cf288353-256c-4c6f-a179-091397e6f4c0",
    }),
  });
  if (thing.status !== 200) {
    console.log("await thing.text()", await thing.text());
  }
  const { userToken: home } = await thing.json();
  console.log("home", home);
  return res.status(200).json({ home });

  // return res.status(200).json({ userToken });
}
