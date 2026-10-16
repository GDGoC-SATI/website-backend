import nodemailer from 'nodemailer';

const createTransporter = () => {
  const service = process.env.EMAIL_SERVICE || 'gmail';
  const user = (process.env.EMAIL_USER || '').trim();
  const pass = (process.env.EMAIL_PASS || '').replace(/\s+/g, '').trim();

  if (!user || !pass) {
    console.warn('[EmailService] EMAIL_USER or EMAIL_PASS not configured in .env');
  }

  return nodemailer.createTransport({
    service,
    auth: {
      user,
      pass,
    },
  });
};

const getEmailTemplate = (otp, title, description) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; color: #f8fafc; }
        .wrapper { width: 100%; max-width: 580px; margin: 0 auto; padding: 40px 20px; }
        .container { background-color: #1e293b; border-radius: 20px; overflow: hidden; border: 1px solid #334155; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); }
        .header { background: linear-gradient(135deg, #1a73e8 0%, #4285f4 50%, #34a853 100%); padding: 32px 24px; text-align: center; }
        .header h1 { margin: 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
        .header p { margin: 6px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 13px; font-weight: 500; }
        .content { padding: 36px 28px; text-align: center; }
        .content h2 { margin: 0 0 12px; font-size: 20px; color: #f1f5f9; font-weight: 700; }
        .content p { margin: 0 0 28px; font-size: 14px; line-height: 1.6; color: #94a3b8; }
        .otp-box { background: #0f172a; border: 2px dashed #4285f4; border-radius: 16px; padding: 20px 28px; margin: 0 auto 28px; display: inline-block; }
        .otp-code { font-size: 38px; font-weight: 800; letter-spacing: 8px; color: #60a5fa; font-family: 'Courier New', Courier, monospace; }
        .note { font-size: 12px; color: #64748b; line-height: 1.5; margin-bottom: 24px; }
        .footer { border-top: 1px solid #334155; padding: 20px; text-align: center; font-size: 12px; color: #64748b; background-color: #162032; }
        .highlight { color: #38bdf8; font-weight: 600; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <div class="header">
            <h1>GDG on Campus SATI</h1>
            <p>Google Developer Groups on Campus &bull; Vidisha</p>
          </div>
          <div class="content">
            <h2>${title}</h2>
            <p>${description}</p>
            <div class="otp-box">
              <div class="otp-code">${otp}</div>
            </div>
            <p class="note">
              This verification code will expire in <span class="highlight">10 minutes</span>.<br>
              If you did not request this verification code, please ignore this email.
            </p>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} GDG on Campus SATI Vidisha. All rights reserved.
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const sendOtpEmail = async ({ to, otp, purpose }) => {
  const transporter = createTransporter();

  let subject = 'Your GDG Verification Code';
  let title = 'Verify Your Account';
  let description = 'Please use the one-time verification code below to verify your account:';

  if (purpose === 'signup') {
    subject = `Your GDG Account Verification Code`;
    title = 'Welcome to GDG on Campus SATI!';
    description = 'Thank you for joining our developer community. Use the one-time code below to complete your registration:';
  } else if (purpose === 'login') {
    subject = `Your GDG Login Code`;
    title = 'Sign In to Your Account';
    description = 'Use the one-time code below to securely sign in to your GDG on Campus account:';
  } else if (purpose === 'forgot_password') {
    subject = `Your GDG Password Reset Code`;
    title = 'Reset Your Password';
    description = 'We received a request to reset your password. Use the verification code below to set a new password:';
  }

  const html = getEmailTemplate(otp, title, description);

  const mailOptions = {
    from: `"GDG on Campus SATI" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text: `Your verification code is: ${otp}. It expires in 10 minutes.`,
    html,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`[EmailService] OTP email sent to ${to} (purpose: ${purpose}, messageId: ${info.messageId})`);
  return info;
};

export const sendInquiryReplyEmail = async ({
  to,
  recipientName,
  originalQuery,
  replyMessage,
  subject,
  adminName,
}) => {
  const transporter = createTransporter();

  const emailSubject = subject || `Response to Your Inquiry - GDG on Campus SATI Vidisha`;
  const sanitizedName = (recipientName || 'Community Member').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const sanitizedOriginal = (originalQuery || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const formattedReply = replyMessage.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>');

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${emailSubject}</title>
      <style>
        body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; color: #f8fafc; }
        .wrapper { width: 100%; max-width: 620px; margin: 0 auto; padding: 36px 16px; }
        .container { background-color: #1e293b; border-radius: 24px; overflow: hidden; border: 1px solid #334155; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); }
        .header { background: linear-gradient(135deg, #1a73e8 0%, #4285f4 50%, #34a853 100%); padding: 36px 28px; text-align: center; }
        .header h1 { margin: 0 0 6px 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
        .header p { margin: 0; color: rgba(255, 255, 255, 0.95); font-size: 13px; font-weight: 500; letter-spacing: 0.3px; }
        .content { padding: 36px 30px; }
        .salutation { font-size: 16px; color: #f1f5f9; margin: 0 0 16px; font-weight: 600; }
        .intro { font-size: 14px; line-height: 1.6; color: #cbd5e1; margin: 0 0 24px; }
        .quote-box { background: #0f172a; border-left: 4px solid #4285f4; border-radius: 0 12px 12px 0; padding: 16px 20px; margin: 0 0 24px; }
        .quote-label { margin: 0 0 6px; font-size: 11px; text-transform: uppercase; font-weight: 700; color: #60a5fa; letter-spacing: 0.5px; }
        .quote-text { margin: 0; font-size: 13px; color: #94a3b8; font-style: italic; line-height: 1.6; }
        .reply-box { background: rgba(66, 133, 244, 0.08); border: 1.5px solid rgba(66, 133, 244, 0.3); border-radius: 14px; padding: 22px; margin: 0 0 28px; }
        .reply-label { margin: 0 0 10px; font-size: 11px; text-transform: uppercase; font-weight: 700; color: #38bdf8; letter-spacing: 0.5px; }
        .reply-content { font-size: 14px; color: #f8fafc; line-height: 1.7; }
        .cta-container { text-align: center; margin: 28px 0; }
        .cta-btn { display: inline-block; background: #4285f4; color: #ffffff !important; text-decoration: none; padding: 12px 30px; border-radius: 50px; font-weight: 700; font-size: 13px; letter-spacing: 0.3px; }
        .footer { border-top: 1px solid #334155; padding: 24px 28px; text-align: center; font-size: 12px; color: #64748b; background-color: #162032; line-height: 1.6; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <div class="header">
            <h1>GDG on Campus SATI</h1>
            <p>Google Developer Groups on Campus &bull; Vidisha</p>
          </div>
          <div class="content">
            <p class="salutation">Dear <strong>${sanitizedName}</strong>,</p>
            <p class="intro">
              Thank you for contacting GDG on Campus SATI Vidisha. Our core organizing team has reviewed your query and is pleased to provide you with the following response:
            </p>

            <div class="quote-box">
              <div class="quote-label">Your Original Inquiry</div>
              <div class="quote-text">&ldquo;${sanitizedOriginal}&rdquo;</div>
            </div>

            <div class="reply-box">
              <div class="reply-label">Response from ${adminName || 'GDG SATI Team'}</div>
              <div class="reply-content">${formattedReply}</div>
            </div>

            <p style="font-size: 13px; color: #94a3b8; line-height: 1.6; margin: 0 0 20px;">
              If you have any further questions or would like to get involved, please feel free to reply or visit our official community portal.
            </p>

            <div class="cta-container">
              <a href="https://gdgocsati.vercel.app" class="cta-btn">Visit Chapter Portal &rarr;</a>
            </div>
          </div>
          <div class="footer">
            <p style="margin: 0 0 4px 0;"><strong>Google Developer Groups on Campus &bull; SATI Vidisha</strong></p>
            <p style="margin: 0 0 4px 0;">Samrat Ashok Technological Institute, Vidisha (M.P.) - 464001</p>
            <p style="margin: 0;">&copy; ${new Date().getFullYear()} GDG on Campus SATI. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"GDG on Campus SATI" <${process.env.EMAIL_USER}>`,
    to,
    subject: emailSubject,
    text: `Dear ${sanitizedName},\n\nRegarding your inquiry:\n"${originalQuery}"\n\nResponse from ${adminName || 'GDG SATI Team'}:\n${replyMessage.trim()}\n\nVisit: https://gdgocsati.vercel.app\nGDG on Campus SATI Vidisha`,
    html,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`[EmailService] Inquiry reply email sent to ${to} (messageId: ${info.messageId})`);
  return info;
};

