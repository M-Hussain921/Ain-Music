export const otpEmailTemplate = ({ otp, expiryMinutes = 5 }) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>Husnova Verification</title>
</head>

<body style="
  margin: 0;
  padding: 0;
  background-color: #f6f6f6;
  font-family: Arial, Helvetica, sans-serif;
  color: #1f2f2a;
">

  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="background-color: #f6f6f6; padding: 40px 15px;"
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
            background-color: #ffffff;
            border-radius: 20px;
            overflow: hidden;
            border: 1px solid #e6efe9;
          "
        >

          <!-- Header -->
          <tr>
            <td
              style="
                background-color: #2b5748;
                padding: 28px 25px;
                text-align: center;
              "
            >

              <div style="
                font-size: 26px;
                font-weight: 700;
                color: #ffffff;
                letter-spacing: 1px;
              ">
                Husnova
              </div>

              <div style="
                margin-top: 6px;
                font-size: 13px;
                color: #dce9e2;
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
                color: #1f2f2a;
                text-align: center;
              ">
                Verify your email
              </h1>

              <p style="
                margin: 18px 0 0;
                font-size: 15px;
                line-height: 1.7;
                color: #52796f;
                text-align: center;
              ">
                Use the verification code below to continue
                signing in to your Husnova account.
              </p>

              <!-- OTP -->
              <div style="
                margin: 30px auto;
                padding: 18px 20px;
                background-color: #e6efe9;
                border-radius: 14px;
                text-align: center;
              ">

                <div style="
                  font-size: 12px;
                  color: #52796f;
                  margin-bottom: 8px;
                  text-transform: uppercase;
                  letter-spacing: 1.5px;
                ">
                  Verification Code
                </div>

                <div style="
                  font-size: 34px;
                  font-weight: 700;
                  letter-spacing: 8px;
                  color: #618764;
                ">
                  ${otp}
                </div>

              </div>

              <p style="
                margin: 0;
                font-size: 13px;
                line-height: 1.6;
                color: #52796f;
                text-align: center;
              ">
                This code will expire in
                <strong style="color: #2b5748;">
                  ${expiryMinutes} minutes
                </strong>.
              </p>

              <p style="
                margin: 20px 0 0;
                font-size: 13px;
                line-height: 1.6;
                color: #52796f;
                text-align: center;
              ">
                If you didn't request this code, you can safely
                ignore this email.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="
              padding: 20px 25px;
              background-color: #f6f6f6;
              border-top: 1px solid #e6efe9;
              text-align: center;
            ">

              <p style="
                margin: 0;
                font-size: 12px;
                color: #52796f;
              ">
                © ${new Date().getFullYear()} Husnova 
              </p>

              <p style="
                margin: 6px 0 0;
                font-size: 11px;
                color: #9cb080;
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