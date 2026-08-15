import users from "../models/user.js";
import jwt from "jsonwebtoken";
import { getOtp } from "../utils/generateOtp.js";
import redisClient from "../config/redisClient.js";
import { otpEmailTemplate } from "../utils/emailTemplate.js";
import { sendMail } from "../utils/mailSender.js";

const OTP_EXPIRY_SECONDS = 300;

export const sendOTP = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }
  const normalizedEmail = email.toLowerCase().trim();

  try {
    const otp = getOtp();

    await redisClient.set(
      `otp:${normalizedEmail}`,
      String(otp),
      {
        EX: OTP_EXPIRY_SECONDS,
      },
    );

    await sendMail({
      to: normalizedEmail,

      subject: "Your Husnova Verification Code",

      html: otpEmailTemplate({
        otp,
        expiryMinutes: OTP_EXPIRY_SECONDS / 60,
      }),
    });

    return res.status(200).json({
      message: "OTP sent successfully",
    });

  } catch (error) {
    console.error("Send OTP error:", error);

    await redisClient.del(`otp:${normalizedEmail}`);

    return res.status(500).json({
      message: "Failed to send OTP",
    });
  }
};

export const otpVerify = async (req, res) => {
  const { email, OTP } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  if (!OTP) {
    return res.status(400).json({
      message: "OTP is required",
    });
  }

  try {
    const normalizedEmail = email.toLowerCase().trim();

    const validOTP = await redisClient.get(
      `otp:${normalizedEmail}`,
    );

    if (!validOTP) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    if (validOTP !== String(OTP)) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    await redisClient.del(`otp:${normalizedEmail}`);

    const user = await users.findOneAndUpdate(
      { email: normalizedEmail },
      { email: normalizedEmail },
      {
        upsert: true,
        new: true,
      },
    );

    const token = jwt.sign(
      {
        email: normalizedEmail,
        userId: user._id,
      },
      process.env.JWT_TOKEN,
      {
        expiresIn: "30d",
      },
    );

    return res.status(200).json({
      message: "OTP verified",
      token,
      user,
    });

  } catch (error) {
    console.error("OTP verification error:", error);

    return res.status(500).json({
      message: "OTP verification failed",
    });
  }
};