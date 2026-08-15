export const otpEmailTemplate = ({ otp, expiryMinutes = 5 }) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="dark" />
  <meta name="supported-color-schemes" content="dark" />
  <title>Husnova Verification</title>
</head>

<body style="
  margin: 0;
  padding: 0;
  background-color: #16171c;
  font-family: 'Source Sans 3', 'Segoe UI', Helvetica, Arial, sans-serif;
  color: #d9e4e8;
">

  <div style="display:none; max-height:0; overflow:hidden; mso-hide:all; font-size:1px; line-height:1px; color:#16171c; opacity:0;">
    Your Husnova verification code expires in ${expiryMinutes} minutes.
  </div>

  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="background-color: #16171c; padding: 40px 15px;"
  >

    <tr>
      <td align="center">

        <!-- Main Card -->
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            max-width: 480px;
            background-color: #1e2024;
            border-radius: 20px;
            overflow: hidden;
            border: 1px solid #22434f;
          "
        >

          <!-- Header -->
          <tr>
            <td
              style="
                background-color: #22434f;
                padding: 32px 25px;
                text-align: center;
              "
            >
             Husnova
              <div style="
                margin-top: 10px;
                font-size: 13px;
                color: #8fa3ab;
                letter-spacing: 0.3px;
              ">
                Your music. Your vibe.
              </div>

            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 35px 30px;">

              <h1 style="
                margin: 0;
                font-size: 22px;
                line-height: 1.4;
                color: #d9e4e8;
                text-align: center;
                font-weight: 700;
              ">
                Verify your email
              </h1>

              <p style="
                margin: 18px 0 0;
                font-size: 15px;
                line-height: 1.7;
                color: #8fa3ab;
                text-align: center;
              ">
                Use the verification code below to continue
                signing in to your Husnova account.
              </p>

              <!-- OTP -->
              <div style="
                margin: 30px auto;
                padding: 20px 20px;
                background-color: #16171c;
                border: 1px solid #35697d;
                border-radius: 14px;
                text-align: center;
              ">

                <div style="
                  font-size: 12px;
                  color: #8fa3ab;
                  margin-bottom: 10px;
                  text-transform: uppercase;
                  letter-spacing: 1.5px;
                ">
                  Verification Code
                </div>

                <div style="
                  font-size: 34px;
                  font-weight: 700;
                  letter-spacing: 8px;
                  color: #65abc4;
                  font-family: 'Courier New', Courier, monospace;
                ">
                  ${otp}
                </div>

              </div>

              <p style="
                margin: 0;
                font-size: 13px;
                line-height: 1.6;
                color: #8fa3ab;
                text-align: center;
              ">
                This code will expire in
                <strong style="color: #65abc4;">
                  ${expiryMinutes} minutes
                </strong>.
              </p>

              <p style="
                margin: 20px 0 0;
                font-size: 13px;
                line-height: 1.6;
                color: #8fa3ab;
                text-align: center;
              ">
                For your security, never share this code with anyone.
                If you didn't request it, you can safely ignore this email.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="
              padding: 20px 25px;
              background-color: #16171c;
              border-top: 1px solid #22434f;
              text-align: center;
            ">

              <p style="
                margin: 0;
                font-size: 12px;
                color: #8fa3ab;
              ">
                &copy; ${new Date().getFullYear()} Husnova
              </p>

              <p style="
                margin: 6px 0 0;
                font-size: 11px;
                color: #4c8da6;
              ">
                This is an automated email. Please don't reply.
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>

  </table>

</body>
</html>
`;
};
