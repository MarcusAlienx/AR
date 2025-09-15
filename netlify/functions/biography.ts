import 'dotenv/config';
import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { storage } from "../../server/storage";
import { insertBiographySchema } from "../../shared/schema";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Handle GET requests
  if (event.httpMethod === "GET") {
    try {
      const biography = await storage.getBiography();
      if (!biography) {
        return { statusCode: 404, body: JSON.stringify({ error: "Biography not found" }) };
      }
      return { statusCode: 200, body: JSON.stringify(biography) };
    } catch (error) {
      console.error("Error fetching biography:", error);
      return { statusCode: 500, body: JSON.stringify({ error: "Failed to fetch biography" }) };
    }
  }

  // Handle PUT requests
  if (event.httpMethod === "PUT") {
    try {
      const data = JSON.parse(event.body || "{}");
      const validatedData = insertBiographySchema.parse(data);
      const biography = await storage.updateBiography(validatedData);
      return { statusCode: 200, body: JSON.stringify(biography) };
    } catch (error) {
      console.error("Error updating biography:", error);
      return { statusCode: 400, body: JSON.stringify({ error: "Invalid biography data" }) };
    }
  }

  return { statusCode: 405, body: "Method Not Allowed" };
};

export { handler };
