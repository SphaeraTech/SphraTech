import nodemailer from "nodemailer";
import type { APIRoute } from "astro";
import { render } from "@react-email/components";
import ContactRequestEmail from "src/emails/ContactEmail"; // Assurez-vous que ce chemin est correct

import type { FormData } from "@components/contact-page-sections/react/ContactForm";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "mohmost32@gmail.com",
    pass: "jlwyjoxtjsmayikr",
  },
});

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log("Request headers:", request.headers);
    const data = await request.json();
    console.log("Received data:", data);
    const html = await render(ContactRequestEmail(data));
    const mailOptions = {
      from: data.email,
      to: "mohmost32@gmail.com",
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
