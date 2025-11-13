function otpMailTemplate(name, otp) {
  return `
  <div style="font-family:sans-serif;padding:16px;background:#f9f9f9;">
    <h2 style="color:#333;">Hi ${name || "User"},</h2>
    <p>Your OTP for password reset is:</p>
    <h1 style="color:#2563eb;">${otp}</h1>
    <p>This OTP is valid for 10 minutes. Please don’t share it with anyone.</p>
    <p>— Team Blinkeyt</p>
  </div>`;
}
export default otpMailTemplate;