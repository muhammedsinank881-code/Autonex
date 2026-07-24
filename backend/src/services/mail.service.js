import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTPEmail = async (email, otp) => {
  await transporter.sendMail({
    from: `"Autonex" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Autonex Email Verification",
    html: `
      <h2>Your OTP is</h2>
      <h1>${otp}</h1>
      <p>This OTP will expire in 1 minute.</p>
    `,
  });
};
