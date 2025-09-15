import 'dotenv/config';
import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { storage } from "../../server/storage";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const contacts = await storage.getContacts();
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contacts),
    };
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch contacts" }),
    };
  }
};

export { handler };
