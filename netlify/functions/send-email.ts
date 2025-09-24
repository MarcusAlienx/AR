import type { Handler } from "@netlify/functions";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { type, ...formData } = body;

    if (type === "contact") {
      // Handle Contact Form Submission
      const { name, email, phone, eventType, eventDate, message, preferredContact } = formData;
      await resend.emails.send({
        from: "web@albertorodriguez.com", // Must be a verified domain on Resend
        to: "info@albertorodriguez.com",
        subject: `Nuevo Mensaje de Contacto de ${name}`,
        html: `
          <h1>Nuevo Mensaje de Contacto</h1>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone}</p>
          <p><strong>Tipo de Evento:</strong> ${eventType}</p>
          <p><strong>Fecha del Evento:</strong> ${eventDate}</p>
          <p><strong>Método de Contacto Preferido:</strong> ${preferredContact}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${message}</p>
        `,
      });
    } else if (type === "newsletter") {
      // Handle Newsletter Subscription
      const { email } = formData;
      await resend.emails.send({
        from: "web@albertorodriguez.com", // Must be a verified domain on Resend
        to: "info@albertorodriguez.com",
        subject: "Nueva Suscripción al Newsletter",
        html: `
          <h1>Nueva Suscripción al Newsletter</h1>
          <p>El siguiente correo electrónico se ha suscrito:</p>
          <p><strong>Email:</strong> ${email}</p>
        `,
      });
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid form type" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully" }),
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send email" }),
    };
  }
};

export { handler };