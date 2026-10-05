import { getDatabase } from "@netlify/database";

const db = getDatabase();

export default async (req) => {
  if (req.method === "GET") {
    const items = await db.sql`
      SELECT id, name, created_at FROM items ORDER BY created_at DESC, id DESC
    `;
    return Response.json(items);
  }

  if (req.method === "POST") {
    let body;
    try {
      body = await req.json();
    } catch {
      return Response.json({ error: "Invalid JSON" }, { status: 400 });
    }
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    if (!name) {
      return Response.json({ error: "Name is required" }, { status: 400 });
    }
    const [item] = await db.sql`
      INSERT INTO items (name) VALUES (${name.slice(0, 200)})
      RETURNING id, name, created_at
    `;
    return Response.json(item, { status: 201 });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config = {
  path: "/api/items",
};
