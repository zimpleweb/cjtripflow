import nodemailer from 'nodemailer';

export async function post({ request }) {
  const { to, subject, text } = await request.json();
  const transporter = nodemailer.createTransport({ /* SMTP config */ });
  await transporter.sendMail({ from: 'info@cjtripflow.com', to, subject, text });
  return { body: JSON.stringify({ success: true }) };
}