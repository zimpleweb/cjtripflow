import PDFDocument from 'pdfkit';
import nodemailer from 'nodemailer';
// DB als boven

export async function post({ request }) {
  const data = await request.json();
  // Save to DB
  // Genereer PDF
  const doc = new PDFDocument();
  doc.text('Invoice for ' + data.activitySlug);
  // ... vul in
  const buffers = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {
    const pdfData = Buffer.concat(buffers);
    // Stuur email
    const transporter = nodemailer.createTransport({ /* config */ });
    transporter.sendMail({
      from: 'info@cjtripflow.com',
      to: 'customer@email.com',
      subject: 'Your Invoice',
      attachments: [{ filename: 'invoice.pdf', content: pdfData }]
    });
  });
  doc.end();
  return { body: JSON.stringify({ success: true }) };
}