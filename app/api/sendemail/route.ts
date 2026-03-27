import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string[];
  budget: string;
  timeline: string;
  message: string;
  meta: {
    location?: string;
    timezone?: string;
    userAgent?: string;
    language?: string;
  };
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // Use true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: NextRequest) {
  try {
    const data: ContactFormData = await req.json();

    // 1. Get the Client IP Address
    // In production (Vercel/Cloudflare), the IP is in 'x-forwarded-for'
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(/, /)[0] : "127.0.0.1";

    // 2. Fetch Location Server-Side (No CORS issues here!)
    let detectedLocation = "Unknown Location";
    if (ip !== "127.0.0.1") {
      try {
        const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,regionName,city`);
        const geoData = await geoRes.json();
        if (geoData.status === "success") {
          detectedLocation = `${geoData.city}, ${geoData.regionName}, ${geoData.country}`;
        }
      } catch (geoError) {
        console.error("Geo lookup failed:", geoError);
      }
    }

    const servicesList = data.service.join(", ");

    const html = `
    <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;color:#333;line-height:1.6;">
      <h2 style="color:#111;border-bottom:2px solid #ef4444;padding-bottom:10px;">📩 New Project Inquiry</h2>
      <p>You received a new message from your website contact form.</p>

      <h3 style="color:#ef4444">Client Information</h3>
      <table style="border-collapse:collapse;width:100%">
        <tr>
          <td style="padding:10px;border:1px solid #eee;background:#f9f9f9;width:30%"><strong>Name</strong></td>
          <td style="padding:10px;border:1px solid #eee">${data.name}</td>
        </tr>
        <tr>
          <td style="padding:10px;border:1px solid #eee;background:#f9f9f9"><strong>Email</strong></td>
          <td style="padding:10px;border:1px solid #eee"><a href="mailto:${data.email}">${data.email}</a></td>
        </tr>
        <tr>
          <td style="padding:10px;border:1px solid #eee;background:#f9f9f9"><strong>Phone</strong></td>
          <td style="padding:10px;border:1px solid #eee">${data.phone || "-"}</td>
        </tr>
        <tr>
          <td style="padding:10px;border:1px solid #eee;background:#f9f9f9"><strong>Services</strong></td>
          <td style="padding:10px;border:1px solid #eee">
            ${data.service.map(s => `<span style="display:inline-block;background:#fee2e2;color:#b91c1c;padding:2px 8px;border-radius:4px;margin-right:5px;font-size:12px;">${s}</span>`).join('')}
          </td>
        </tr>
        <tr>
          <td style="padding:10px;border:1px solid #eee;background:#f9f9f9"><strong>Budget</strong></td>
          <td style="padding:10px;border:1px solid #eee">${data.budget}</td>
        </tr>
        <tr>
          <td style="padding:10px;border:1px solid #eee;background:#f9f9f9"><strong>Timeline</strong></td>
          <td style="padding:10px;border:1px solid #eee">${data.timeline}</td>
        </tr>
      </table>

      <h3 style="color:#ef4444;margin-top:25px">Project Details</h3>
      <div style="padding:15px;border:1px solid #eee;border-radius:8px;background:#fff;white-space:pre-line;border-left:4px solid #ef4444">
        ${data.message}
      </div>

      <h3 style="color:#666;margin-top:25px;font-size:16px;">Technical Metadata</h3>
      <table style="border-collapse:collapse;width:100%;font-size:12px;color:#666">
        <tr>
          <td style="padding:6px;border:1px solid #eee"><strong>IP Address</strong></td>
          <td style="padding:6px;border:1px solid #eee">${ip}</td>
        </tr>
        <tr>
          <td style="padding:6px;border:1px solid #eee"><strong>Location</strong></td>
          <td style="padding:6px;border:1px solid #eee">${detectedLocation}</td>
        </tr>
        <tr>
          <td style="padding:6px;border:1px solid #eee"><strong>Timezone</strong></td>
          <td style="padding:6px;border:1px solid #eee">${data.meta?.timezone || "-"}</td>
        </tr>
        <tr>
          <td style="padding:6px;border:1px solid #eee"><strong>Browser Language</strong></td>
          <td style="padding:6px;border:1px solid #eee">${data.meta?.language || "-"}</td>
        </tr>
        <tr>
          <td style="padding:6px;border:1px solid #eee"><strong>User Agent</strong></td>
          <td style="padding:6px;border:1px solid #eee">${data.meta?.userAgent || "-"}</td>
        </tr>
      </table>

      <p style="font-size:11px;color:#999;margin-top:30px;text-align:center;border-top:1px solid #eee;padding-top:10px;">
        Sent via Spheratech Contact System • 2026
      </p>
    </div>
    `;

    await transporter.sendMail({
      from: `"Website Contact" <${process.env.CONTACT_EMAIL}>`,
      to: process.env.SMTP_USER,
      replyTo: data.email,
      subject: `${data.name} - ${servicesList.slice(0, 30)}...`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email API Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}