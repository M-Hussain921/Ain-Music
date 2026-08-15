import "dotenv/config";
import { google } from "googleapis";
import http from "http";
import open from "open";
import destroyer from "server-destroy";

console.log("GOOGLE_CLIENT_ID:", process.env.GMAIL_CLIENT_ID);
console.log("GOOGLE_REDIRECT_URI:", process.env.GMAIL_REDIRECT_URI);

const SCOPES = [
  "https://www.googleapis.com/auth/gmail.send",
];

const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  "http://localhost:3000/oauth2callback",
);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  prompt: "consent",
  scope: SCOPES,
});

console.log("\nOpen this URL:\n");
console.log(authUrl);

const server = http.createServer(async (req, res) => {
  try {
    if (req.url?.startsWith("/oauth2callback")) {
      const url = new URL(req.url, "http://localhost:3000");

      const code = url.searchParams.get("code");

      if (!code) {
        res.end("Authorization failed.");
        return;
      }

      const { tokens } = await oauth2Client.getToken(code);

      console.log("\n==============================");
      console.log("GMAIL REFRESH TOKEN:");
      console.log(tokens.refresh_token);
      console.log("==============================\n");

      res.end(
        "Authorization successful. You can close this browser window.",
      );

      server.destroy();
    }
  } catch (error) {
    console.error(error);
    res.end("Authorization failed.");
  }
});

destroyer(server);

server.listen(3000, () => {
  open(authUrl);
});