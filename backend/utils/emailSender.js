const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
    console.log("Email sent successfully");
    console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS)
  } catch (err) {
    console.log("Email error:", err.message);
    console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS)
  }
};