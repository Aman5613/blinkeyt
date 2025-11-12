function generateVerificationEmail({name, url}) {
  return `
    <html>
      <body style="font-family: Arial; text-align: center; padding: 20px;">
        <h2>Hello ${name},</h2>
        <p>Please verify your email by clicking the link below:</p>
        <a href="${url}" style="
          background-color: #007bff;
          color: white;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
          display: inline-block;
          margin-top: 10px;">
          Verify Email
        </a>
        <p style="margin-top: 20px; font-size: 12px; color: gray;">
          If you didn’t request this, please ignore this message.
        </p>
      </body>
    </html>
  `;
}

export default generateVerificationEmail;