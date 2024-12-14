import nodemailer from "nodemailer";
import type { APIRoute } from "astro";
import { render } from "@react-email/components";
import ContactRequestEmail from "src/emails/ContactEmail"; // Assurez-vous que ce chemin est correct
import dotenv from "dotenv"
dotenv.config()
import type { FormData } from "@components/contact-page-sections/react/ContactForm";

const transporter = nodemailer.createTransport({
  host: process.env.SMPT_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const html = await render(ContactRequestEmail(data));
    const mailOptions = {
      from: data.email,
      to: "sphaeratech@gmail.com",
      subject: "Demande de devis",
      html,
    };
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
};
