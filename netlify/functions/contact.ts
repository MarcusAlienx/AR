import 'dotenv/config';
import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { storage } from "../../server/storage";
import { insertContactSchema } from "../../shared/schema";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const data = JSON.parse(event.body || "{}");
    const validatedData = insertContactSchema.parse(data);
    const contact = await storage.createContact(validatedData);
    return {
      statusCode: 201,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        message: "Solicitud de contacto enviada exitosamente", 
        contact 
      }),
    };
  } catch (error) {
    console.error("Error creating contact:", error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Datos de contacto inválidos" }),
    };
  }
};

export { handler };
