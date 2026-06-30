import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

router.post("/contact", async (req, res) => {
  const { name, phone, serviceType, message, email } = req.body;

  if (!name || !phone || !serviceType) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const gmailUser = process.env.GMAIL_USER || "andrea.plumbing.s@gmail.com";
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!gmailPass) {
    req.log.error("GMAIL_APP_PASSWORD not configured");
    res.status(500).json({ error: "Email service not configured" });
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  });

  const serviceLabels: Record<string, string> = {
    emergency: "Emergency Plumbing",
    drain: "Drain Cleaning",
    heater: "Water Heater",
    leak: "Leak Detection",
    fixture: "Fixture Installation",
    pipe: "Pipe Repair",
    kitchen: "Kitchen & Bath",
    backflow: "Backflow Prevention",
    other: "Other",
  };

  const serviceLabel = serviceLabels[serviceType] || serviceType;
  const now = new Date().toLocaleString("en-CA", { timeZone: "America/Edmonton" });

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0f172a; padding: 24px; border-radius: 8px 8px 0 0;">
        <h1 style="color: #f97316; margin: 0; font-size: 22px;">New Service Request</h1>
        <p style="color: #94a3b8; margin: 4px 0 0;">Andrea Plumbing Solutions — ${now}</p>
      </div>
      <div style="background: #1e293b; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #334155;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; color: #94a3b8; font-size: 14px; width: 140px;">Customer Name</td>
            <td style="padding: 12px 0; color: #f1f5f9; font-weight: bold;">${name}</td>
          </tr>
          <tr style="border-top: 1px solid #334155;">
            <td style="padding: 12px 0; color: #94a3b8; font-size: 14px;">Phone Number</td>
            <td style="padding: 12px 0; color: #f97316; font-weight: bold; font-size: 18px;">${phone}</td>
          </tr>
          ${email ? `<tr style="border-top: 1px solid #334155;"><td style="padding: 12px 0; color: #94a3b8; font-size: 14px;">Email</td><td style="padding: 12px 0; color: #f1f5f9;">${email}</td></tr>` : ""}
          <tr style="border-top: 1px solid #334155;">
            <td style="padding: 12px 0; color: #94a3b8; font-size: 14px;">Service Needed</td>
            <td style="padding: 12px 0;"><span style="background: #f97316; color: white; padding: 4px 12px; border-radius: 9999px; font-size: 14px; font-weight: bold;">${serviceLabel}</span></td>
          </tr>
          ${message ? `<tr style="border-top: 1px solid #334155;"><td style="padding: 12px 0; color: #94a3b8; font-size: 14px; vertical-align: top;">Message</td><td style="padding: 12px 0; color: #f1f5f9; line-height: 1.6;">${message}</td></tr>` : ""}
        </table>
        <div style="margin-top: 24px; padding: 16px; background: #f97316; border-radius: 8px; text-align: center;">
          <p style="margin: 0; color: white; font-weight: bold; font-size: 16px;">Call back: <a href="tel:${phone.replace(/\D/g, "")}" style="color: white;">${phone}</a></p>
        </div>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Andrea Plumbing Solutions" <${gmailUser}>`,
      to: "andrea.plumbing.s@gmail.com",
      subject: `New Service Request — ${serviceLabel} — ${name}`,
      html,
      text: `New service request from ${name}\nPhone: ${phone}\n${email ? `Email: ${email}\n` : ""}Service: ${serviceLabel}\n${message ? `Message: ${message}` : ""}`,
    });

    req.log.info({ name, serviceType }, "Contact form email sent");
    res.json({ success: true });
  } catch (err) {
    req.log.error(err, "Failed to send contact email");
    res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;
