import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import nodemailer from 'nodemailer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: 'contact-api-dev-server',
        configureServer(server) {
          server.middlewares.use('/api/contact', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: 'Method not allowed' }));
              return;
            }

            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });

            req.on('end', async () => {
              const emailUser = (env.EMAIL_USER || process.env.EMAIL_USER || '').trim();
              const emailPass = (env.EMAIL_PASS || process.env.EMAIL_PASS || '').trim();

              try {
                const { name, email, subject, message } = JSON.parse(body || '{}');

                if (!name || !email || !message) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(
                    JSON.stringify({
                      success: false,
                      error: 'Please fill in all required fields (Name, Email, Message).',
                    })
                  );
                  return;
                }

                // If no credentials in .env, log cleanly and return demo success
                if (!emailUser || !emailPass) {
                  console.log('\n--- [CONTACT FORM SUBMISSION (DEMO MODE)] ---');
                  console.log(`From: ${name} (${email})`);
                  console.log(`Subject: ${subject || 'General'}`);
                  console.log(`Message: ${message}`);
                  console.log('---------------------------------------------');
                  console.log('(To deliver real emails, enter your 16-character Google App Password in .env)\n');

                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(
                    JSON.stringify({
                      success: true,
                      demo: true,
                      message:
                        'Message received! (Add your 16-character Google App Password in .env to deliver live emails to your Gmail inbox).',
                    })
                  );
                  return;
                }

                const transporter = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                    user: emailUser,
                    pass: emailPass.replace(/\s+/g, ''),
                  },
                });

                await transporter.sendMail({
                  from: `"${name}" <${emailUser}>`,
                  replyTo: email,
                  to: emailUser,
                  subject: `[Portfolio Lead] New Message from ${name}`,
                  text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
                  html: `
                    <div style="font-family: Arial, sans-serif; max-width: 580px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px;">
                      <h2 style="color: #0f172a; margin-top: 0; border-bottom: 2px solid #0f172a; padding-bottom: 10px;">New Portfolio Lead 🚀</h2>
                      <p><strong>Name:</strong> ${name}</p>
                      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                      <div style="background: #f1f5f9; padding: 14px; border-radius: 8px; margin-top: 15px;">
                        <strong>Message:</strong><br/>
                        <p style="white-space: pre-wrap; margin-top: 6px;">${message}</p>
                      </div>
                    </div>
                  `,
                });

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(
                  JSON.stringify({
                    success: true,
                    message: 'Your message has been sent successfully! I will get back to you shortly.',
                  })
                );
              } catch (err) {
                console.error('[Nodemailer Dev Error]:', err);
                let friendlyError = err.message || 'Failed to send message.';
                if (err.message && err.message.includes('BadCredentials')) {
                  friendlyError = 'Google Authentication failed. Please ensure the 16-character App Password in .env was generated specifically for the Gmail account listed in EMAIL_USER (' + emailUser + ').';
                }
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(
                  JSON.stringify({
                    success: false,
                    error: friendlyError,
                  })
                );
              }
            });
          });
        },
      },
    ],
    server: {
      host: true,
      port: 3000,
      open: false,
    },
  };
});
