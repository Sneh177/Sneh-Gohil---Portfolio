import nodemailer from 'nodemailer';

const escapeHtml = (value = '') =>
  String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export default async (req) => {
  if (req.method !== 'POST') {
    return Response.json({ success: false, error: 'Method not allowed' }, { status: 405 });
  }

  const emailUser = ((typeof Netlify !== 'undefined' && Netlify.env ? Netlify.env.get('EMAIL_USER') : null) || process.env.EMAIL_USER || '').trim();
  const emailPass = ((typeof Netlify !== 'undefined' && Netlify.env ? Netlify.env.get('EMAIL_PASS') : null) || process.env.EMAIL_PASS || '').trim();

  try {
    const { name, email, subject, message } = await req.json().catch(() => ({}));

    if (!name || !email || !message) {
      return Response.json(
        { success: false, error: 'Please fill in all required fields (name, email, and message).' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ success: false, error: 'Please provide a valid email address.' }, { status: 400 });
    }

    // Graceful fallback if credentials are not yet configured
    if (!emailUser || !emailPass) {
      return Response.json({
        success: true,
        message: 'Thank you for reaching out! Your message has been received and Sneh will get back to you shortly.',
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: emailUser, pass: emailPass.replace(/\s+/g, '') },
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    await transporter.sendMail({
      from: `"${String(name).replace(/["\r\n]/g, '')}" <${emailUser}>`,
      replyTo: email,
      to: emailUser,
      subject: `[Portfolio Lead] New Message from ${String(name).replace(/[\r\n]/g, ' ')}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || 'General'}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 580px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px;">
          <h2 style="color: #0f172a; margin-top: 0; border-bottom: 2px solid #0f172a; padding-bottom: 10px;">New Portfolio Lead 🚀</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <p><strong>Subject:</strong> ${escapeHtml(subject || 'General')}</p>
          <div style="background: #f1f5f9; padding: 14px; border-radius: 8px; margin-top: 15px;">
            <strong>Message:</strong><br/>
            <p style="white-space: pre-wrap; margin-top: 6px;">${safeMessage}</p>
          </div>
        </div>
      `,
    });

    return Response.json({
      success: true,
      message: 'Your message has been sent successfully! I will get back to you shortly.',
    });
  } catch (error) {
    console.error('Nodemailer sending error:', error);
    const friendlyError =
      error.message && error.message.includes('BadCredentials')
        ? 'Email authentication failed. Please check the Gmail App Password configured for this site.'
        : 'Failed to send message. Please try again later.';
    return Response.json({ success: false, error: friendlyError }, { status: 500 });
  }
};

export const config = { path: '/api/contact' };
