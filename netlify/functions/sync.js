import { getDatabase } from "@netlify/database";

const db = getDatabase();

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const expected = process.env.API_TOKEN;
  const auth = req.headers.get("authorization") || "";

  if (!expected || auth !== `Bearer ${expected}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await db.sql`
    INSERT INTO items (name) VALUES ('added by GitHub Action')
  `;

  return Response.json({ ok: true }, { status: 200 });
};

export const config = {
  path: "/api/sync",
};
