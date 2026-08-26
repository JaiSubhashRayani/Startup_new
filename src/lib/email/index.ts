/**
 * Email notification utility
 *
 * In production, this would use a service like Resend, SendGrid, or AWS SES.
 * For now, it logs the emails to console.
 */

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(options: SendEmailOptions): Promise<void> {
  // TODO: Integrate with Resend or similar email service
  // For now, log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log("\n📧 Email would be sent:");
    console.log(`  To: ${options.to}`);
    console.log(`  Subject: ${options.subject}`);
    console.log(`  Preview: ${options.html.substring(0, 100)}...`);
    return;
  }

  // Production implementation:
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: "LockFrame <noreply@yourdomain.com>",
  //   to: options.to,
  //   subject: options.subject,
  //   html: options.html,
  // });
}

export function buildUnlockEmail(data: {
  clientName: string;
  projectName: string;
  downloadUrl: string;
  expiresAt: Date;
  amountPaid: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8f9fa; margin: 0; padding: 40px 20px; }
        .container { max-width: 500px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .header { background: #7c3aed; padding: 32px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 24px; }
        .body { padding: 32px; }
        .btn { display: inline-block; background: #7c3aed; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; }
        .footer { padding: 24px 32px; background: #f8f9fa; text-align: center; font-size: 12px; color: #6b7280; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Your Files Are Ready!</h1>
        </div>
        <div class="body">
          <p>Hi ${data.clientName},</p>
          <p>Thank you for your payment of <strong>${data.amountPaid}</strong> for <strong>${data.projectName}</strong>.</p>
          <p>Your full-resolution files are ready to download:</p>
          <p style="text-align: center; margin: 32px 0;">
            <a href="${data.downloadUrl}" class="btn">Download Files</a>
          </p>
          <p style="font-size: 14px; color: #6b7280;">
            This link expires on ${data.expiresAt.toLocaleDateString()}.
          </p>
        </div>
        <div class="footer">
          Powered by LockFrame
        </div>
      </div>
    </body>
    </html>
  `;
}

export function buildDeliveryEmail(data: {
  clientName: string;
  projectName: string;
  deliveryUrl: string;
  creatorName: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8f9fa; margin: 0; padding: 40px 20px; }
        .container { max-width: 500px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .header { background: #7c3aed; padding: 32px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 24px; }
        .body { padding: 32px; }
        .btn { display: inline-block; background: #7c3aed; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; }
        .footer { padding: 24px 32px; background: #f8f9fa; text-align: center; font-size: 12px; color: #6b7280; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Your Deliverables Are Ready</h1>
        </div>
        <div class="body">
          <p>Hi ${data.clientName},</p>
          <p><strong>${data.creatorName}</strong> has sent you deliverables for <strong>${data.projectName}</strong>.</p>
          <p>Click below to preview and download your files:</p>
          <p style="text-align: center; margin: 32px 0;">
            <a href="${data.deliveryUrl}" class="btn">View Deliverables</a>
          </p>
        </div>
        <div class="footer">
          Powered by LockFrame
        </div>
      </div>
    </body>
    </html>
  `;
}
