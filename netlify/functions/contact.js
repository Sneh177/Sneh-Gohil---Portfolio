import nodemailer from 'nodemailer';

export const handler = async (event) => {
  // CORS Preflight handling
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ success: false, error: 'Method not allowed' }),
    };
  }

  try {
    const { name, email, subject, message } = JSON.parse(event.body || '{}');

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          success: false,
          error: 'Please fill in all required fields (Name, Email, Message).',
        }),
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          success: false,
          error: 'Please provide a valid email address.',
        }),
      };
    }

    const emailUser = (process.env.EMAIL_USER || '').trim();
    const emailPass = (process.env.EMAIL_PASS || '').trim();

    if (!emailUser || !emailPass) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          success: true,
          message: 'Thank you for reaching out! Your message has been received and Sneh will get back to you shortly.',
        }),
      };
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass.replace(/\s+/g, ''),
      },
    });

    const safeSubject = subject ? subject.trim() : `Portfolio Inquiry from ${name}`;

    const mailOptions = {
      from: `"${name}" <${emailUser}>`,
      replyTo: email,
      to: emailUser,
      subject: `[Portfolio Lead] New Message from ${name}`,
      text: `You have received a new contact submission from your portfolio:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>New Portfolio Lead</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; padding: 24px; margin: 0;">
            <div style="max-width: 580px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
              <div style="background: #0f172a; padding: 24px 32px; color: #ffffff;">
                <h1 style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em;">New Portfolio Lead 🚀</h1>
                <p style="margin: 6px 0 0; font-size: 13px; color: #94a3b8;">Sent from your portfolio contact form</p>
              </div>
              <div style="padding: 32px;">
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                  <tr>
                    <td style="padding: 10px 0; font-size: 13px; font-weight: 600; color: #64748b; width: 90px; text-transform: uppercase;">Name:</td>
                    <td style="padding: 10px 0; font-size: 15px; font-weight: 600; color: #0f172a;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase;">Email:</td>
                    <td style="padding: 10px 0; font-size: 15px; font-weight: 500; color: #2563eb;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
                  </tr>
                </table>
                <div style="background: #f1f5f9; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                  <div style="font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.05em;">Message:</div>
                  <div style="font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${message}</div>
                </div>
                <div style="text-align: center;">
                  <a href="mailto:${email}?subject=Re: ${encodeURIComponent(safeSubject)}" style="display: inline-block; background-color: #0f172a; color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 600; padding: 12px 28px; border-radius: 8px;">Reply to ${name}</a>
                </div>
              </div>
              <div style="background: #f8fafc; border-top: 1px solid #f1f5f9; padding: 16px 32px; font-size: 11px; color: #94a3b8; text-align: center;">
                Sneh Gohil Portfolio &bull; Automated notification via Nodemailer
              </div>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: true,
        message: 'Thank you for reaching out! Your message has been delivered directly to Sneh, and I will get back to you shortly.',
      }),
    };
  } catch (error) {
    console.error('Nodemailer Netlify Function error:', error);
    let friendlyError = error.message || 'Failed to send message.';
    if (error.message && error.message.includes('BadCredentials')) {
      friendlyError = 'Google Authentication failed. Please ensure the 16-character App Password matches EMAIL_USER (' + emailUser + ').';
    }
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: false,
        error: friendlyError,
      }),
    };
  }
};
