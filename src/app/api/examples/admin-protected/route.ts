import { getServerSession, unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

import type { NextApiRequest, NextApiResponse } from "next"

export async function GET() {
  console.log("test 1")
  const session = await getServerSession(authOptions);

  console.log(session)
  if (session) {
    return new Response(JSON.stringify({
      content:
        "This is protected page. You can access this page because you are signed in.",
    }), { status: 200 })
  }

  return new Response(JSON.stringify({
    error: "You must be signed in to view the protected page.",
  }), { status: 300 })
}