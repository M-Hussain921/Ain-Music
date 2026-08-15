import { google } from "googleapis";
import MailComposer from "nodemailer/lib/mail-composer/index.js";

const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
);

oauth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

const gmail = google.gmail({
  version: "v1",
  auth: oauth2Client,
});

const createRawMessage = async ({
  from,
  to,
  subject,
  html,
}) => {
  const mail = new MailComposer({
    from,
    to,
    subject,
    html,
  });

  const message = await mail.compile().build();

  return message
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

export const sendMail = async ({
  to,
  subject,
  html,
}) => {
  if (!to) {
    throw new Error("Recipient email is required");
  }

  if (!process.env.GMAIL_REFRESH_TOKEN) {
    throw new Error("GMAIL_REFRESH_TOKEN is missing");
  }

  const from = `"Husova" <${process.env.EMAIL_USER}>`;

  const raw = await createRawMessage({
    from,
    to,
    subject,
    html,
  });

  const response = await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw,
    },
  });

  console.log("Email sent:", response.data.id);

  return response.data;
};