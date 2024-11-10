import nodemailer from "nodemailer";
import type { APIRoute } from "astro";
import { render } from "@react-email/components";
import ContactRequestEmail from "src/emails/ContactEmail"; // Assurez-vous que ce chemin est correct

import type { FormData } from "@components/contact-page-sections/react/ContactForm";
const transporter = nodemailer.createTransport({
  host: import.meta.env.SMTP_HOST,
  port: parseInt(import.meta.env.SMTP_PORT, 10),
  secure: true,
  auth: {
    user: import.meta.env.SMTP_USER,
    pass: import.meta.env.SMTP_PASS,
  },
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    const html = await render(ContactRequestEmail(data));
    const mailOptions = {
      from: "teemohmost2020@gmail.com",
      to: "sphaeratech@gmail.com",
      subject: "Demande de contact",
      html,
    };
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
};
